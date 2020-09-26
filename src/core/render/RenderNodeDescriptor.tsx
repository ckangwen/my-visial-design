import { type } from 'os'
import React, { useMemo } from 'react'
import { NodeIdType } from '@/types';
import { useSelector } from 'react-redux';
import { NodeDescriptor } from '../../types/node';
import { NodeElement } from '../nodes/NodeElement';

const defaultOnRender = ({ render }) => render

const Render = () => {
}

export type RenderNodeDescriptorType = {
  id: NodeIdType
}

export const RenderNodeDescriptor: React.FC<RenderNodeDescriptorType> = ({ id }) => {
  const onRender = defaultOnRender
  const nodesState = useSelector<any>(state => state.nodes) as any

  const targetNode: NodeDescriptor = nodesState.nodes[id]
  const { data: { type, props, nodes, text } } = targetNode
  return useMemo(() => {
    const render = type ? React.createElement(
      type,
      props || {},
      <React.Fragment>
        {
          nodes ? nodes.map((id) => (<NodeElement key={id} id={id} />)) : props && props.children
        }
      </React.Fragment>
    ) : (<React.Fragment>{text}</React.Fragment>)

    return render
  }, [nodes, props, text, type])
  // return React.createElement(onRender, { render: <Render /> });
}