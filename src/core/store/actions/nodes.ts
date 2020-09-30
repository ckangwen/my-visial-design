import { SET_NODE_DOM, UPDATE_NODE_PROPERTY, SET_NODES } from '../types';
import {
  ADD_NODE,
  UPDATE_NODE,
  ADD_MULIT_NODES
} from '../types';
import {
  PlainObject,
  Action,
  UpdateNodePayload,
  UpdateNodePropertyPayload,
  AddNodePayload,
  NodeDescriptor,
  NodeIdType,
  AddMulitNodesPayload,
  SetNodeDomPayload,
  SetNodesPayload
} from '@/types'

const updateNodeAction = (payload: UpdateNodePayload): Action<UpdateNodePayload> => ({
  type: UPDATE_NODE,
  payload
})
const addNodeAction = (payload: AddNodePayload): Action<AddNodePayload> => ({
  type: ADD_NODE,
  payload
})
const addMulitNodesAction = (payload: AddMulitNodesPayload): Action<AddMulitNodesPayload> => ({
  type: ADD_MULIT_NODES,
  payload
})
const setNodeDomAction = (payload: SetNodeDomPayload): Action<SetNodeDomPayload> => ({
  type: SET_NODE_DOM,
  payload
})
const updateNodePropertyAction = (payload: UpdateNodePropertyPayload): Action<UpdateNodePropertyPayload> => ({
  type: UPDATE_NODE_PROPERTY,
  payload
})
const setNodesAction = (payload: SetNodesPayload): Action<SetNodesPayload> => ({
  type: SET_NODES,
  payload
})


export function addNewNode(node: NodeDescriptor, parentId: NodeIdType, index?: number) {
  return function (dispatch, getState) {
    const { nodes } = getState().nodes

    const parent = nodes[parentId]

    if (node.data.props.children) {
      delete node.data.props['children']
    }

    const parentNodes = parent.data.nodes.slice()

    // 子代通过parent确定关联，父代通过nodes确定关联
    node.data.parent = parentId
    index = Math.min(index, parent.data.nodes.length)
    if (index) {
      // 将node插入到parent.data.nodes的index位置
      parentNodes.splice(index, 0, node.id);
    } else {
      // 插入末尾
      parentNodes.push(node.id);
    }

    // 需要先把新的节点插入到nodes中
    dispatch(addNodeAction({ id: node.id, node }))
    dispatch(updateNodeProperty(parentId, 'data.nodes', parentNodes))
  }
}

export function addNodesB(nodes: PlainObject<NodeDescriptor>) {
  return function(dispatch) {
    dispatch(addMulitNodesAction({ nodes }))
  }
}


export function setNodeDOM(id: NodeIdType, el: Element) {
  return function (dispatch, getState) {
    dispatch(setNodeDomAction({ id, el }))
  }
}

export function setNodes(id: NodeIdType, nodes: NodeIdType[]) {
  return function (dispatch) {
    dispatch(setNodesAction({ id, nodes }))
  }
}

export function updateNodeProperty(id: NodeIdType, key: string, value: any) {
  return function (dispatch) {
    dispatch(updateNodePropertyAction({ id, key, value }))
  }
}
