import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, NavbarBrand, NavLink, Nav, NavItem, /*UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText */} from 'reactstrap';
import { Link } from 'react-router-dom';

export interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = props => {
  const { t } = useTranslation();
  const refresh = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <div id="header">
      <Navbar color="light" light expand>
        <NavbarBrand href="/">{t('title')}</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <Link className="nav-link" to="/fish">{t('fish')}</Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/bugs">{t('bugs')}</Link>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/leverglowh/actool" target="_blank">GitHub</NavLink>
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
        <img onClick={refresh} id="refresh-but" src={process.env.PUBLIC_URL + '/svg/refresh.svg'} alt="refresh" width="20"/>
        {/* <NavbarText>Simple Text</NavbarText> */}
      </Navbar>
    </div>
  );
};

export default Header;
