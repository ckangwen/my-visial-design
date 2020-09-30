import { UPDATE_EVENT, UPDATE_INDICATOR } from '../types';
import {
  Action,
  UpdateEventPayload,
  NodeIdType,
  EventNameType
} from '@/types'

export const updateEventAction = (payload: UpdateEventPayload): Action<UpdateEventPayload> => ({
  type: UPDATE_EVENT,
  payload
})
export const updateIndicatorAction = (payload) => ({
  type: UPDATE_INDICATOR,
  payload
})

export function updateEvent(key: EventNameType, value: NodeIdType | null) {
  return function (dispatch) {
    dispatch(updateEventAction({ key, value }))
  }
}

export function updateIndicator(indicator) {
  return function(dispatch) {
    dispatch(updateIndicatorAction(indicator))
  }
}
