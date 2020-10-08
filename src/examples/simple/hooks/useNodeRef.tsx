import { useCallback } from 'react';
import { useNode } from '../../../core/hooks/useNode';
import { useDesigner } from '../../../core/hooks/useDesigner';


function isFiberNode(node) {
  return Object.getPrototypeOf(node).constructor.name === 'FiberNode'
}
export function isDOM(item) {
  return (typeof HTMLElement === 'function')
    ? (item instanceof HTMLElement)
    : (item && (typeof item === 'object') && (item.nodeType === 1) && (typeof item.nodeName === 'string'));
}

export function getComponentFiberNode(node) {
  let { _reactInternalFiber } = node
  if (!_reactInternalFiber) {
    if (isFiberNode(node)) return node
    return
  }

  return _reactInternalFiber
}
export function getFiberNodeDOM(fiber) {
  if (typeof fiber.type === 'string' && fiber.stateNode && isDOM(fiber.stateNode)) {
    return fiber.stateNode
  } else {
    return getFiberNodeDOM(fiber.child)
  }
}

export function isReactComponent(node) {
  if (!node) return false
  return !!node.isReactComponent
}

export const useNodeRef = () => {
  const { connect } = useNode()
  const refFn = useCallback(function (el) {
    if (!el) return
    let node = el
    if (isReactComponent(node)) {
      node = getFiberNodeDOM(getComponentFiberNode(node))
    }
    if (isDOM(node)) {
      connect(node)
    }
  }, [connect])
  return refFn
}

export const useCreateRef = (Comp) => {
  const { create } = useDesigner()
  const refFn = useCallback(function (el) {
    if (!el) return
    let node = el
    if (isReactComponent(node)) {
      node = getFiberNodeDOM(getComponentFiberNode(node))
    }
    if (isDOM(node)) {
      create(node, Comp)
    }
  }, [Comp, create])
  return refFn
}