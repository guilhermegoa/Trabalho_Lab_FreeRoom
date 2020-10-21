import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PublicRoute = ({ path, exact, component, isLogged }) => {
  return (
    <>
      {!isLogged ? (
        <Route path={path} exact={exact} component={component} />
      ) : (
        <Redirect to="main" />
      )}
    </>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged,
  isValidToken: user.isValidToken
})

export default connect(mapStateToProps, null)(PublicRoute)
