import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const FreeRoute = ({ path, exact, component, isLogged }) => {
  return (
    <>
      {!isLogged ? (
        <Route path={path} exact={exact} component={component} />
      ) : (
        <Redirect to="/communities/1" />
      )}
    </>
  )
}

const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged,
  isValidToken: user.isValidToken
})

export default connect(mapStateToProps, null)(FreeRoute)
