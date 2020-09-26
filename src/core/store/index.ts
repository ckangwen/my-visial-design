import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'

const middlewares = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger());
}
// export const store = createStore(
//   reducer,
//   composeEnhancers(
//     applyMiddleware(...middlewares),
//   )
// )

function configureStore(preloadedState?: any) {
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers) as any;
  const store = createStore(reducer, preloadedState, composedEnhancers);
  return store;
}

export const store = configureStore()
