#!/bin/bash
apiKey=""

json=$(curl -X GET --header 'Accept: application/json' "https://api.elsevier.com/content/search/scopus?query=au-id('57206674454')&apiKey=$apiKey&count=1&view=COMPLETE")

regexResult='"opensearch:totalResults":"([0-9]+)"'
regexNumber='[0-9]+'

totalResult=$(echo $json | grep -Po "$regexResult"  | grep -Po "$regexNumber")

count=25
results=$(echo "$totalResult/$count" |  awk -F "/" '{print ($1/$2)}')
ceil=$(echo $results | awk 'function ceil(x, y){y=int(x); return(x>y?y+1:y)} {print ceil($0)}')

rm -r data/publications/*.json

echo "{
  \"nJson\": $ceil
}" > data/publications/nJson.json

ceil=$(($ceil-1)) #for start from 0

for i in $(seq 0 $ceil)
do
  json=$(curl -X GET --header 'Accept: application/json' "https://api.elsevier.com/content/search/scopus?query=au-id('57206674454')&apiKey=$apiKey&count=$count&start=$(($count*$i))&view=COMPLETE&sort=-coverDate")

  echo $json > "data/publications/file$i.json"
done
