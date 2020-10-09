import { useCallback } from 'react';
import { useCreateConnector } from './useCreateConnector';

export function useDesigner() {
  const connector = useCreateConnector()
  return {
    create: useCallback((el, reactEl) => {
      if (el && reactEl) {
        connector.connect(el, reactEl);
      }
    }, [connector])
  }
}
