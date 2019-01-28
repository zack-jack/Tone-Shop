import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';

const INITIAL_STATE = {};

// Redux persist configuration
const persistConfig = {
  key: 'root',
  whitelist: ['auth'],
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Middlewares
const middleware = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(persistedReducer, INITIAL_STATE, middleware);
export const persistor = persistStore(store);
