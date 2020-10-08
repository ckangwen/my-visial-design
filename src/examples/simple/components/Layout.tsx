import React, { useCallback } from 'react'
import { Layout as ALayout } from 'antd'
import { isReactComponent, isDOM, getFiberNodeDOM, getComponentFiberNode } from '../hooks/useNodeRef';
import { useNode } from '../../../core/hooks/useNode';

const AHeader = ALayout.Header

export const Header = ({ children, ...props }) => {
  const { connect } = useNode()
  const refFn = useCallback(function (el) {
    let node = el
    if (isReactComponent(node)) {
      node = getFiberNodeDOM(getComponentFiberNode(node))
    }
    if (isDOM(node)) {
      connect(node)
    }
  }, [connect])
  return (
    <AHeader ref={refFn} { ...props } >
      { children }
    </AHeader>
  )
}
export const Layout = ({ children, ...props }) => {
  const { connect } = useNode()
  const refFn = useCallback(function (el) {
    let node = el
    if (isReactComponent(node)) {
      node = getFiberNodeDOM(getComponentFiberNode(node))
    }
    if (isDOM(node)) {
      connect(node)
    }
  }, [connect])
  return (
    <ALayout ref={refFn} { ...props } >
      { children }
    </ALayout>
  )
}
