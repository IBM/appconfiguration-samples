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

package handlers

import (
	"golang/sdk-integration"
	"log"
	"net/http"
)

type data struct {
	FlightBookingButton bool
	LeftNavMenu         bool
	DiscountValue       string
	UserEmail           string
	IsValidUser         bool
}

var feature data

// HomePage function adds all the html files and displays the home page
func HomePage(w http.ResponseWriter, r *http.Request) {
	templates, err := loadTemplate("index")
	if err != nil {
		log.Println("error:The Page could not be created")
		return
	}
	feature.LeftNavMenu = sdk_integration.CheckLeftNavMenuFlag()

	flightButton := sdk_integration.FlightButton(feature.UserEmail)
	if feature.IsValidUser && flightButton {
		feature.FlightBookingButton = true
	} else {
		feature.FlightBookingButton = false
	}

	err = templates.Execute(w, feature)

	if err != nil {
		log.Println("error:", err)
	}

}

// FlightBooking function adds the required html files and displays the Flight Booking page
func FlightBooking(w http.ResponseWriter, r *http.Request) {
	if !feature.FlightBookingButton {
		HomePage(w, r)
		return
	}

	feature.LeftNavMenu = sdk_integration.CheckLeftNavMenuFlag()
	feature.DiscountValue = sdk_integration.GetDiscountValue(feature.UserEmail)

	templates, err := loadTemplate("flights")
	if err != nil {
		log.Println("error:The Page could not be created")
		return
	}

	err = templates.Execute(w, feature)
	if err != nil {
		log.Println("error:", err)
	}
}
