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

const express = require('express');
const appconfig = require('../appconfig');

const router = express.Router();
let leftNavMenu;
let discountValue;

function logincheck(req, res, next) {
    if (req.session && req.session.userEmail) {
        req.isLoggedInUser = true
    } else {
        req.isLoggedInUser = false
    }
    next();
}

function featurecheck(req, res, next) {
    let result;
    const entityId = req.session.userEmail ? req.session.userEmail : 'defaultUser';
    const entityAttributes = {
        'email': req.session.userEmail
    }

    result = appconfig.getEvaluatedFeatureFlagValue('left-navigation-menu', entityId);
    leftNavMenu = result['value'];
    result = appconfig.getEvaluatedPropertyValue('flight-booking-discount', entityId, entityAttributes);
    discountValue = result['value'];
    next();
}

const loginAndFeatureCheck = [logincheck, featurecheck]

/* GET flightbooking page. */
router.get('/', loginAndFeatureCheck, (req, res, next) => {
    res.render('flights', { isLoggedInUser: req.isLoggedInUser, userEmail: req.session.userEmail, leftNavMenu, discountValue });
});

module.exports = router;
