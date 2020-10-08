import React from 'react'
import { useNodeRef } from '../hooks/useNodeRef';

export const Logo = () => {
  const refFn = useNodeRef()

  return (
    <div className="logo" ref={refFn} />
  )
}
