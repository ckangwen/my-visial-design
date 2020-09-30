import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { CreateConnector } from '../events/CreateConnector';

export function useCreateConnector() {
  const dispatch = useDispatch()
  const connector = useMemo(() =>  {
    const connector = new CreateConnector()
    connector.receiveDispatch(dispatch)
    return connector
  } , [dispatch])
  return connector
}
