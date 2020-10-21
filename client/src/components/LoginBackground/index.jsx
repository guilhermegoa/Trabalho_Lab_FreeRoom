import React from 'react';
import PropTypes from 'prop-types';

import background from '../../assets/images/Background.png';

import { Container, BackGroundImage, BackGroundLayer } from './styles';

function LoginBackground({ children }) {
  return (
    <Container>
      <BackGroundImage src={background} />
      <BackGroundLayer>
        {children}
      </BackGroundLayer>
    </Container>
  );
}

LoginBackground.prototype = {
  children: PropTypes.element.isRequired,
};

export default LoginBackground;
