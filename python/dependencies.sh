# NOTE : This script is just a guidelined usage there may be errors that can happen based on your environment.

#!/bin/sh

apt-get update
add-apt-repository universe
apt install software-properties-common
apt install python3.9
apt install python3-pip
pip install --upgrade ibm-appconfiguration-python-sdk
pip install python-dotenv
pip install Flask
