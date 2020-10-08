import React from 'react'
import { Menu as AMenu } from 'antd'
import { useNodeRef } from '../hooks/useNodeRef';

const ASubMenu = AMenu.SubMenu;

export const Menu = ({ children, ...props }) => {
  const refFn = useNodeRef()
  return (
    <AMenu style={{ width: '400px', display: 'inline-block' }} ref={refFn} {...props}>
      { children }
    </AMenu>
  )
}

export const SubMenu = ({ children, ...props }) => {
  const refFn = useNodeRef()
  return (
    <ASubMenu {...props} ref={refFn}>
      { children }
    </ASubMenu>
  )
}

const Item = AMenu.Item

export const MenuItem = ({ children, ...props }) => {
  const refFn = useNodeRef()

  return (
      <Item ref={refFn} {...props}>
      { children }
    </Item>
  )
}