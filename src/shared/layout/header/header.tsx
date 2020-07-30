import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, NavbarBrand, NavLink, Nav, NavItem, /*UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText */} from 'reactstrap';

export interface IHeaderProps {}

const Header: React.FC<IHeaderProps> = props => {
  const { t } = useTranslation();
  return (
    <div id="header">
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">{t('title')}</NavbarBrand>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="/fish">{t('fish')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/bugs">{t('bugs')}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="https://github.com/leverglowh/actool">GitHub</NavLink>
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
        {/* <NavbarText>Simple Text</NavbarText> */}
      </Navbar>
    </div>
  );
};

export default Header;
