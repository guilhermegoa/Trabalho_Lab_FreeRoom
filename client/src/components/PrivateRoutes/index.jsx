import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  path, exact, component, isLogged, isvalidToken,
}) => {
  const renderComponent = () => (isLogged
    ? <Route path={path} exact={exact} component={component} />
    : <Redirect to="/login" />);

  return (
    <>
      {!isvalidToken
        ? <h1>Carregando</h1>
        : renderComponent()}
    </>
  );
};

const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged,
  isvalidToken: user.isvalidToken,
});

export default connect(mapStateToProps, null)(PrivateRoute);
