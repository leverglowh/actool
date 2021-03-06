import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { useParams, useLocation, Redirect } from 'react-router';
import { loginProvider } from 'src/shared/reducers/authentication';
import { IRootState } from 'src/shared/reducers';
import { AUTH_TOKEN_KEY } from 'src/config/constans';

export interface IConnectPageProps extends StateProps, DispatchProps {}

const ConnectPage: React.FC<IConnectPageProps> = props => {
  const [redirect, setRedirect] = useState(false);
  const { provider } = useParams();
  const location = useLocation();

  useEffect(() => {
    props.loginProvider(provider, location.search);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.loginSuccess) {
      localStorage.setItem(AUTH_TOKEN_KEY, props.idToken);

      setTimeout(() => setRedirect(true), 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loginSuccess]);

  return (
    <div>
      {props.loading && <span>wait</span>}
      {redirect && <Redirect to="/" />}
    </div>
  )
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  loading: authentication.loading,
  idToken: authentication.idToken,
  user: authentication.user,
  loginError: authentication.loginError,
  loginSuccess: authentication.loginSuccess
});

const mapDispatchToProps = { loginProvider };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectPage);
