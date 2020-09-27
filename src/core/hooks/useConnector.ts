import { useNodeHelper } from './useNodeHelper';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { Connector } from '../events/Connectors';

export function useConnector() {
  const nodeHelper = useNodeHelper()
  const dispatch = useDispatch()

  const connector = useMemo(() =>  {
    const connector = new Connector({ helper: nodeHelper })
    connector.receiveDispatch(dispatch)
    return connector
  } , [dispatch, nodeHelper])
  return connector
}
