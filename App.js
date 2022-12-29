import React from 'react';
import { Provider } from 'react-redux';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import store from './src/redux/store';
import { Home } from './src/screens/Home';

let persistor = persistStore(store)

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Home />
      </PersistGate>
    </Provider>

  );
};

export default App;