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

package config

import (
	"github.com/joho/godotenv"
	"log"
	"os"
)

// envData is a struct that initializes the values required for setup of SDK
type envData struct {
	Region        string
	GUID          string
	API           string
	CollectionID  string
	EnvironmentID string
	Port          string
}

// EnvData holds the values required for setup of SDK
var EnvData envData

func init() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	EnvData = envData{
		Region:        os.Getenv("REGION"),
		GUID:          os.Getenv("GUID"),
		API:           os.Getenv("APIKEY"),
		CollectionID:  os.Getenv("COLLECTION_ID"),
		EnvironmentID: os.Getenv("ENVIRONMENT_ID"),
		Port:          os.Getenv("PORT"),
	}
}
