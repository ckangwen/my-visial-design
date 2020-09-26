import React, { useContext, useMemo } from 'react'
import { NodeIdType } from '@/types';
import { useSelector } from 'react-redux';
import { NodeDescriptor } from '../../types/node';
import { NodeElement } from '../nodes/NodeElement';
import { NodeContext } from '../nodes/NodeContext';

export const RenderNodeDescriptor: React.FC<any> = () => {
  const nodesState = useSelector<any>(state => state.nodes) as any
  const { id } = useContext(NodeContext)

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
}