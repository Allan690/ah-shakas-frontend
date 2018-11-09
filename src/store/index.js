import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers/index';

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsCreators and other options if needed here
});

const storeConfig = () => {
  const middlewares = [
    thunkMiddleware,
    promiseMiddleware(),
  ];
  const store = createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(
        ...middlewares,
      ), /* other store enhancers if any */
    ),
  );
  return store;
};

export default storeConfig;
