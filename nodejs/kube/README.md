## Run the app on Kubernetes in an IKS (IBM Kubernetes Service)

All of the below steps are carried out in IKS with namespace `appconfig`.  You can create a namespace using the command `kubectl create namespace appconfig` or you can update the yaml files to refer an appropriate namespace.

- Specify the secrets, configMaps required in the [`deployment.yaml`](deployment.yaml) file manually or by running the script. Steps are mentioned below
  - Give execute permission to the script `chmod +x ./kube/deploy-script.sh`
  - This script uses [`sed`](https://www.gnu.org/software/sed/)(GNU stream editor). Having it installed is a prerequisite before running the script.
  - Run the script `./kube/deploy-script.sh`
- Setup the sample app in IKS
  - Build the docker for the app using the command `docker build -t us.icr.io/<namespace>/appconfig-bluecharge:<tag> .`
    > Here, `<namespace>` will be your IBM Cloud Container registry namespace
  - Push the docker to icr.io using `docker push us.icr.io/<namespace>/appconfig-bluecharge:<tag>`
  - Update the image name in `deployment.yaml` file in the `image` tag. [Line 47](deployment.yaml#L47)
  - To deploy the app, use `kubectl apply -f ./kube/deployment.yaml`
  - To access the node Blue Charge app, use the url `http://<IKS Node public ip>:<nodeport of the service>/`
  - Optionally create an ingress rule to access the app using the cluster ingress domain end point.
