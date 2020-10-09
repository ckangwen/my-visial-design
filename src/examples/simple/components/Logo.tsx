import React from 'react'
import { useNodeRef } from '../hooks/useNodeRef';
import { ComponentSetting } from './setting';

export const Logo = () => {
  const refFn = useNodeRef()

  return (
    <div className="logo" ref={refFn} />
  )
}

(Logo as any).craft =
{
  related: {
    setting: ComponentSetting
  }
}
