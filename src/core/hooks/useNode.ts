import { useContext } from 'react';
import { NodeContext } from '../nodes/NodeContext';
import { useConnector } from '../hooks/useConnector';
import { useDispatch } from 'react-redux';
import { setNodeDOM } from '../store/actions/nodes';

// TODO useNode会被调用两次
export function useNode() {
  const { id } = useContext(NodeContext)
  const connector = useConnector()
  const dispatch = useDispatch()

  return {
    connect: (el) => {
      if (el) {
        dispatch(setNodeDOM(id, el))
        connector.connect(el, id)
      }
    }
  }
}
