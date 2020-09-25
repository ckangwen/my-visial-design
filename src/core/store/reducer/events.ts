import {
  Action,
  UpdateEventPayload
} from '@/types';
import { UPDATE_EVENT } from '../types';

const initialState = {
  selected: null,
  dragged: null,
  hovered: null,
}

export default function eventReducer(state = initialState, action: Action<any>) {
  const { type, payload } = action

  switch (type) {
    case UPDATE_EVENT: {
      const { key, value } = payload as UpdateEventPayload
      return {
        ...state,
        [key]: value
      }
    }
    default:
      return state
  }
}