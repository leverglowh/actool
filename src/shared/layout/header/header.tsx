import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, NavbarBrand, NavLink, Nav, NavItem, /*UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText */} from 'reactstrap';

export interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = props => {
  const { t } = useTranslation();
<<<<<<< HEAD
  const refresh = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <div id="header">
      <Navbar color="light" light expand>
=======
  return (
    <div id="header">
      <Navbar color="light" light expand="md">
>>>>>>> origin/main
        <NavbarBrand href="/">{t('title')}</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/fish">{t('fish')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/bugs">{t('bugs')}</NavLink>
          </NavItem>
          <NavItem>
<<<<<<< HEAD
            <NavLink href="https://github.com/leverglowh/actool" target="_blank">GitHub</NavLink>
=======
            <NavLink href="https://github.com/leverglowh/actool">GitHub</NavLink>
>>>>>>> origin/main
          </NavItem>
          {/*
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                Option 1
              </DropdownItem>
              <DropdownItem>
                Option 2
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          */}
        </Nav>
<<<<<<< HEAD
        <img onClick={refresh} id="refresh-but" src={process.env.PUBLIC_URL + '/svg/refresh.svg'} alt="refresh" width="20"/>
=======
>>>>>>> origin/main
        {/* <NavbarText>Simple Text</NavbarText> */}
      </Navbar>
    </div>
  );
};

export default Header;
