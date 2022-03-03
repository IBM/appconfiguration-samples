# (C) Copyright IBM Corp. 2022.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

import os
from dotenv import load_dotenv

load_dotenv()

REGION = os.getenv('REGION')
GUID = os.getenv('GUID')
APIKEY = os.getenv('APIKEY')
COLLECTION_ID = os.getenv('COLLECTION_ID')
ENVIRONMENT_ID = os.getenv('ENVIRONMENT_ID')
PORT = os.getenv('PORT')
SESSION_SECRET_KEY = os.getenv('SESSION_SECRET_KEY')
