import { produce } from 'immer'
import { ADD_NODE, DELETE_NODE, ADD_MULIT_NODES, SET_NODE_DOM, UPDATE_NODE_PROPERTY, SET_NODES } from '../types';
import {
  Action,
  NodeState,
  AddNodePayload,
  AddMulitNodesPayload,
  SetNodeDomPayload,
  UpdateNodePropertyPayload,
  SetNodesPayload
} from '@/types'
import { deepset } from '@/shared'

const initialState = {
  nodes: {}
}

const createNodeReducer = produce((state: NodeState = initialState, action: Action<any>) => {
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
      state.nodes = { ...state.nodes, ...nodes }
      break
    }

    case SET_NODE_DOM: {
      const { id, el } = payload as SetNodeDomPayload
      state.nodes[id].dom = el
      break
    }
    case SET_NODES: {
      const { id, nodes } = payload as SetNodesPayload
      state.nodes[id].data.nodes = nodes
      break
    }

    case UPDATE_NODE_PROPERTY: {
      const { id, key, value } = payload as UpdateNodePropertyPayload
      deepset(state.nodes[id], key, value)
      break
    }
  }
  }, {})

export default createNodeReducer
