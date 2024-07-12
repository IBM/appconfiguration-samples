import React from 'react';
import Banner from './Banner';
import Gridpane from './Gridpane';

const FlightPage = (props) => {

    return (
        <>
            <Banner email={props.email}></Banner>
            <Gridpane></Gridpane>
        </>
    );
}

export default FlightPage;
