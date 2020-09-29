import React, {  useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { ROOT_ID } from '../../shared/constants';
import { addNodesB } from '../store/actions/nodes';
import { NodeElement } from '../nodes/NodeElement';
import { useNodeHelper } from '../hooks/useNodeHelper';

export const Frame: React.FC<any> = ({ children }) => {
  const dispatch = useDispatch()
  const nodeHelper = useNodeHelper()
  const inited = useRef<boolean>(false)
  // 在inited更新之后，Frame会重新执行
  // 为了防止两次重复执行useEffect中的计算，用root作为标志位判断是否已经执行过一次

  useEffect(() => {

    if (children) {
      const rootNode = React.Children.only(
        children
      ) as React.ReactElement;

      const nodeTree = nodeHelper.parseReactNode(rootNode, (node, jsx) => {
        if (jsx === rootNode) {
          node.id = ROOT_ID;
        }
        return node;
      })
      dispatch(addNodesB(nodeTree.nodes))
      inited.current = true
    }

  }, [children, dispatch, nodeHelper])

  return inited.current && <NodeElement id={ROOT_ID} />
}
