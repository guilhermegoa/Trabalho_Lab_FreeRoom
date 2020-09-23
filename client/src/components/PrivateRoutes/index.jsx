import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from '../../services/auth';
import api from '../../services/api';
import { userLogged } from '../../redux/ducks/user';

const PrivateRoute = ({
  path, exact, component, isLogged, logged,
}) => {
  // Fix this
  const validToken = async () => {
    if (isLogged) {
      return true;
    }

    const token = getToken();
    if (token) {
      const isValid = await api.get('/checkToken');

      if (isValid === true) {
        logged();
        return isValid;
      }
    }

    return false;
  };

  return (validToken() === true
    ? (<Route path={path} exact={exact} component={component} />)
    : (<Redirect to="/login" />));
};

const mapStateToProps = (state) => ({
  isLogged: state.isLogged,
});

const mapDispatchToProps = {
  logged: userLogged,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
