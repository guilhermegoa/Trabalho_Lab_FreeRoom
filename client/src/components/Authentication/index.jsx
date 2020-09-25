import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { validedToken } from '../../redux/ducks/user';

function Authentication({ isLogged, validedtoken }) {
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    if (!isLogged && !verifying) {
      validedtoken();
      setVerifying(true);
    } else if (isLogged) {
      setVerifying(false);
    }
  }, [isLogged, verifying, validedToken]);

  return <div />;
}

const mapStateToProps = ({ user }) => ({
  isLogged: user.isLogged,
});

const mapDispatchToProps = {
  validedtoken: validedToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);
