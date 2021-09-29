/**
 * (C) Copyright IBM Corp. 2021.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package sdk_integration

import (
	"fmt"
	"golang/config"

	AppConfiguration "github.com/IBM/appconfiguration-go-sdk/lib"
)

var appConfiguration *AppConfiguration.AppConfiguration

func init() {
	appConfiguration = AppConfiguration.GetInstance()
	appConfiguration.Init(config.EnvData.Region, config.EnvData.GUID, config.EnvData.API)
	appConfiguration.SetContext(config.EnvData.CollectionID, config.EnvData.EnvironmentID)
}

// CheckLeftNavMenuFlag function checks for Left Navigation feature flag status
func CheckLeftNavMenuFlag() bool {
	leftNavMenuFeature, _ := appConfiguration.GetFeature("left-navigation-menu")
	return leftNavMenuFeature.IsEnabled()
}

// FlightButton function checks for the signed-in users, if flight booking button should be enabled
func FlightButton(email string) bool {
	entityID := "defaultUser"
	entityAttributes := make(map[string]interface{})
	entityAttributes["email"] = email
	flightBookingAllowedFeature, _ := appConfiguration.GetFeature("flight-booking")
	flightBookingAllowed := flightBookingAllowedFeature.GetCurrentValue(entityID, entityAttributes)
	return flightBookingAllowed == true
}

// GetDiscountValue function gets the discount value from the App Configuration using the SDK
func GetDiscountValue(userEmail string) string {

	discountProperty, _ := appConfiguration.GetProperty("flight-booking-discount")
	entityID := userEmail
	entityAttributes := make(map[string]interface{})
	entityAttributes["email"] = userEmail
	discountValue := fmt.Sprintf("%0.0f", discountProperty.GetCurrentValue(entityID, entityAttributes).(float64))
	return discountValue
}
