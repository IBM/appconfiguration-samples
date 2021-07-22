# (C) Copyright IBM Corp. 2021.

# Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
# the License. You may obtain a copy of the License at

# http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
# an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
# specific language governing permissions and limitations under the License.

# NOTE : This script is just a guidelined usage there may be errors that can happen based on your environment.

#!/usr/bin/env bash
set -e

region[1]="us-south"
region[2]="eu-gb"
region[3]="au-syd"
printf "\nEnter the region where your App configuration service is created\n1. us-south (Dallas)\n2. eu-gb (London)\n3. au-syd (Sydney)\n\n"
read -p "Enter region number> " regionIn
read -p "Enter apikey: (Obtained from Service credentials tab of your instance): " apikey
printf "\n"
read -p "Enter guid: (Obtained from Service credentials tab of your instance): " guid

encodedApikey=$(echo -n "$apikey" | base64)

cat deployment.yaml | sed \
    -e "/^\([[:space:]]*APIKEY: \).*/s//\1$encodedApikey/" \
    -e "/^\([[:space:]]*REGION: \).*/s//\1${region[${regionIn}]}/" \
    -e "/^\([[:space:]]*GUID: \).*/s//\1$guid/" >deployment-temp.yaml
mv deployment-temp.yaml deployment.yaml

printf "\e[32m \nRun successful\n"
printf "Re-run the script if you wish to update the values again in deployment.yaml file\n\n"
