import { NodeIdType, Indicator } from '@/types';
import { NodeHelper } from '../nodes/NodeHelper';
import { updateIndicator } from '../store/actions/events';
import { setNodeDOM, updateNodeProperty } from '../store/actions/nodes';
import {
  swip
} from '@/shared';

function getGlobalContext() {
  return typeof global !== 'undefined' ? global : (window as any)
}
const IdToDOM: Map<NodeIdType, Element> = new Map()
const DomToId: Map<Element, NodeIdType> = new Map()

export class Connector {
  id: string
  targetId?: NodeIdType
  dragSourceShadow: any
  el: Element
  helper: NodeHelper;
  dispatch: any;
  indicator: Indicator

  constructor({ id, helper }: { id?: NodeIdType, helper?: any } = {}) {
    this.helper = helper

    this.addListeners(getGlobalContext().window)
  }

  connect = (el: Element, id) => {
    el.setAttribute('draggable', 'true')
    if (!DomToId.get(id)) {
      DomToId.set(el, id)
    }
    if (!IdToDOM.get(id)) {
      IdToDOM.set(id, el)
      this.dispatch(setNodeDOM(id, el))
    }
    this.id = id

    const handleDragStart = (e) => {
      this.id = id
    }
    el.addEventListener('dragstart', handleDragStart)
    el.addEventListener('drop', this.handleDrop)
  }

  receiveId(id: NodeIdType) {
    this.id = id
  }
  receiveHelper(helper: any) {
    this.helper = helper
  }
  receiveDispatch(dispatch: any) {
    this.dispatch = dispatch
  }

  addListeners = (target: Node) => {
    if (!target.addEventListener) return

    // 拖拽子元素，则捕获先执行；拖拽本元素，则冒泡先执行
    target.addEventListener('dragstart', this.handleDragStart)
    target.addEventListener('dragenter', this.handleDragEnter)
    target.addEventListener('dragover', this.handleDragOver)

  }

  handleDragStart = (e: any) => {
    // 更新events.dragged为当前id
    if (e.defaultPrevented) {
      return
    }
    this.el = e.target
  }
  handleDragEnter = (e: any) => {
    const dom = e.target
    const targetId = DomToId.get(dom)
    if (!targetId) return
    const sourceId = DomToId.get(this.el)
    const { clientX: x, clientY: y } = e
    const indicator = this.helper.getDropPlaceholder(
      sourceId,
      targetId,
      { x, y }
    )
    this.indicator = indicator

    this.dispatch(updateIndicator(indicator))
  }
  handleDragOver(e: Event) {
    e.preventDefault();
  }
  handleDragEnd = (e: any) => {
    // const targetNode = state.nodes[targetId],
    // currentParentId = targetNode.data.parent!,
    // newParent = state.nodes[newParentId],
    // newParentNodes = newParent.data.nodes;
    // move(
    //   draggedElement as NodeId,
    //   placement.parent.id,
    //   placement.index + (placement.where === 'after' ? 1 : 0)
    // );
  }
  handleDrop = (e: Event) => {
    const { el, indicator } = this
    const { parent, where, dragNode } = indicator.placement
    let index = indicator.placement.index + (where === 'after' ? 1 : 0)

    // 拖动元素Id
    const sourceId = DomToId.get(el)

    // 父元素的所有子节点的id列表
    let parentChildrenNodeIds = parent.data.nodes.slice()
    let sourceChildrenNodeIds = dragNode.data.nodes.slice()
    /**
     * 如果是跨层级的更新
     * 1. 更新parent.data.nodes，将sourceId插入其中
     * 2. 修改dragNode的parent为parent的id
     * 3. 从dragNode的parent的nodes中移除dragNode的id
     * 4. 更新sourceNode的parent
     * 5. 将el从原来的位置移除，插入到parent的index下标处
     */

    const isSameLayer = parent.id === dragNode.data.parent
    if (isSameLayer) {
      index = Math.min(index, parent.data.nodes.length - 1)
      parentChildrenNodeIds = swip(parentChildrenNodeIds, parentChildrenNodeIds.indexOf(sourceId), index)
      this.dispatch(updateNodeProperty(parent.id, 'data.nodes', parentChildrenNodeIds))
    } else {
      parentChildrenNodeIds.splice(index, 0, sourceId)
      sourceChildrenNodeIds.splice(sourceChildrenNodeIds.indexOf(sourceId), 1)
      this.dispatch(updateNodeProperty(dragNode.data.parent, 'data.nodes', sourceChildrenNodeIds))
      this.dispatch(updateNodeProperty(dragNode.id, 'data.parent', parent.id))
      this.dispatch(updateNodeProperty(parent.id, 'data.nodes', parentChildrenNodeIds))
    }


    this.el = null
    this.indicator = null
    this.dispatch(updateIndicator(null))
  }
  handleHover() {
    // 更新events.hovered
  }
}
