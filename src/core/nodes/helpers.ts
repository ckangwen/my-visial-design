import React, { createElement, Fragment } from 'react'
import { NodeDescriptor } from '@/types'
import { getRandomId } from '@/shared'

type PartialNodeDescriptor = Partial<Pick<NodeDescriptor, 'data' | 'id'>>

export function parseNodeFromJSX(
  jsx: React.ReactElement | string,
  normalize?: (node: NodeDescriptor, jsx: React.ReactElement) => void
) {
  let element = jsx as React.ReactElement
  if (typeof element === 'string') {
    element = createElement(Fragment, {}, element)
  }

  let type = element.type

  return createNodeDescriptor(
    {
      data: {
        type,
        props: { ...element.props }
      } as any
    }, (n) => {
      if (normalize) {
        normalize(n, element)
      }
    }
  )
}

export function createNodeDescriptor(
  newNode: PartialNodeDescriptor,
  normalize?: (node: NodeDescriptor) => void
) {
  let actualType = newNode.data.type
  let id = newNode.id || getRandomId()

  let node = {} as NodeDescriptor
  node.id = id
  node.timestamp = Date.now()

  node.data = {
    type: actualType,
    props: { ...newNode.data.props },
    name:
      typeof actualType == 'string' ? actualType : (actualType as any).name,
    displayName:
      typeof actualType == 'string' ? actualType : (actualType as any).name,
    custom: {},
    isCanvas: false,
    hidden: false,
    nodes: [],
    linkedNodes: {},
    ...node.data,
  }
  node.related = {}

  node.events = {
    selected: null,
    dragged: null,
    hovered: null,
  }

  node.rules = {
    canDrag: () => true,
    canDrop: () => true,
    canMoveIn: () => true,
    canMoveOut: () => true,
    ...((actualType.craft && actualType.craft.rules) || {}),
  };
  // if (node.data.type === Element || node.data.type === Canvas) {

  if (normalize) {
    normalize(node);
  }

  return node
}

export function isElement(value: any): value is Element {
  if (!value) return false
  return value instanceof Element
}