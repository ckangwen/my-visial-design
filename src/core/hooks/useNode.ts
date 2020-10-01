import { useCallback, useContext, useRef } from 'react';
import { NodeContext } from '../nodes/NodeContext';
import { useConnector } from '../hooks/useConnector';
import { useSelector } from 'react-redux';
import { useCollector } from './useCollector';

function noop() {}

// TODO useNode会被调用两次
export function useNode(collector?: Function) {
  const { id } = useContext(NodeContext)
  const connector = useConnector()

  const collected = useRef<any>(null);
  collected.current = useCollector((state) => {
    if (collector) {
      return collector.call(collector, state.nodes.nodes[id])
    }
  })
  const { nodeHelper, ...others } = collected.current
  nodeHelper.receiveId(id)

  return {
    connect: useCallback((el) => {
      if (el) {
        connector.connect(el, id)
      }
    }, [connector, id]),
    nodeHelper,
    ...others
  }
}
