import React from 'react';
import PropTypes from 'prop-types';

import {
  ThemeProvider as ChakraThemeProvider,
  ColorModeProvider,
  CSSReset,
} from '@chakra-ui/core';

import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';

import theme from './theme';

const ThemeContainer = ({ children }) => (
  <ChakraThemeProvider theme={theme}>
    <ColorModeProvider value="light">
      <EmotionThemeProvider theme={theme}>
        <CSSReset />
        {children}
      </EmotionThemeProvider>
    </ColorModeProvider>
  </ChakraThemeProvider>
);

ThemeContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ThemeContainer;
