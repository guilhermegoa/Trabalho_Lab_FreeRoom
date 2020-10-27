import React from 'react';
import { Provider } from 'react-redux';

import Authentication from './components/Authentication';
import ThemeContainer from './style/theme/ThemeContainer';
import Routes from './routes';

import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Authentication />
      <ThemeContainer>
        <Routes />
      </ThemeContainer>
    </Provider>
  );
}

export default App;
