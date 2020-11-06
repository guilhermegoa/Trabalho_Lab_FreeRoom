import React from 'react';
import { Provider } from 'react-redux';
import ThemeContainer from './style/theme/ThemeContainer';
import Routes from './routes';
import store from './redux/store';
import ValidToken from './components/ValidToken';

function App() {
  return (
    <Provider store={store}>
      <ValidToken />
      <ThemeContainer>
        <Routes />
      </ThemeContainer>
    </Provider>
  );
}

export default App;
