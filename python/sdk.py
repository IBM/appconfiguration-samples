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

from config.config import *
from config.constants import *
from ibm_appconfiguration import AppConfiguration


def initialize():
    global appconfig_client
    appconfig_client = AppConfiguration.get_instance()
    appconfig_client.init(region=REGION,
                          guid=GUID,
                          apikey=APIKEY)
    appconfig_client.set_context(collection_id=COLLECTION_ID,
                                 environment_id=ENVIRONMENT_ID)

# check_left_nav_menu_flag function checks for Left Navigation feature flag status


def check_left_nav_menu_flag():
    left_nav_menu_feature = appconfig_client.get_feature(
        "left-navigation-menu")
    return left_nav_menu_feature.is_enabled()

# flight_button function checks for the signed in users, if flight booking button should be enabled


def flight_button(email):
    entity_id = "defaultUser"
    entity_attributes = dict()
    entity_attributes[EMAIL] = email
    flight_booking_allowed_feature = appconfig_client.get_feature(
        "flight-booking")
    flight_booking_allowed = flight_booking_allowed_feature.get_current_value(
        entity_id, entity_attributes)
    return flight_booking_allowed == True

# get_discount_value function gets the discount value from the App Configuration using the SDK


def get_discount_value(user_email):
    discount_property = appconfig_client.get_property(
        "flight-booking-discount")
    entity_id = user_email
    entity_attributes = dict()
    entity_attributes[EMAIL] = user_email
    discount_value = "%0.0f" % discount_property.get_current_value(
        entity_id, entity_attributes)
    return discount_value
