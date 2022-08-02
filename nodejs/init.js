/*
 * (C) Copyright IBM Corp. 2022.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

const { AppConfiguration } = require('ibm-appconfiguration-node-sdk');

const appConfigClient = AppConfiguration.getInstance();    // get service client for AppConfiguration

function initialiseAppConfiguration() {
    const region = process.env.REGION;
    const guid = process.env.GUID;
    const apikey = process.env.APIKEY;

    // client.setDebug(true);             //Uncomment to enable debug mode
    appConfigClient.init(region, guid, apikey);
    appConfigClient.setContext(process.env.COLLECTION_ID, process.env.ENVIRONMENT_ID);
}

module.exports.initialiseAppConfiguration = initialiseAppConfiguration;
module.exports.appConfigClient = appConfigClient;
