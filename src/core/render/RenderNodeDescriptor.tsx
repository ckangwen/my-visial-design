import React, { useContext, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { NodeDescriptor } from '../../types/node';
import { NodeElement } from '../nodes/NodeElement';
import { NodeContext } from '../nodes/NodeContext';

export const RenderNodeDescriptor: React.FC<any> = () => {
  const appNodes = (useSelector<any>(state => state.nodes) as any).nodes
  const { id } = useContext(NodeContext)

  return useMemo(() => {
    const targetNode: NodeDescriptor = appNodes[id]
    const { data: { type, props, nodes, text } } = targetNode
    console.log(targetNode.data.displayName, id, nodes);
    const render = type ? React.createElement(
      type,
      props || {},
      <React.Fragment>
        {
          (nodes && nodes.length > 0) ? nodes.map((id) => (<NodeElement key={id} id={id} />)) : props && props.children
        }
      </React.Fragment>
    ) : (<React.Fragment>{text}</React.Fragment>)

    return render
  }, [appNodes, id])
}