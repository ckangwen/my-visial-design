import React from 'react'
import { Card } from 'antd'
import { useNodeRef } from '../hooks/useNodeRef';

export const CCard = () => {
  const refFn = useNodeRef()
  return (
    <Wrapper ref={refFn}>
      <Card  title="Default size card" extra={<a href="#">More</a>} style={{ width: 300, display: 'inline-block' }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </Wrapper>
  )
}

class Wrapper extends React.Component {
  render() {
    const { children } = this.props
    return (
      <React.Fragment>
        { children }
      </React.Fragment>
    )
  }
}