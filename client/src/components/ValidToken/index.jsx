import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { validedToken } from '../../redux/ducks/user';

function ValidToken({ isValidToken, validedToken }) {
  const tokenValided = useCallback(validedToken, []);

  useEffect(() => {
    if (!isValidToken) {
      tokenValided();
    }
  }, [isValidToken, tokenValided]);

  return <div />;
}

const mapStateToProps = ({ user }) => ({
  isValidToken: user.isValidToken,
});

const mapDispatchToProps = {
  validedToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(ValidToken);
