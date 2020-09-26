import { produce } from 'immer'
import { ADD_NODE, DELETE_NODE, UPDATE_NODE, ADD_MULIT_NODES, SET_NODE_DOM } from '../types';
import {
  Action,
  AddNodePayload,
  AddMulitNodesPayload,
  SetNodeDomPayload
} from '@/types'

const initialState = {
  nodes: {}
}
const createNodeReducer2 = function (state = initialState, action: Action<any>) {
  return produce((state, draft) => {
    const { type, payload } = action

    switch (type) {
      case ADD_NODE: {
        const { id, node } = payload as AddNodePayload
        draft.nodes[id] = node
        break
      }
      case DELETE_NODE: {
        // TODO 删除未完成
        break
      }
      case ADD_MULIT_NODES: {
        const { nodes } = payload as AddMulitNodesPayload
        draft.nodes = nodes
        break
      }

      case SET_NODE_DOM: {
        const { id, el } = payload as SetNodeDomPayload
        draft.nodes[id].dom = el
        break
      }
    }
  })
}

const createNodeReducer = produce((state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_NODE: {
      const { id, node } = payload as AddNodePayload
      state.nodes[id] = node
      break
    }
    case DELETE_NODE: {
      // TODO 删除未完成
      break
    }
    case ADD_MULIT_NODES: {
      const { nodes } = payload as AddMulitNodesPayload
      state.nodes = nodes
      break
    }

    case SET_NODE_DOM: {
      const { id, el } = payload as SetNodeDomPayload
      state.nodes[id].dom = el
      break
    }
  }
  }, {})

export default createNodeReducer
