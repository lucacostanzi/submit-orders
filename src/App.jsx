import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { blue, lightBlue } from 'material-ui/colors';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet';
import { PersistGate } from 'redux-persist/integration/react';
import OrdersAppContainer from './containers/OrdersAppContainer';
import { ordersStore, productsStore, customerStore, categoriesStore } from './reducers/index';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  ordersStore,
  productsStore,
  customerStore,
  categoriesStore,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
const persistor = persistStore(store);
/* eslint-enable */

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: lightBlue,
  },
  status: {
    danger: 'orange',
  },
});

const App = function App() {
  return (
    <MuiThemeProvider theme={theme} >
      <Provider store={store} >
        <PersistGate loading={null} persistor={persistor} >
          <div>
            <OrdersAppContainer />
          </div>
        </PersistGate>
      </Provider>
    </MuiThemeProvider>
  );
};
export default App;
