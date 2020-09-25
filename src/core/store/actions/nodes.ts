import {
  ADD_NODE,
  UPDATE_NODE,
  ADD_MULIT_NODES
} from '../types';
import {
  PlainObject,
  Action,
  UpdateNodePayload,
  AddNodePayload,
  NodeDescriptor,
  NodeIdType,
  AddMulitNodesPayload
} from '@/types'

const updateNodeAction = (payload: UpdateNodePayload): Action<UpdateNodePayload> => ({
  type: UPDATE_NODE,
  payload
})
const addNodeAction = (payload: AddNodePayload): Action<AddNodePayload> => ({
  type: ADD_NODE,
  payload
})
const addMulitNodes = (payload: AddMulitNodesPayload): Action<AddMulitNodesPayload> => ({
  type: ADD_MULIT_NODES,
  payload
})


export function addNewNode(node: NodeDescriptor, parentId: NodeIdType, index?: number) {
  return function (dispatch, getState) {
    const { nodes } = getState()

    const parent = nodes[parentId]

    if (parent.data.props.children) {
      delete parent.data.props['children']
    }

    // 子代通过parent确定关联，父代通过nodes确定关联
    node.data.parent = parent.id
    if (index) {
      // 将node插入到parent.data.nodes的index位置
      parent.data.nodes.splice(index, 0, node.id);
    } else {
      // 插入末尾
      parent.data.nodes.push(node.id);
    }

    // 更新父节点，添加子节点
    dispatch(updateNodeAction({ id: parentId, node: parent }))
    dispatch(addNodeAction({ id: node.id, node }))
  }
}

export function addNodesB(nodes: PlainObject<NodeDescriptor>) {
  return function(dispatch) {
    dispatch(addMulitNodes({ nodes }))
  }
}


export function moveNode(parentId: NodeIdType, id: NodeIdType, index?: number) {
  return function (dispatch, getState) {
    
  }
}

// export function deleteNode(id: NodeIdType, parentId: NodeIdType) {
//   return function (dispatch, getState) {
//     const nodes: NodeDescriptorMapping = getState().nodes
//     const target = nodes[id]
//     const parent = nodes[parentId]
//     const parentChildren = parent.data.nodes
//     let newNodes
//     let IdsToDelete = []

//     // 从父节点的子节点列表中删除
//     parentChildren.splice(parentChildren.indexOf(id), 1)

//     // 删除本节点之前，需要先把子节点删除
//     if (target.data.nodes) {
//       newNodes = [...target.data.nodes].map(childId => {
//         IdsToDelete.push(childId)
//         return deletChildNode(target, childId)
//       })
//     }


//     updateEvents(id, true)
//     dispatch(deleteNodeAction())
//   }
// }

// function deletChildNode(node: NodeDescriptor, childId) {
//   const nodes = node.data.nodes
//   nodes.splice(nodes.indexOf(childId), 1)
//   return nodes
// }

// function ddd({parent, child, parentId, childId, getState }) {
//   const parentChildren = parent.data.nodes
//     // 从父节点的子节点列表中删除
//     parentChildren.splice(parentChildren.indexOf(childId), 1)

//     // 删除本节点之前，需要先把子节点删除
//     if (child.data.nodes) {
//       [...child.data.nodes].forEach(childId => {
//         // ddd({ parent: child })
//       })
//     }
// }
