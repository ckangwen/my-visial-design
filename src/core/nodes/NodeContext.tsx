import React from 'react'
import { INodeProvider } from '@/types'

export const NodeContext = React.createContext<any>(null);

export const NodeProvider: React.FC<INodeProvider> = ({
  id,
  related = false,
  children
}) => {
  return (
    <NodeContext.Provider value={{ id }}>
      {children}
    </NodeContext.Provider>
  );
}