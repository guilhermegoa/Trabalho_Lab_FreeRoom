import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { validedToken, retriveUser } from '../../redux/ducks/user';

function Authentication({ isLogged, validedToken, retriveUser }) {
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!isLogged && !verifying) {
      validedToken();
      setVerifying(true);
    } else if (isLogged) {
      retriveUser();
      setVerifying(false);
    }
  }, [isLogged, verifying, validedToken]);

  return <div />;
}

const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged,
});

const mapDispatchToProps = {
  validedToken,
  retriveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
