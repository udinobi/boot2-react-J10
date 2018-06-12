#!/bin/bash

# Script to load to ES text files (tab/separated fields) containing geographical info for ONE specific country (only!).
# Files are downloaded from http://download.geonames.org/export/dump/

[ $# -gt 1 ] || {
    echo "[Error] Missing argument. e.g. $0  GB  \"Great Britain\""
    exit 1
}

outdir=$(mktemp -d)

pushd "$outdir"

countryCode="$1"
country="$2"

zipfile="${countryCode}.zip"

wget "http://download.geonames.org/export/dump/${zipfile}" || {
    popd
    echo "[Error] Cannot download country file (${zipfile})"
    rm -fr "$outdir"
    exit 1
}

[ -s "$zipfile" ] || {
    popd
    echo "[Error] Country file ($zipfile) not found or empty"
    rm -fr "$outdir"
    exit 1
}

unzip "$zipfile" || {
    popd
    echo "[Error] Country file ($zipfile) corrupted"
    rm -fr "$outdir"
    exit 1
}

txtfile="${countryCode}.txt"

[ -e "$txtfile" ] || {
    popd
    echo "[Error] Not found the file (${txtfile}) expected from the zip extraction"
    rm -fr "$outdir"
    exit 1
}

jsonfile=$(mktemp locations.json.XXXXXX)

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
done < ${txtfile}

code=$(curl -s -w "%{http_code}" http://${EShost}:${ESport}/locations -o /dev/null)

[ "$code" != "200" ] && curl -XPUT "http://${EShost}:${ESport}/locations"

curl -XPUT "http://${EShost}:${ESport}/locations/${countryCode}/_mapping" -H "content-type: application/json" -d @- <<EOF
{
    "${countryCode}": {
        "dynamic": "strict",
        "_meta": {
            "country": "${country}"
        },
        "properties": {
            "geoId":    { "type": "integer" },
            "name":     { "type": "completion" },
            "location": { "type": "geo_point" },
            "tz":       { "type": "text" },
            "lastMod":  { "type": "date", "format" : "yyyy-MM-dd" }
        }
    }
}
EOF

curl -H "Content-Type: application/json" -XPOST "http://${EShost}:${ESport}/locations/${countryCode}/_bulk" --data-binary @${jsonfile}

popd
rm -fr "$outdir"
exit 0

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
