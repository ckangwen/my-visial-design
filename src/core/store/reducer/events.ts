import { produce } from 'immer'
import {
  Action,
  UpdateEventPayload,
  EventState
} from '@/types';
import { UPDATE_EVENT, UPDATE_INDICATOR } from '../types';

const initialState = {
  selected: null,
  dragged: null,
  hovered: null,
  indicator: null
}


const eventReducer = produce((state: EventState = initialState, action: Action<any>) => {
  const { type, payload } = action

  switch (type) {
    case UPDATE_EVENT: {
      const { key, value } = payload as UpdateEventPayload
      state[key] = value
      break
    }
    case UPDATE_INDICATOR: {
      state.indicator = payload
      break
    }
    default:
      return state
  }
}, {})

export default eventReducer
