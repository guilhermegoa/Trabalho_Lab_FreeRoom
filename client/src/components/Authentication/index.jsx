import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import { validedToken, retriveUser } from '../../redux/ducks/user';

function Authentication({
  isLogged, validedToken, retriveUser,
}) {
  const [verifying, setVerifying] = useState(false);
  const userRetrive = useCallback(retriveUser, []);

  useEffect(() => {
    if (!isLogged && !verifying) {
      validedToken();
      setVerifying(true);
    } else if (isLogged) {
      userRetrive();
      setVerifying(false);
    }
  }, [isLogged, verifying, validedToken, userRetrive]);

  return <div />;
}

const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged,
  user: user.user,
});

const mapDispatchToProps = {
  validedToken,
  retriveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
