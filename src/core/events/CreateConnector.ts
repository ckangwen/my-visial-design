import { NodeIdType, Indicator } from '@/types';
import { NodeHelper } from '../nodes/NodeHelper';
import { addNewNode, addMulitNodes } from '../store/actions/nodes';
import { updateIndicator } from '../store/actions/events';
import { ROOT_ELEMENT_ID } from '../../shared/constants';
import { getTargetId } from './dom-id-mapping';

export class CreateConnector {
  helper: NodeHelper
  dispatch: any;
  block: any
  indicator: Indicator

  constructor({ id, helper }: { id?: NodeIdType, helper?: any } = {}) {
    this.helper = helper || new NodeHelper()
  }

  connect = (el: Element, block) => {
    this.block = block
    el.setAttribute('draggable', 'true')

    el.addEventListener('dragstart', this.handleDragStart)
    document.getElementById(ROOT_ELEMENT_ID).addEventListener('dragend', this.handleDragEnd)
    document.getElementById(ROOT_ELEMENT_ID).addEventListener('dragenter', this.handleDragEnter)
  }

  receiveHelper(helper: any) {
    this.helper = helper
  }
  receiveDispatch(dispatch: any) {
    this.dispatch = dispatch
  }

  handleDragStart = (e: any) => {
  }
  handleDragEnter = (e: any) => {
    const dom = e.target as Element
    const targetId = getTargetId(dom)
    if (!targetId) return
    const sourceId = undefined
    const { clientX: x, clientY: y } = e
    const indicator = this.helper.getDropPlaceholder(
      sourceId,
      targetId,
      { x, y }
    )
    this.indicator = indicator
    this.dispatch(updateIndicator(indicator))
  }

  handleDragEnd = (e: Event) => {
    if (!this.indicator) return
    const nodeTree = this.helper.parseReactNode(this.block)
    const rootNodeId = nodeTree.rootNodeId
    let nodeDescriptor = nodeTree.nodes[rootNodeId]
    const { placement: { parent, index } } = this.indicator
    const parentId = parent.id
    const childNodes = omit(nodeTree.nodes, [rootNodeId])

    this.dispatch(addNewNode(nodeDescriptor, parentId, index))
    this.dispatch(addMulitNodes(childNodes))
    this.dispatch(updateIndicator(null))
  }
}

function omit(obj: any, keys: string[]) {
  const res = {} as any
  Object.keys(obj).forEach(key => {
    if (keys.indexOf(key) > -1) return
    res[key] = obj[key]
  })
  return res
}