import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { CreateConnector } from '../events/CreateConnector';
import { useNodeHelper } from './useNodeHelper';

export function useCreateConnector() {
  const dispatch = useDispatch()
  const nodeHelper = useNodeHelper()
  const connector = useMemo(() =>  {
    const connector = new CreateConnector()
    connector.receiveHelper(nodeHelper)
    connector.receiveDispatch(dispatch)
    return connector
  } , [dispatch, nodeHelper])
  return connector
}
