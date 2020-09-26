import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NodeHelper } from './NodeHelper';
export const useNodeHelper = () => {
  const { nodes } = useSelector<any>(state => state.nodes) as any
  const nodeHelper = useMemo(() => {
    const helper = new NodeHelper()
    helper.receiveNodes(nodes)
    return helper
  }, [nodes])
  return nodeHelper
}
