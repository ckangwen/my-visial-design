import React from 'react'
import { ROOT_ID,getDOMInfo } from '@/shared';
import {
  NodeDescriptor,
  NodeIdType,
  NodeDescriptorMapping
} from '@/types';
import { parseNodeFromJSX, createNodeDescriptor } from './helpers';


type NodeDescriptorTree = {
  rootNodeId: string
  nodes: Record<string, NodeDescriptor>
}

export class NodeHelper {
  node: NodeDescriptor
  id: NodeIdType
  nodes: NodeDescriptorMapping

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
    const sourceNode = this.nodes[sourceId],
          targetNode = this.nodes[targetId],
          targetParentNode = this.nodes[targetNode.data.parent],
          targetNextSiblingNodes = targetParentNode.data.nodes

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

    console.log(dimensionsInContainer);
  }

  private idToDOM(id: NodeIdType) {
    return this.nodes[id].dom
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
