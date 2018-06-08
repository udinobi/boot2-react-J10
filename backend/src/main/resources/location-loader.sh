#!/bin/bash

# Script to load to ES text files (tab/separated fields) containing geographical info for ONE (only!) specific country.
# Files are downloaded from http://download.geonames.org/export/dump/

[ $# -gt 0 -a -e "$1" ] || { echo "Missing input file argument or input file not found"; exit 1; }

inpfile=$1

countryCode=`basename ${inpfile} .txt`

jsonfile=$(mktemp /tmp/locations.json.XXXXXX)

EShost=192.168.56.10
ESport=9200

re='^-?[0-9]+([.][0-9]+)?$'
lon=

while IFS=$'\t' read -ra fields; do
    len=${#fields[@]}
    echo "{\"index\":{}}" >> ${jsonfile}
    echo -n "{\"geoId\":${fields[0]},\"name\":{\"input\":[\"${fields[1]}\"]}," >> ${jsonfile}

    lon=${fields[5]}
    if [[ ${lon} =~ ${re} ]]; then
        echo -n "\"location\":{\"lat\":${fields[4]},\"lon\":${lon}}," >> ${jsonfile}
    else
        # alternatenames is empty
        echo -n "\"location\":{\"lat\":${fields[3]},\"lon\":${fields[4]}}," >> ${jsonfile}
    fi

    echo "\"tz\":\"${fields[len-2]}\",\"lastMod\":\"${fields[len-1]}\"}" >> ${jsonfile}
done < ${inpfile}

curl -XPUT "http://${EShost}:${ESport}/locations?pretty" -H "content-type: application/json" -d @- <<EOF
{
    "mappings": {
        "${countryCode}": {
            "dynamic": "strict",
            "properties": {
                "geoId":    { "type": "integer" },
                "name":     { "type": "completion" },
                "location": { "type": "geo_point" },
                "tz":       { "type": "text" },
                "lastMod":  { "type": "date", "format" : "yyyy-MM-dd" }
            }
        }
    }
}
EOF

curl -H "Content-Type: application/x-ndjson" -XPOST "http://${EShost}:${ESport}/locations/${countryCode}/_bulk" --data-binary @${jsonfile}

rm ${jsonfile}

# e.g. :
#    curl -XPOST \
#         -H "Content-Type: application/json" \
#         "http://${EShost}:${ESport}/locations/${countryCode}/_search" \
#         --data '{
#              "suggest" : { "location-suggest-fuzzy" : {
#                  "prefix" : "Bangkok",
#                  "completion" : {
#                      "field" : "name",
#                      "fuzzy" : {
#                          "fuzziness" : 1
#                      },
#                      "size" : 10
#                  }
#              }}
#          }' | jq .
