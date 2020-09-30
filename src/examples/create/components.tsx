import React, { useCallback } from 'react'
import { useDesigner } from '../../core/hooks/useDesigner';
import { useNode } from '@/core/hooks/useNode';

export const Button: React.FC<any> = ({ text = 'BUTTON'}) => {
  const {connect} = useNode()
  const refFn = useCallback(function (el) {
    connect(el)
  }, [connect])
  return (
    <button className="el-button" ref={refFn}>
      { text }
    </button>
  )
}

export const ButtonProvider = () => {
  const { create } = useDesigner()
  return (
    <button className="el-button" ref={(ref) => {
      create(ref, <Button text="Click me" />)
    }}>
      Button
    </button>
  )
}