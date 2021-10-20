/*
 * (C) Copyright IBM Corp. 2021.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on
 * an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations under the License.
 */

package com.ibm.appconfiguration.example.bluecharge;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Spinner;
import android.widget.TextView;

import com.ibm.cloud.appconfiguration.android.sdk.AppConfiguration;
import com.ibm.cloud.appconfiguration.android.sdk.configurations.models.Property;

import org.json.JSONException;
import org.json.JSONObject;

public class FlightActivity extends AppCompatActivity {

    SharedPreferences pref;
    private View couponsView;
    private TextView textViewDiscountValue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_flight);

        Spinner spinner = (Spinner) findViewById(R.id.travel_class_spinner);
        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.travel_class_array, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        spinner.setAdapter(adapter);
    }

    @Override
    protected void onResume() {
        super.onResume();
        couponsView = findViewById(R.id.offer_coupon);
        textViewDiscountValue = findViewById(R.id.text_offer_value);

        pref = getSharedPreferences("email", Context.MODE_PRIVATE);
        String email = pref.getString("email", "defaultUser");

        AppConfiguration appConfiguration = AppConfiguration.getInstance();

        String entityId = email;
        JSONObject entityAttributes = new JSONObject();
        try {
            entityAttributes.put("email", email);
        } catch (JSONException e) {
            e.printStackTrace();
        }

        Property discountProperty = appConfiguration.getProperty("flight-booking-discount");
        Integer discountValue = null;
        if (discountProperty != null) {
            discountValue = (Integer) discountProperty.getCurrentValue(entityId, entityAttributes);
        }
        textViewDiscountValue.setText("Get " + discountValue + "% Offer");

    }

}