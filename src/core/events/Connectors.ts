import { NodeIdType, Indicator } from '@/types';
import { NodeHelper } from '../nodes/NodeHelper';
import { updateIndicator, updateEvent } from '../store/actions/events';
import { setNodeDOM, updateNodeProperty } from '../store/actions/nodes';
import { IdToDOM, DomToId, getTargetId } from './dom-id-mapping';
import {
  ROOT_ELEMENT_ID,
  swip
} from '@/shared'

function getGlobalContext() {
  return typeof global !== 'undefined' ? global : (window as any)
}

export class Connector {
  id: string
  dropId: string | null = null
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

    const handleDragStart = (e: Event) => {
    // e.stopPropagation()
      this.id = id
      const el = e.target as Element
      this.el = el
      if (id === DomToId.get(el)) {
        this.dispatch(updateEvent('dragged', id))
      }
    }
    el.addEventListener('click', this.handleClick)
    el.addEventListener('dragstart', handleDragStart, false)
    document.getElementById(ROOT_ELEMENT_ID).addEventListener('drop', this.handleDrop)
    document.getElementById(ROOT_ELEMENT_ID).addEventListener('dragenter', this.handleDragEnter)
    el.addEventListener('mouseover', this.handleMouseover)
    el.addEventListener('mouseout', this.handleMouseout)
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

    target.addEventListener('dragover', this.handleDragOver)

  }

  handleClick = (e: Event) => {
    e.stopPropagation()
    this.dispatch(updateEvent('selected', this.id))
  }
  handleDragEnter = (e: any) => {
    e.stopPropagation()
    e.preventDefault();
    if (this.isSameDndEvent()) {
      const dom = e.target
      const targetId = getTargetId(dom)
      this.dropId = targetId
      if (!targetId) return

      const sourceId = this.id // sourceId可能为空，比如在Toolbox向Frame进行拖拽的时候
      const { clientX: x, clientY: y } = e
      const indicator = this.helper.getDropPlaceholder(
        sourceId,
        targetId,
        { x, y }
      )
      this.indicator = indicator

      this.dispatch(updateIndicator(indicator))
    }

  }
  handleDragOver(e: Event) {
    // dragenter和dragover事件的默认行为是拒绝接受任何被拖放的元素。因此，我们需要阻止浏览器这种默认行为
    e.preventDefault();
  }
  handleDrop = (e: Event) => {
    if (!this.isSameDndEvent()) return
    const { el, indicator } = this
    if (!indicator) return
    const { parent, where, dragNode } = indicator.placement
    if (!dragNode) { // 不是在Frame中进行的拖拽
      this.el = null
      this.indicator = null
      return
    }
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
  handleMouseover = (e: Event) => {
    e.stopPropagation()
    // this.dispatch(updateEvent('hovered', this.id))
  }
  handleMouseout = (e: Event) => {
    e.preventDefault()
    // this.dispatch(updateEvent('hovered', null))
  }

  private isSameDndEvent() {
    return this.id === DomToId.get(this.el)
  }
}
