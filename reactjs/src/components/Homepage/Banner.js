import React from 'react';
import './homepage.scss';
import { Button, } from '@carbon/react';
import { Link } from 'react-router-dom';
import { useFeature } from 'ibm-appconfiguration-react-client-sdk';

const Banner = (props) => {
    
    const isLoggedIn = () => {
        return !!(props.email && props.email.length > 0);
    }
    const flightBookingFeatureFlag = useFeature('flight-booking');
    const isflightBookingEnabled = flightBookingFeatureFlag.getCurrentValue(props.email || 'defaultUser', { email: props.email || 'defaultUser' });

    return (
        <>
            <div className="banner-hp">
                <div className="banner-info-hp">
                    <h3>Get Free Coupons and Discounts on Top Brands With Every Recharge</h3>
                </div>

                <div className="buttons-hp">
                    <Button>MOBILE</Button>
                    <Button>DATACARD</Button>
                    <Button>RECHARGE</Button>
                </div>

                {isLoggedIn() && isflightBookingEnabled ? <><div className="flight-button-hp">
                    <Link to="/flightbooking"><Button >FLIGHT BOOKING</Button></Link>
                </div></> : <></>}

            </div>
        </>
    );
}

export default Banner;
