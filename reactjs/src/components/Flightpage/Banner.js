import React from 'react';
import './flightpage.scss';
import { Grid, Column } from '@carbon/react';
import disountImage from '../../images/discount.png';
import { useProperty } from 'ibm-appconfiguration-react-client-sdk';

const Banner = (props) => {

    const discountProperty = useProperty('flight-booking-discount');
    const discountValue = discountProperty.getCurrentValue(props.email || 'defaultUser', { email: props.email || 'defaultUser' });

    return (
        <>
            <div className="banner-fp">
                <Grid style={{ "maxWidth": "100%" }}>
                    <Column lg={4} md={3} sm={2}>
                        <div className="offer-image">
                            <img src={disountImage} alt=" " />
                            <div className="text">
                                <h1>{discountValue}</h1>
                            </div>
                        </div>
                    </Column>

                    <Column lg={12} md={9} sm={6}>
                        <div className="booking-form">
                            <form>
                                <div className="form-group">
                                    <div className="form-checkbox">
                                        <label htmlFor="roundtrip">
                                            <input type="radio" id="roundtrip" name="flight-type" />
                                            <span></span>Roundtrip
                                        </label>
                                        <label htmlFor="one-way">
                                            <input type="radio" id="one-way" name="flight-type" />
                                            <span></span>One way
                                        </label>
                                        <label htmlFor="multi-city">
                                            <input type="radio" id="multi-city" name="flight-type" />
                                            <span></span>Multi-City
                                        </label>
                                    </div>
                                </div>
                                <Grid>
                                    <Column lg={4} md={3} sm={2}>
                                        <div className="form-group">
                                            <span className="form-label">Flying from</span>
                                            <input className="form-control" type="text" placeholder="City or airport" />
                                        </div>
                                    </Column>
                                    <Column lg={4} md={3} sm={2}>
                                        <div className="form-group">
                                            <span className="form-label">Flyning to</span>
                                            <input className="form-control" type="text" placeholder="City or airport" />
                                        </div>
                                    </Column>
                                    <Column lg={4} md={3} sm={2}></Column>
                                    <Column lg={4} md={3} sm={2}></Column>

                                </Grid>
                                <Grid>
                                    <Column lg={4} md={3} sm={1}>
                                        <div className="form-group">
                                            <span className="form-label">Departing</span>
                                            <input className="form-control" type="date" required />
                                        </div>
                                    </Column>
                                    <Column lg={4} md={3} sm={1}>
                                        <div className="form-group">
                                            <span className="form-label">Returning</span>
                                            <input className="form-control" type="date" required />
                                        </div>
                                    </Column>
                                    <Column lg={2} md={1} sm={1}>
                                        <div className="form-group">
                                            <span className="form-label">Adults (18+)</span>
                                            <select className="form-control">
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </select>
                                            <span className="select-arrow"></span>
                                        </div>
                                    </Column>
                                    <Column lg={2} md={1} sm={1}>
                                        <div className="form-group">
                                            <span className="form-label">Children (0-17)</span>
                                            <select className="form-control">
                                                <option>0</option>
                                                <option>1</option>
                                                <option>2</option>
                                            </select>
                                            <span className="select-arrow"></span>
                                        </div>
                                    </Column>
                                </Grid>
                                <Grid>
                                    <Column lg={4} md={3} sm={2}>
                                        <div className="form-group">
                                            <span className="form-label">Travel class</span>
                                            <select className="form-control">
                                                <option>Economy class</option>
                                                <option>Business class</option>
                                                <option>First class</option>
                                            </select>
                                            <span className="select-arrow"></span>
                                        </div>
                                    </Column>
                                    <Column lg={4} md={3} sm={2}>
                                        <div className="form-btn">
                                            <button className="submit-btn">Show flights</button>
                                        </div>
                                    </Column>
                                    <Column lg={4} md={3} sm={2}></Column>
                                    <Column lg={4} md={3} sm={2}></Column>
                                </Grid>
                            </form>
                        </div>
                    </Column>
                </Grid>
            </div>
        </>
    );

}

export default Banner;
