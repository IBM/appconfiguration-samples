import React from 'react';
import {
    Header,
    HeaderContainer,
    HeaderName,
    HeaderNavigation,
    HeaderMenuItem,
    HeaderGlobalBar,
    HeaderGlobalAction,
    SideNav,
    SideNavItems,
    SideNavLink,
    HeaderMenuButton,
    SkipToContent,
} from '@carbon/react';
import { Notification, UserAvatar, Search, Fade } from '@carbon/react/icons';
import { Link } from 'react-router-dom';
import './header.scss';
import Login from './Login';
import Logout from './Logout';

const SideHeader = (props) => {

    const handleChange = (val) => {
        props.onChange(val);
      }
    
    return (
        <HeaderContainer
            render={({ isSideNavExpanded, onClickSideNavExpand }) => (
                <Header aria-label="Blue Charge">

                    <SkipToContent />

                    <HeaderMenuButton
                        aria-label="Open menu"
                        isCollapsible
                        onClick={onClickSideNavExpand}
                        isActive={isSideNavExpanded}
                    />

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
                        {props.email ?
                            <><HeaderNavigation aria-label={props.email}>
                                <HeaderMenuItem style={{ "fontSize": "16px", "fontWeight": "bold" }}>{props.email}</HeaderMenuItem>
                            </HeaderNavigation><Logout onChange={handleChange}></Logout></>
                            :
                            <Login onChange={handleChange}></Login>}
                    </HeaderGlobalBar>

                    <SideNav
                        aria-label="Side navigation"
                        isRail
                        expanded={isSideNavExpanded}
                        onOverlayClick={onClickSideNavExpand}>
                        <SideNavItems>
                            <SideNavLink
                                renderIcon={Fade}
                                href="#">
                                MOBILE
                            </SideNavLink>
                            <SideNavLink
                                renderIcon={Fade}
                                href="#">
                                DATACARD
                            </SideNavLink>
                            <SideNavLink
                                renderIcon={Fade}
                                href="#">
                                DTH
                            </SideNavLink>
                            <SideNavLink
                                renderIcon={Fade}
                                href="#">
                                LANDLINE
                            </SideNavLink>
                        </SideNavItems>
                    </SideNav>

                </Header>
            )}
        />
    );
}

export default SideHeader;
