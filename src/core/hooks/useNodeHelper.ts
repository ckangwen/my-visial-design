import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NodeHelper } from '../nodes/NodeHelper';

const helper = new NodeHelper()

export const useNodeHelper = () => {
  const { nodes } = useSelector<any>(state => state.nodes) as any
  const nodeHelper = useMemo(() => {
    // TODO??如果NodeHelper在hook中实例化，则可能会出现bug，例如nodeHelper中的nodes不与全局状态中的nodes一致
    helper.receiveNodes(nodes)
    return helper
  }, [nodes])
  return nodeHelper
}
