import { combineReducers } from "redux";
import createNodesReducer from './nodes'
import createEventsReducer from './events'

export default combineReducers({
  nodes: createNodesReducer,
  events: createEventsReducer
})
