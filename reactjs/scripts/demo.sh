# (C) Copyright IBM Corp. 2021.

# Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at

# http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.

# NOTE : This script is just a guidelined usage there may be errors that can happen based on your environment.

#!/bin/bash
set -e


#---------------------------------Setup base url values-------------------------
region[1]="https://us-south.apprapp.cloud.ibm.com/apprapp/feature/v1/instances"
region[2]="https://eu-gb.apprapp.cloud.ibm.com/apprapp/feature/v1/instances"
region[3]="https://au-syd.apprapp.cloud.ibm.com/apprapp/feature/v1/instances"
region[4]="https://us-east.apprapp.cloud.ibm.com/apprapp/feature/v1/instances"
urlSeparator="/"
config="config"
queryParam="?clean=true"
tokenURL="https://iam.cloud.ibm.com/identity/token"

#---------------------------------Get user input---------------------------------
printf "\nEnter the region where your App configuration service is created\n1. us-south (Dallas)\n2. eu-gb (London)\n3. au-syd (Sydney)\n4. us-east (Washington DC)\n\n"
read -p "Enter region number> "  regionIn
printf "\n"
read -p "Enter apikey: (Obtained from Service credentials tab of your instance): "  apikey
printf "\n"
read -p "Enter guid: (Obtained from Service credentials tab of your instance): "  guid
printf "\nIn the next step this script will clean up the existing data and create the data required for the sample application. Make sure you run this script on a test instance of app configuration and not a production instance.\n\n"
printf "Do you want to proceed? \033[1m[y/N]\033[0m "
while true; do
    read actionIn
    case $actionIn in
        [Yy]* ) break;;
        [Nn]* ) printf "\nexited.\n"; exit;;
        * ) echo "Please answer yes(y) or no(N)";;
    esac
done
printf "\nrunning the script ...\n"
baseURL=${region[${regionIn}]}
importConfigURL="$baseURL$urlSeparator$guid$urlSeparator$config$queryParam"
tokenResponse=$(curl -s -X POST $tokenURL -H "Content-Type: application/x-www-form-urlencoded" -d 'grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey='"$apikey"'')
access_token=($((echo $tokenResponse | jq -r '.access_token') | tr -d \'\"))

importConfigurations() 
{
	importStatus=$(curl -s --write-out 'HTTPSTATUS:%{http_code}'  -X POST $importConfigURL -H "Authorization: Bearer $access_token" -H "Content-Type: application/json" --data @./configurations.json )
	HTTP_BODY=$(echo $importStatus | sed -e 's/HTTPSTATUS\:.*//g' | jq .)
	HTTP_STATUS=$(echo $importStatus | tr -d '\n' | sed -e 's/.*HTTPSTATUS://')
	printf "%b\nHTTP_STATUS is $HTTP_STATUS"
	if [ $HTTP_STATUS != 201 ] # check status code
	then
		printf "%b\n \e[31m Failure : Importing configurations failed with error code $HTTP_STATUS and body \n $HTTP_BODY \e[39m\n"
		printf "Re-run the script.\n"
		exit;
	else 
		printf "%b\nSuccess:  Import configurations successful.\n"
	fi
}

importConfigurations

printf "%b\n \e[32m--------------------------script run complete %b--------------------------\n"
