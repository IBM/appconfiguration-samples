# React.js sample spplication for IBM Cloud App Configuration service
> **DISCLAIMER**: This is a guideline sample application and is used for demonstrative and illustrative purposes only. This is not a production ready code.

This sample contains an React.js application that you can use to learn more about the IBM Cloud App Configuration service.

## Contents
- [React.js sample spplication for IBM Cloud App Configuration service](#reactjs-sample-spplication-for-ibm-cloud-app-configuration-service)
  - [Contents](#contents)
  - [Prerequisite](#prerequisite)
  - [Create an instance of App Configuration service](#create-an-instance-of-app-configuration-service)
  - [Setup the App Configuration service instance](#setup-the-app-configuration-service-instance)
  - [Allowlist the origin](#allowlist-the-origin)
  - [Run the sample](#run-the-sample)
- [Explore the key use-cases included in the sample](#explore-the-key-use-cases-included-in-the-sample)
  - [Use case 1: Enable or disable the feature flag](#use-case-1-enable-or-disable-the-feature-flag)
  - [Use case 2: Dark launch](#use-case-2-dark-launch)
- [License](#license)

## Prerequisite

- You need an [IBM Cloud](http://cloud.ibm.com/) account. If you don't have an account, create one [here](https://cloud.ibm.com/registration/).

## Create an instance of App Configuration service
- Log in to your IBM Cloud account.
- In the [IBM Cloud catalog](https://cloud.ibm.com/catalog#services), search **App Configuration** and click [App Configuration](https://cloud.ibm.com/catalog/services/app-configuration). The service provisioning page opens.
- **Select a region** - Currently, Dallas (us-south), London (eu-gb) Sydney (au-syd) and Washington DC (us-east) regions are supported.
- Select a pricing plan, resource group and configure your resource with a service name, or use the preset name.
- Click **Create**. A new service instance is created and the App Configuration dashboard is displayed.

## Setup the App Configuration service instance
- Download the source code
    ```
    git clone https://github.com/IBM/appconfiguration-samples.git
    cd appconfiguration-samples/reactjs
    ```
- Install `jq` - command-line JSON processor.
    - You can install it from [here](https://stedolan.github.io/jq/download/)
- Go to dashboard of your App Configuration instance in IBM Cloud UI.
- Navigate to Service Credentials section and generate a new set of credentials. Note down the `region`, `guid` and `apikey`. These credentials are required in the next steps.
- From your terminal, execute the [`demo.sh`](./scripts/demo.sh) script by running below command
    ```bash
    $ cd appconfiguration-samples/reactjs/scripts
    $ ./demo.sh
    ```
    > If you face any permission errors during the script execution, provide appropriate permission to the file by running - `chmod +x ./demo.sh`. And then execute the script.  
- Provide all the inputs during script execution. A sample example is shown in below figure
  <img src="./README_IMAGES/README_IMG0.png" width=75% height=50%/>
- Script execution takes time. Script is executed successfully only when you see the log `---script run complete---` at the end of your terminal.
- This script will create the collections, feature flags, properties & segments using the default dev environment in the instance which are required for the sample(Bluecharge) web app.

## Allowlist the origin
This application directly makes the call to App Configuration server, hence this is a CORS request. So, the origin needs to be allowlisted for the CORS request to succeed. Follow the below steps
- Go to dashboard of your App Configuration instance in IBM Cloud UI.
- Navigate to Settings section on the left.
- Add the URL domain - `http://localhost:3000` and click save.

## Run the sample
- Prerequisites
    - Node.js(v14 & above) & NPM(v10 & above).
- Add all the environment variable values in [`.env`](.env) file
- Installing Dependencies
    - Run `npm install` from the root folder to install the app’s dependencies. (please ignore the warnings)
- Run `npm run start` to start the app
- Access the running app in a browser at http://localhost:3000

# Explore the key use-cases included in the sample
Keep the app running.

## Use case 1: Enable or disable the feature flag
Feature flag `Left Navigation` when toggled off, the navigation links in the sample apps homepage are shown on the top. Turning on the feature flag, immediately re-renders the UI and the navigation links are shown on left side inside the hamburger menu. Toggling the feature flag back and forth shifts the navigation links accordingly.

## Use case 2: Dark launch
Turn on the toggle for `Flight Booking` feature flag. Login with email id `alice@bluecharge.com` and you would see flight booking button displayed on the home screen banner. This is because for all the user emails ending with `@bluecharge.com` the feature flag is set to be enabled as per it's targeting rules. Any other users logging with email other than `@bluecharge.com` will not see the flight booking button.


# License
This project is released under the Apache 2.0 license. The license's full text can be found in [LICENSE](LICENSE)

See [here](https://cloud.ibm.com/docs/app-configuration) for detailed docs on App Configuration service.
