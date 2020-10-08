import React from 'react'
import { Button as AButton } from 'antd'
import { useCreateRef } from './hooks/useNodeRef';
import { Button } from './components/others';

export const ButtonCreator = () => {
  const refFn = useCreateRef(<Button type="primary">Primary Button</Button>)
  return (
    <div>
      <p>Button</p>
      <AButton ref={refFn}>Primary Button</AButton>
    </div>
  )
}
