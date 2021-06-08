## Run the app on Kubernetes in an IKS (IBM Kubernetes Service)

All of the below steps are carried out in IKS with namespace `appconfig`.  You can create a namespace using the command `kubectl create namespace appconfig` or you can update the yaml files to refer an appropriate namespace.

- Specify the secrets and configMaps required
  - Set your own authentication credentials (`username` and `password`) for mongodb.
  - Convert these mongodb authentication credentials into base64-encoded string, and paste the encoded strings in [file](kube/secret.yaml#20) `./kube/secret.yaml`
  - Also, convert the `apikey` obtained from Service Credentials section into base64-encoded string, and paste the encoded string in same [file](kube/secret.yaml#L22) `./kube/secret.yaml`
      ```bash
      #Example
      $  echo -n "your-api-key" | base64
      ```
      Output
      ```bash
      eW91ci1hcGkta2V5        #this is the base64-encoded value of string "your-api-key"
      ```
  - Provide the `region`, `guid` and `apikey` in [file](kube/configmap.yaml#L18) `./kube/configmap.yaml`
- Setup Mongo in IKS
  - Mongo is deployed as a Statefulset in IKS and admin users are used to connect to Mongo.  Secrets are created for admin user credentials.
  - Create secrets required for mongo deployment using `kubectl apply -f ./kube/secret.yaml`
  - Create the StatefulSet for mongo deployment using `kubectl apply -f ./kube/statefulsetmongo.yaml`
  - Create service to access mongo deployment using `kubectl apply -f ./kube/servicemongo.yaml` 

- Setup the sample app in IKS
  - Build the docker for the app using the command `docker build -t us.icr.io/<namespace>/appconfig-bluecharge:<tag> .`
    > Here, `<namespace>` will be your IBM Cloud Container registry namespace
  - Push the docker to icr.io using `docker push us.icr.io/<namespace>/appconfig-bluecharge:<tag>`
  - Update the image name in kube/deployment.yaml file in the `image` tag
  - Update the `imagePullSecrets` in kube/deployment.yaml file according to your IKS environment.  If you have used the registry in your the same account of where the cluster is present, then you can copy the `all-icr-io` secret from default to the appconfig namespace using the command `kubectl get secret all-icr-io  --namespace=default -o yaml | grep -v '^\s*namespace:\s' | kubectl apply --namespace=appconfig -f -`
  - Create configMaps required for the app using `kubectl apply -f ./kube/configmap.yaml`
  - To deploy the app, use `kubectl apply -f ./kube/deployment.yaml`
  - To access the app using from outside the IKS, create the service using `kubectl apply -f ./kube/servicenode.yaml`
  - To access the node Blue Charge app, use the url `http://<IKS Node public ip>:<nodeport of the service>/`
  - Optionally create an ingress rule to access the app using the cluster ingress domain end point.
