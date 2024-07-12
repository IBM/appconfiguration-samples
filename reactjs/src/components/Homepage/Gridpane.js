import React from 'react';
import { Grid, Column } from '@carbon/react';
import image1 from '../../images/bbbb.png'
import image2 from '../../images/bbb1.png'
import './homepage.scss';

const Gridpane = () => {
  
  return (
    <>
      <Grid style={{ "maxWidth": "100%" }}>
        <Column lg={6} md={5} sm={3}>
          <div className="btm-grid-hp back-col1-hp">
            <img src={image1} alt="" />
          </div>
        </Column>

        <Column lg={4} md={2} sm={2}>
          <div className="btm-grid-hp btm-wid-hp">
            <h3>SPECIAL RECHARGE OFFERS</h3>
            <p>Online recharge is one of the handiest options as it saves a lot of time and efforts
              Blue charge offers a reliable online recharge platform where you can make an moble recharge in
              short
              &
              simple steps
              Topping up prepaid mobile was never this quick and easy as it is with us.
              Forget the conventional way of making a recharge through scratch cards,
              Blue charge offers online mobile prepaid
              recharge by an uncomplicated process and also provides you
              with many mobile recharge offers.</p>
          </div>
        </Column>

        <Column lg={6} md={5} sm={3}>
          <div className="btm-grid-hp back-col2-hp">
            <img src={image2} alt="" />
          </div>
        </Column>
      </Grid>

    </>
  )
};

export default Gridpane;
