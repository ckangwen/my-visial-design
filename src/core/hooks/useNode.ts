import { useContext } from 'react';
import { NodeContext } from '../nodes/NodeContext';
import { Connector } from '../events/Connectors';
import { useNodeHelper } from '../nodes/useNodeHelper';
import { useSelector, useDispatch } from 'react-redux';
import { setNodeDOM } from '../store/actions/nodes';

const connector = new Connector()

// TODO useNode会被调用两次
export function useNode() {
  const { id } = useContext(NodeContext)
  const { nodes } = useSelector<any>(state => state.nodes) as any
  const nodeHandler = useNodeHelper()
  const dispatch = useDispatch()


  nodeHandler.receiveNodes(nodes)
  connector.receiveHelper(nodeHandler)
  return {
    connect: (el) => {
      if (el) {
        dispatch(setNodeDOM(id, el))
        connector.connect(el, id)
      }
    }
  }
}
