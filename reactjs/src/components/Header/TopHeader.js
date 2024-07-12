import React from 'react';
import {
  Header,
  HeaderContainer,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
} from '@carbon/react';
import { Notification, UserAvatar, Search } from '@carbon/react/icons';
import { Link } from 'react-router-dom';
import './header.scss';
import Login from './Login';
import Logout from './Logout';

const TopHeader = (props) => {

  const handleChange = (val) => {
    props.onChange(val);
  }

  return (
    <HeaderContainer
      render={() => (
        <Header aria-label="Blue Charge">

          <HeaderName element={Link} to="/" prefix="Blue" style={{ "fontSize": "20px" }}>
            Charge
          </HeaderName>

          <HeaderGlobalAction
            aria-label="Notifications"
            tooltipAlignment="center">
            <Notification size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="User Avatar"
            tooltipAlignment="center">
            <UserAvatar size={20} />
          </HeaderGlobalAction>
          <HeaderGlobalAction
            aria-label="Search"
            tooltipAlignment="end">
            <Search size={20} />
          </HeaderGlobalAction>

          <HeaderGlobalBar>
            <HeaderNavigation aria-label="Mobile">
              <HeaderMenuItem href="#">MOBILE</HeaderMenuItem>
            </HeaderNavigation>
            <HeaderNavigation aria-label="Datacard">
              <HeaderMenuItem href="#">DATACARD</HeaderMenuItem>
            </HeaderNavigation>
            <HeaderNavigation aria-label="DTH">
              <HeaderMenuItem href="#">DTH</HeaderMenuItem>
            </HeaderNavigation>
            <HeaderNavigation aria-label="landline">
              <HeaderMenuItem href="#">LANDLINE</HeaderMenuItem>
            </HeaderNavigation>
            <>
              {props.email ?
                <><HeaderNavigation aria-label={props.email}>
                  <HeaderMenuItem style={{ "fontSize": "16px", "fontWeight": "bold" }}>{props.email}</HeaderMenuItem>
                </HeaderNavigation><Logout onChange={handleChange}></Logout></>
                :
                <Login onChange={handleChange}></Login>}
            </>
          </HeaderGlobalBar>

        </Header>
      )}
    />
  );
}

export default TopHeader;
