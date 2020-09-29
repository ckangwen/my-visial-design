import React from 'react'
import { useSelector } from 'react-redux';
import { NodeDescriptorMapping, AppState, NodeIdType, NodeState } from '@/types';
import { ROOT_ID } from '@/shared';

// export const Renderer: React.FC<any> = ({ children }) => {
//   const { nodes } = useSelector<any>(state => state.nodes) as NodeDescriptorMapping
//   const ids = Object.keys(nodes)
//   const rootNode = nodes[ROOT_ID]


// }

export type RenderWithNodeDescriptorType = {
  id: NodeIdType,
}

export const RenderWithNodeDescriptor: React.FC<RenderWithNodeDescriptorType> = ({ id }) => {
  const  appNodes = useSelector<AppState, NodeState>(state => state.nodes).nodes
  if (!id) return null

  const nodeDescriptor = appNodes[id]
  const { data: { type, props, nodes: elNodes, text } } = nodeDescriptor

  const element = type ? React.createElement(
    type,
    props || {},
    <React.Fragment>
      {
        (elNodes && elNodes.length > 0) ? elNodes.map((id) => ( id && <RenderWithNodeDescriptor key={id} id={id}  />)) : props && props.children
      }
    </React.Fragment>
  ) : (<React.Fragment>{text}</React.Fragment>)

  return element
}
