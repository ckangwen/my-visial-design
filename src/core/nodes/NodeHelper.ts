import React from 'react'
import invariant from 'tiny-invariant'
import {
  ROOT_ID,
  ERROR_CANNOT_DRAG,
  ERROR_MOVE_INCOMING_PARENT,
  ERROR_MOVE_CANNOT_DROP,
  getDOMInfo
} from '@/shared';
import {
  NodeDescriptor,
  NodeIdType,
  NodeDescriptorMapping,
  Indicator
} from '@/types';
import { parseNodeFromJSX, createNodeDescriptor } from './helpers';
import findPosition from './helpers';
import { updateNodeProperty } from '../store/actions/nodes';


type NodeDescriptorTree = {
  rootNodeId: string
  nodes: Record<string, NodeDescriptor>
}

export class NodeHelper {
  node: NodeDescriptor
  id: NodeIdType
  nodes: NodeDescriptorMapping
  dispatch: any;

  constructor(node?: NodeDescriptor, id?: NodeIdType) {
    this.node = node
    this.id = id
  }

  receiveId(id: NodeIdType) {
    this.id = id
  }
  receiveNode(node: NodeDescriptor) {
    this.node = node
  }
  receiveNodes(nodes: NodeDescriptorMapping) {
    this.nodes = nodes
  }
  reveiveDispatch(dispatch) {
    this.dispatch = dispatch
  }

  getNode(id) {
    return id ? this.nodes[id] : this.node;
  }

  childrenIds() {
    return this.node.data.nodes || []
  }

  isCanvas() {
    return this.node.data.isCanvas
  }

  isRoot() {
    return this.node.id === ROOT_ID
  }

  isDraggable({ node, id, onError }: { node?: NodeDescriptor, id?: NodeIdType, onError: (error: Error) => any}) {
    try {
      const target = node
        ? node
        : id
          ? this.nodes[id]
          : this.node
      invariant(
        target.rules.canDrag(target, this),
        ERROR_CANNOT_DRAG
      )
      return true
    } catch (error) {
      onError(error)
      return false
    }
  }
  // TODO 待完善
  isDroppable({ node, id, onError }: { node?: NodeDescriptor, id?: NodeIdType, onError: (error: Error) => any}) {
    try {
      const target = node
        ? node
        : id
          ? this.nodes[id]
          : this.node
      invariant(
        target.rules.canMoveIn(target, this),
        ERROR_MOVE_INCOMING_PARENT
      )
      invariant(
        target.rules.canDrop(target, this),
        ERROR_MOVE_CANNOT_DROP
      )
      return true
    } catch (error) {
      onError(error)
      return false
    }
  }
  setProp(id: NodeIdType, key: string, value: any) {
    this.dispatch(updateNodeProperty(id, `data.props.${key}`, value))
  }
  parseReactNode(reactElement, normalize?: (nodeDesc: NodeDescriptor, jsx: React.ReactElement) => void) {
    let node = parseNodeFromJSX(reactElement, (node, jsx) => {
      // const name = resolveComponent(state.options.resolver, node.data.type);
      const name = node.data.type;
      node.data.displayName = node.data.displayName || name;
      node.data.name = name;
      if (normalize) {
        normalize(node, jsx);
      }
    })
    let childrenNodes: NodeDescriptorTree[] = []
    if (reactElement.props && reactElement.props.children) {
      // 如果有子节点，则解析子节点
      childrenNodes = React.Children.toArray(reactElement.props.children).reduce((accum: any[], child) => {
        if (React.isValidElement(child)) {
          accum.push(this.parseReactNode(child, normalize));
        } else if (typeof child === 'string') {
          accum.push(mergeTrees(this.createTextNode(child), []))
        }
        return accum;
      }, []) as any[]
    }

    return mergeTrees(node, childrenNodes) as NodeDescriptorTree;
  }
  createTextNode(text: string = '') {
    const textNode = createNodeDescriptor({ data: {} as any})
    textNode.data.text = text
    return textNode
  }
  getDropPlaceholder(
    sourceId: NodeIdType,
    targetId: NodeIdType,
    coordinate: {x: number, y: number }
  ) {
    const sourceNode = this.nodes[sourceId]
    const targetNode = this.nodes[targetId]
    const targetParentNode = targetNode.id === ROOT_ID ? targetNode : this.nodes[targetNode.data.parent]
    const targetNextSiblingNodes = targetParentNode.data.nodes

    if (!targetParentNode) return

    const dimensionsInContainer = targetNextSiblingNodes ? targetNextSiblingNodes.reduce((result, id) => {
      const dom = this.idToDOM(id)
      if (dom) {
        const info = {
          id,
          ...getDOMInfo(dom)
        }

        result.push(info)
      }
      return result
    }, []) : []

    const dropAction = findPosition(
      targetParentNode,
      dimensionsInContainer,
      coordinate.x,
      coordinate.y
    )

    const currentNode = targetNextSiblingNodes.length && this.nodes[targetNextSiblingNodes[dropAction.index]]

    const output: Indicator = {
      placement: {
        currentNode,
        dragNode: sourceNode,
        ...dropAction
      },
      error: false,
    }

    return output
  }

  private idToDOM(id: NodeIdType) {
    return this.nodes[id].dom
  }
}

export const mergeTrees = (
  rootNode: NodeDescriptor,
  childrenNodes: NodeDescriptorTree[]
): any => {

  return {
  rootNodeId: rootNode.id,
  nodes: mergeNodes(rootNode, childrenNodes),
}
}

const mergeNodes = (rootNode: NodeDescriptor, childrenNodes: NodeDescriptorTree[]) => {
  if (childrenNodes.length < 1) {
    return { [rootNode.id]: rootNode };
  }

  const nodes = childrenNodes.map(({ rootNodeId }) => rootNodeId);
  const nodeWithChildren = { ...rootNode, data: { ...rootNode.data, nodes } };
  const rootNodes = { [rootNode.id]: nodeWithChildren };

  return childrenNodes.reduce((accum, tree) => {
    const currentNode = tree.nodes[tree.rootNodeId];
    if (currentNode.data.props.children) {
      delete currentNode.data.props.children
    }
    return {
      ...accum,
      ...tree.nodes,
      // set the parent id for the current node
      [currentNode.id]: {
        ...currentNode,
        data: {
          ...currentNode.data,
          parent: rootNode.id,
        },
      },
    };
  }, rootNodes);
};
