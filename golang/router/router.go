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

package router

import (
	"fmt"
	"golang/config"
	"golang/handlers"
	"net/http"
)

// App function initializes SDK and handles all the handlers required for the web application and it returns if any error while publishing
func App() error {

	http.HandleFunc("/", handlers.HomePage)
	http.Handle("/views/", http.StripPrefix("/views/", http.FileServer(http.Dir("views"))))
	http.HandleFunc("/flights", handlers.FlightBooking)
	http.HandleFunc("/login", handlers.Login)
	http.HandleFunc("/logout", handlers.Logout)
	return http.ListenAndServe(fmt.Sprintf(":%s", config.EnvData.Port), nil)
}
