## Run the app on Kubernetes using minikube

- Installation
  - See [here](https://minikube.sigs.k8s.io/docs/start/) to install minikube on your machine
- Specify the secrets and configMaps required
  - Set your own authentication credentials (`username` and `password`) for mongodb.
  - Convert these authentication credentials into base64-encoded string, and paste the encoded strings in [file](minikube/secret.yaml#20) `./minikube/secret.yaml`
  - Also, convert the `apikey` obtained from Service Credentials section into base64-encoded string, and paste the encoded string in same [file](minikube/secret.yaml#L22) `./minikube/secret.yaml`
      ```bash
      #Example
      $  echo -n "your-api-key" | base64
      ```
      Output
      ```bash
      eW91ci1hcGkta2V5        #this is the base64-encoded value of string "your-api-key"
      ```
  - Provide the `region`, `guid` and `environmentId` in [file](minikube/configmap.yaml#L18) `./minikube/configmap.yaml`
- Setup the sample app in minikube
  - Execute the set of next following commands.
  - `minikube start`
      > All of the below steps are carried out in minikube with namespace `appconfig`.  You can create a namespace using the command `kubectl create namespace appconfig` or you can update the yaml files to refer an appropriate namespace.
  - `kubectl apply -f ./minikube/secret.yaml`
  - `kubectl apply -f ./minikube/configmap.yaml`
  - `kubectl apply -f ./minikube/statefulsetmongo.yaml`
  - `kubectl apply -f ./minikube/servicemongo.yaml`
  - `eval $(minikube docker-env)`
      > See [here](https://github.com/kubernetes/minikube/blob/0c616a6b42b28a1aab8397f5a9061f8ebbd9f3d9/README.md#reusing-the-docker-daemon) for more info on the above command
  - `docker build -t appconfig-bluecharge:latest .`
  - `kubectl apply -f ./minikube/deployment.yaml`
  - `kubectl expose deployment appconfig-bluecharge --type=LoadBalancer --port=3000 -n appconfig`
  - `minikube service appconfig-bluecharge -n appconfig`
- For Mongo admin authentication, execute `kubectl exec -it mongodb-standalone-0 /bin/bash -n appconfig`.  Once logged in to the pod, issue `mongo mongodb://mongodb-standalone-0.database:27017/bluecharge` to get into Mongo shell. Then, authorize the DB and execute mongo shell commands
    ```shell
    > use admin
    > db.auth('<your_mongo_username>','<your_mongo_password>')
    > use bluecharge
    > db.users.find()
    ```
- Optionally, stop the minikube - `minikube stop`
- Optionally, delete the minikube - `minikube delete`