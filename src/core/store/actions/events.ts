import { UPDATE_EVENT } from '../types';
import {
  Action,
  UpdateEventPayload,
  NodeIdType
} from '@/types'

export const updateEventAction = (payload: UpdateEventPayload): Action<UpdateEventPayload> => ({
  type: UPDATE_EVENT,
  payload
})

export function updateEvents(id: NodeIdType, isDelete?: boolean) {
  return function (dispatch, getState) {
    const events = getState().events

    Object.keys(events).forEach(key => {
      if (events[key] && events[key] === id) {
        dispatch(updateEventAction({ key, value: isDelete ? null : id }))
      }
    })
  }
}