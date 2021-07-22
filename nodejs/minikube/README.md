## Run the app on Kubernetes using minikube

- Installation
  - See [here](https://minikube.sigs.k8s.io/docs/start/) to install minikube on your machine
- Specify the secrets, configMaps required in the [`deployment.yaml`](deployment.yaml) file manually or by running the script. Steps are mentioned below
  - Give execute permission to the script `chmod +x ./minikube/deploy-script.sh`
  - This script uses [`sed`](https://www.gnu.org/software/sed/)(GNU stream editor). Having it installed is a prerequisite before running the script.
  - Run the script `./minikube/deploy-script.sh`
- Execute the set of next following commands.
  - `minikube start`
  - `kubectl create namespace appconfig`
      > All of the below steps are carried out in minikube with namespace `appconfig`.  You can create a namespace and update the `deployment.yaml` file to refer an appropriate namespace.
  - `eval $(minikube docker-env)`
      > See [here](https://github.com/kubernetes/minikube/blob/0c616a6b42b28a1aab8397f5a9061f8ebbd9f3d9/README.md#reusing-the-docker-daemon) for more info on the above command
  - `docker build -t appconfig-bluecharge:latest .`
  - `kubectl apply -f ./minikube/deployment.yaml`
  - `minikube service appconfig-bluecharge -n appconfig`
- Optionally, stop the minikube - `minikube stop`
- Optionally, delete the minikube - `minikube delete`
