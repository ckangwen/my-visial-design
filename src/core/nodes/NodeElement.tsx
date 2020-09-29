import React, { useContext, useMemo } from 'react'
import { NodeIdType, NodeDescriptor } from '@/types';
import { NodeProvider, NodeContext } from './NodeContext';
import { useSelector } from 'react-redux';

export type NodeElement = {
  id: NodeIdType
};


export const NodeElement: React.FC<NodeElement> = React.memo(({ id }) => {
  return (
    <NodeProvider id={id}>
      <RenderNodeDescriptor id={id} />
    </NodeProvider>
  );
});


export const RenderNodeDescriptor: React.FC<any> = () => {
  const nodes = (useSelector<any>(state => state.nodes) as any).nodes
  const { id } = useContext(NodeContext)

  return useMemo(() => {
    const targetNode: NodeDescriptor = nodes[id]
    const { data: { type, props, nodes: nodeIds, text } } = targetNode
    const render = type ? React.createElement(
      type,
      props || {},
      <React.Fragment>
        {
          (nodeIds && nodeIds.length > 0) ? nodeIds.map((id) => (<NodeElement key={id} id={id} />)) : props && props.children
        }
      </React.Fragment>
    ) : (<React.Fragment>{text}</React.Fragment>)

    return render
  }, [nodes, id])
}