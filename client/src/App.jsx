import React from 'react';
import { Provider } from 'react-redux';

import ThemeContainer from './style/theme/ThemeContainer';

import Routes from './routes';

import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeContainer>
        <Routes />
      </ThemeContainer>
    </Provider>
  );
}

export default App;
