import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useStore } from "react-redux";
import { store } from '../store/index';
import { useNodeHelper } from './useNodeHelper';

/**
 * (state) => state.nodes
 */
export function useCollector(collector) {
  const { subscribe, getState } = useStore()
  const nodeHelper = useNodeHelper()

  const initial = useRef(true);
  const collected = useRef<any>(null);
  const collectorRef = useRef(collector);

  const onCollect = useCallback(
    (collected): any => {
      return { ...collected, nodeHelper };
    },
    [nodeHelper]
  );

  // Collect states for initial render
  if (initial.current && collector) {
    collected.current = collectorRef.current(getState(), nodeHelper);
    initial.current = false;
  }

  const [renderCollected, setRenderCollected] = useState(
    onCollect(collected.current)
  );

  useEffect(() => {
    let unsubscribe;
    if (collectorRef.current) {
      unsubscribe = subscribe(
        () => {
          collected.current = collectorRef.current(getState(), nodeHelper)
          setRenderCollected(onCollect(collected.current))
        }
      );
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [getState, nodeHelper, onCollect, subscribe]);

  return renderCollected;
}
