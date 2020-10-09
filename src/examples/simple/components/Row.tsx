import React from 'react'
import { Col as ACol, Row as ARow } from 'antd';
import { useNodeRef } from '../hooks/useNodeRef';
import { ComponentSetting } from './setting';

export const Col = ({ children, ...props }) => {
  const refFn = useNodeRef()

  return (<ACol ref={refFn} {...props}>{ children }</ACol>)
}

export const Row = ({ children, ...props }) => {
  const refFn = useNodeRef()

  return (<ARow ref={refFn} {...props}>{ children }</ARow>)
}

(Row as any).craft =
(Col as any).craft =
{
  related: {
    setting: ComponentSetting
  }
}
