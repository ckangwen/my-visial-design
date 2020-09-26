import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ROOT_ID } from '../../shared/constants';
import { addNodesB } from '../store/actions/nodes';
import { NodeElement } from '../nodes/NodeElement';
import { useNodeHelper } from '../nodes/useNodeHelper';

type FrameProps = {
  data?: any
}


export const Frame: React.FC<FrameProps> = ({ children, data }) => {
  const dispatch = useDispatch()
  const nodeHelper = useNodeHelper()
  const [inited, setInited] = useState<any>(false);
  const initialState = useRef({
    initialChildren: children,
    initialData: data,
  })
  // 在inited更新之后，Frame会重新执行
  // 为了防止两次重复执行useEffect中的计算，用root作为标志位判断是否已经执行过一次
  const root = useRef(null)

  useEffect(() => {
    const { initialChildren } = initialState.current

    if (initialChildren && !root.current) {
      const rootNode = React.Children.only(
        initialChildren
      ) as React.ReactElement;
      root.current = root

      const nodeTree = nodeHelper.parseReactNode(rootNode, (node, jsx) => {
        if (jsx === rootNode) {
          node.id = ROOT_ID;
        }
        return node;
      })
      dispatch(addNodesB(nodeTree.nodes))

      setInited(true)
    }

  }, [dispatch, nodeHelper])
  return inited && <NodeElement id={ROOT_ID} />
}
