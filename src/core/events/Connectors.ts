import { NodeIdType, Indicator } from '@/types';
import { NodeHelper } from '../nodes/NodeHelper';
import { updateIndicator } from '../store/actions/events';
import { updateNodeProperty, setNodes } from '../store/actions/nodes';

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

  constructor({ id, helper }: { id?: NodeIdType, helper?: any} = {}) {
    this.helper = helper

    this.addListeners(getGlobalContext().window)
  }

  connect = (el: Element, id) => {
    el.setAttribute('draggable', 'true')
    IdToDOM.set(id, el)
    DomToId.set(el, id)
    this.id = id

    const handleDragStart = (e) => {
      console.log('id', id);
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
    // target.addEventListener('drop', this.handleDrop)

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
    const sourceId = this.id ? this.id : DomToId.get(this.el)
    console.log(sourceId);
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
    e.stopPropagation()
    const { el, indicator } = this
    const { parent, where, dragNode } = indicator.placement
    const index = indicator.placement.index + (where === 'after' ? 1 : 0)
    const targetEl = e.target as Element

    // 放置元素的Id
    const targetId = DomToId.get(targetEl)
    // 拖动元素Id
    const sourceId = DomToId.get(el)

    // 父元素的所有子节点的id列表
    let parentChildrenNodeIds = parent.data.nodes.slice()
    let sourceChildrenNodeIds = dragNode.data.nodes.slice()
    /**
     * 1. 更新parent.data.nodes，将sourceId插入其中
     * 2. 从Source的parent的nodes中移除source
     * 3. 更新sourceNode的parent
     * 4. 将el从原来的位置移除，插入到parent的index下标处
     */

     parentChildrenNodeIds.splice(index, 0, sourceId)
     sourceChildrenNodeIds.splice( sourceChildrenNodeIds.indexOf(sourceId), 1 )
    //  this.dispatch(setNodes(parent.id, parentChildrenNodeIds))
    //  this.dispatch(setNodes(dragNode.data.parent, sourceChildrenNodeIds))

    //  if (where === 'after') {
    //    parent.dom.insertBefore(el, targetEl)
    //  }

    // 删除真实DOM
    // el.parentNode.removeChild(el)
    this.el = null
    this.indicator = null
    this.dispatch(updateIndicator(null))
  }
  handleHover() {
    // 更新events.hovered
  }
}
