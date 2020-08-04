import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { IRootState } from 'src/shared/reducers';
import { useTranslation } from 'react-i18next';
import { Navbar, NavbarBrand, NavLink, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, /*UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText */} from 'reactstrap';
import { Link } from 'react-router-dom';

import { getMe } from 'src/shared/reducers/authentication';

import './header.scss';

export interface IHeaderProps extends StateProps, DispatchProps {}

const Header: React.FC<IHeaderProps> = props => {
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false);
  useEffect(() => {
    props.getMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!isAccountMenuOpen);
  };

  const { t } = useTranslation();
  const refresh = () => {
    localStorage.clear();
    sessionStorage.clear();
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
        <div className="header-float-right">
          {props.isAuthenticated
          ? <Dropdown isOpen={isAccountMenuOpen} toggle={toggleAccountMenu}>
              <DropdownToggle nav caret>
                {props.user.username}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <Link className="nav-link" to="/logout">logout</Link>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          : <div>
              <Link className="nav-link" to="/login">{t('login')}</Link>
            </div>}
          <img onClick={refresh} id="refresh-but" src={process.env.PUBLIC_URL + '/svg/refresh.svg'} alt="refresh" width="20"/>
        </div>
        {/* <NavbarText>Simple Text</NavbarText> */}
      </Navbar>
    </div>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  user: authentication.user,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = {
  getMe
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
