import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import reducer from './reducer'

const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
const reduxDevTools =
  typeof window !== 'undefined' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__

const composeEnhancers = reduxDevTools || compose;
export const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middleware),
  )
)
