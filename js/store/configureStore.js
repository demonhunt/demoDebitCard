import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from './promise'
import reducers from '../reducers'
import { REHYDRATE, PURGE, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import AsyncStorage from '@react-native-async-storage/async-storage'
var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent

const config = {
  key: 'primary',
  storage : AsyncStorage,
};

function configureStore(onComplete: ?() => void) {
  let reducer = persistCombineReducers(config, reducers);

  const store = createStore(
    reducer,
    compose(applyMiddleware(thunk, promise)),
  );
  return store;
}
module.exports = configureStore;
