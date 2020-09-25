import { produce } from 'immer'
import { ADD_NODE, DELETE_NODE, UPDATE_NODE, ADD_MULIT_NODES } from '../types';
import {
  Action,
  AddNodePayload,
  AddMulitNodesPayload
} from '@/types'

const initialState = {
  nodes: {}
}
const createNodeReducer = produce((state = initialState, action: Action<any>) => {
  const { type, payload } = action

  switch (type) {
    case ADD_NODE: {
      const { id, node } = payload as AddNodePayload
      return {
        ...state,
        [id]: node
      }
    }
    case DELETE_NODE: {
      // TODO 删除未完成
      return state
    }
    case ADD_MULIT_NODES: {
      const { nodes } = payload as AddMulitNodesPayload
      state.nodes = nodes
    }
  }
}, {})

export default createNodeReducer
