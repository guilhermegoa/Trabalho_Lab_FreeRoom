import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  path, exact, component, isLogged,
}) => (isLogged
  ? (<Route path={path} exact={exact} component={component} />)
  : (<Redirect to="/login" />));

const mapStateToProps = (state) => ({
  isLogged: state.isLogged,
});

export default connect(mapStateToProps, null)(PrivateRoute);
