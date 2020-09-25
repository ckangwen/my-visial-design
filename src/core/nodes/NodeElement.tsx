import React from 'react'
import { NodeIdType } from '@/types';
import { NodeProvider } from './NodeContext';
import { RenderNodeDescriptor } from '../render/RenderNodeDescriptor';

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
