/*
 * (C) Copyright IBM Corp. 2021.
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

const appConfigClient = AppConfiguration.getInstance();

/**
 * App Configuration SDK intialisation
 */
async function initialiseAppConfig() {
    const region = process.env.REGION;
    const guid = process.env.GUID;
    const apikey = process.env.APIKEY;
    const collectionId = process.env.COLLECTION_ID;
    const environmentId = process.env.ENVIRONMENT_ID;

    // appConfigClient.setDebug(true);                  //Uncomment to enable debug mode
    appConfigClient.init(region, guid, apikey);
    await appConfigClient.setContext(collectionId, environmentId);
}

// Get Feature
function getFeature(featureId) {
    return appConfigClient.getFeature(featureId);
}

// Get Property
function getProperty(propertyId) {
    return appConfigClient.getProperty(propertyId);
}

// Get evaluated value of the feature flag
function getEvaluatedFeatureFlagValue(featureId, entityId, entityAttributes = {}) {
    const feature = appConfigClient.getFeature(featureId);
    if (feature !== null) {
        return feature.getCurrentValue(entityId, entityAttributes);
    }
    return null;
}

// Get evaluated value of the property
function getEvaluatedPropertyValue(propertyId, entityId, entityAttributes = {}) {
    const property = appConfigClient.getProperty(propertyId);
    if (property !== null) {
        return property.getCurrentValue(entityId, entityAttributes);
    }
    return null;
}

module.exports = {
    initialiseAppConfig,
    getFeature,
    getProperty,
    getEvaluatedFeatureFlagValue,
    getEvaluatedPropertyValue,
};
