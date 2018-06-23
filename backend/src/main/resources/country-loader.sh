#!/bin/bash

# Script to load to ES text files (tab/separated fields) containing geographical info for ONE specific country (only!).
# Files are downloaded from http://download.geonames.org/export/dump/

EShost=192.168.56.10
ESport=9200

[ $# -gt 1 ] || {
    echo "[Error] Missing argument. e.g. $0  GB  \"Great Britain\""
    exit 1
}

outdir=$(mktemp -d .country-loader.XXXXXX)

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

re='^-?[0-9]+([.][0-9]+)?$'
lon=

while IFS=$'\t' read -ra fields; do
    len=${#fields[@]}
    echo "{\"index\":{}}" >> ${jsonfile}
    printf "{\"geoId\":${fields[0]},\"name\":{\"input\":[\"${fields[1]}\"]}," >> ${jsonfile}

    lon=${fields[5]}
    if [[ ${lon} =~ ${re} ]]; then
        printf "\"location\":{\"lat\":${fields[4]},\"lon\":${lon}}," >> ${jsonfile}
    else
        # alternatenames is empty
        printf "\"location\":{\"lat\":${fields[3]},\"lon\":${fields[4]}}," >> ${jsonfile}
    fi

    echo "\"tz\":\"${fields[len-2]}\",\"lastMod\":\"${fields[len-1]}\"}" >> ${jsonfile}
done < ${txtfile}

printf "\n\nRemoving, if existing index \"${countryCode}\" ...\n"

xname=$(echo ${countryCode} | tr '[A-Z]' '[a-z]')

curl -XDELETE "http://${EShost}:${ESport}/${xname}" -o /dev/null

printf "\n\nGenerating index \"${countryCode}\" ...\n"

code=$(curl -s -w "%{http_code}" -o /dev/null \
            -XPUT "http://${EShost}:${ESport}/${xname}" -H "content-type: application/json" -d @- <<EOF
    {
        "mappings": {
            "doc": {
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
)

if [ "$code" != "200" ]; then
    rm -fr "$outdir"
    exit 1
fi

printf "\n\nLoading JSON data in bulk...\n\n"

curl -o /dev/null -H "Content-Type: application/json" \
     -XPOST "http://${EShost}:${ESport}/${xname}/doc/_bulk" --data-binary @${jsonfile}

code=$(curl -s -w "%{http_code}" -o /dev/null http://${EShost}:${ESport}/countries)

if [ "$code" != "200" ]; then
    printf "\n\nGenerating index \"countries\" ...\n"

    code=$(curl -s -w "%{http_code}" -o /dev/null \
                -XPUT "http://${EShost}:${ESport}/countries" -H "content-type: application/json" -d @- <<EOF
    {
        "mappings": {
            "doc": {
                "properties": {
                    "code": { "type": "text" },
                    "name": { "type": "text" }
                }
            }
        }
    }
EOF
)

    if [ "$code" != "200" ]; then
        rm -fr "$outdir"
        exit 1
    fi
fi

printf "\n\nAdding \"${country}\" to index \"countries\" ...\n\n"

curl -s -o /dev/null -XPOST "http://${EShost}:${ESport}/countries/doc" -H "content-type: application/json" \
     -d "{ \"code\" : \"${countryCode}\", \"name\" : \"${country}\" }"

popd > /dev/null
rm -fr "$outdir"
exit 0

# e.g. :
# To retrieve all countries...
#
# http 'http://192.168.56.10:9200/countries/_search?pretty=true&size=1000&q=*:*'
#
# curl -XPOST -H "Content-Type: application/json" "http://192.168.56.10:9200/SG/doc/_search" \
#     --data '{
#         "suggest" : { "fuzzy-location-suggest" : {
#             "prefix" : "somapah",
#             "completion" : {
#                 "field" : "name",
#                 "fuzzy" : {
#                     "fuzziness" : 1
#                 },
#                 "size" : 10
#             }
#         }}
#     }' | jq .
