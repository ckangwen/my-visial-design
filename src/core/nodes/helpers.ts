import React, { createElement, Fragment } from 'react'
import { NodeDescriptor, NodeBoxInfo } from '@/types'
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

  let type = element.type as any

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
  if (actualType) {
    id = `${actualType.name}-${id}`
  }

  let node = {} as NodeDescriptor
  node.id = id
  node.timestamp = Date.now()

  node.data = {
    type: actualType,
    props: { ...newNode.data.props },
    name:
      actualType ? typeof actualType == 'string' ? actualType : (actualType as any).name : actualType,
    displayName:
      actualType ? typeof actualType == 'string' ? actualType : (actualType as any).name: actualType,
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
    ...((actualType && actualType.craft && actualType.craft.rules) || {}),
  };

  if (normalize) {
    normalize(node);
  }

  return node
}

export default function findPosition(
  parent: NodeDescriptor,
  dims: NodeBoxInfo[],
  posX: number,
  posY: number
) {
  let result = {
    parent,
    index: 0,
    where: 'before',
  };

  let leftLimit = 0,
    xLimit = 0,
    dimRight = 0,
    yLimit = 0,
    xCenter = 0,
    yCenter = 0,
    dimDown = 0;

  // Each dim is: Top, Left, Height, Width
  for (let i = 0, len = dims.length; i < len; i++) {
    const dim = dims[i];

    // Right position of the element. Left + Width
    dimRight = dim.left + dim.outerWidth;
    // Bottom position of the element. Top + Height
    dimDown = dim.top + dim.outerHeight;
    // X center position of the element. Left + (Width / 2)
    xCenter = dim.left + dim.outerWidth / 2;
    // Y center position of the element. Top + (Height / 2)
    yCenter = dim.top + dim.outerHeight / 2;
    // Skip if over the limits
    if (
      (xLimit && dim.left > xLimit) ||
      (yLimit && yCenter >= yLimit) || // >= avoid issue with clearfixes
      (leftLimit && dimRight < leftLimit)
    )
      continue;

    result.index = i;
    // If it's not in flow (like 'float' element)
    if (!dim.inFlow) {
      if (posY < dimDown) yLimit = dimDown;
      //If x lefter than center
      if (posX < xCenter) {
        xLimit = xCenter;
        result.where = 'before';
      } else {
        leftLimit = xCenter;
        result.where = 'after';
      }
    } else {
      // If y upper than center
      if (posY < yCenter) {
        result.where = 'before';
        break;
      } else result.where = 'after'; // After last element
    }
  }

  return result;
}
