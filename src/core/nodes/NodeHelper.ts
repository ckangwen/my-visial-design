import React from 'react'
import { ROOT_ID } from '@/shared';
import {
  NodeDescriptor,
  NodeIdType
} from '@/types';
import { parseNodeFromJSX } from './helpers';


type NodeDescriptorTree = {
  rootNodeId: string
  nodes: Record<string, NodeDescriptor>
}

export class NodeHelper {
  node: NodeDescriptor
  id: NodeIdType

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

  get() {
    return this.node;
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

  isDraggable() {}
  isDroppable() {}
  toSerializedNode() {}
  toNodeTree() {}

  getSerializedNodes() {}
  serialize() {}
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
        }
        return accum;
      }, []) as any[]
    }

    return mergeTrees(node, childrenNodes) as NodeDescriptorTree;
  }
}



export const mergeTrees = (
  rootNode: NodeDescriptor,
  childrenNodes: NodeDescriptorTree[]
): any => ({
  rootNodeId: rootNode.id,
  nodes: mergeNodes(rootNode, childrenNodes),
});

const mergeNodes = (rootNode: NodeDescriptor, childrenNodes: NodeDescriptorTree[]) => {
  if (childrenNodes.length < 1) {
    return { [rootNode.id]: rootNode };
  }

  const nodes = childrenNodes.map(({ rootNodeId }) => rootNodeId);
  const nodeWithChildren = { ...rootNode, data: { ...rootNode.data, nodes } };
  const rootNodes = { [rootNode.id]: nodeWithChildren };

  return childrenNodes.reduce((accum, tree) => {
    const currentNode = tree.nodes[tree.rootNodeId];
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
