import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useCreateConnector } from './useCreateConnector';

export function useDesigner() {
  const connector = useCreateConnector()
  const events = useSelector<any>(state => state.events)
  return {
    create: useCallback((el, reactEl) => {
      if (el && reactEl) {
        connector.reveiveState(events)
        connector.connect(el, reactEl);
      }
    }, [connector, events])
  }
}
