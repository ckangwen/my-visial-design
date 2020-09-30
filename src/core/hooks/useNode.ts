import { useCallback, useContext } from 'react';
import { NodeContext } from '../nodes/NodeContext';
import { useConnector } from '../hooks/useConnector';

// TODO useNode会被调用两次
export function useNode() {
  const { id } = useContext(NodeContext)
  const connector = useConnector()

  return {
    connect: useCallback((el) => {
      if (el) {
        connector.connect(el, id)
      }
    }, [connector, id]),
  }
}
