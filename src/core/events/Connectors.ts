import { NodeIdType } from '@/types';
import { NodeHelper } from '../nodes/NodeHelper';

let inited = false

function getGlobalContext() {
	return typeof global !== 'undefined' ? global : (window as any)
}
export class Connector {
  id: string
  IdToDOM: Map<NodeIdType, Element> = new Map()
  DomToId: Map<Element, NodeIdType> = new Map()
  targetId?: NodeIdType
  dragSourceShadow: any
  el: Element
  helper: NodeHelper;

  constructor({ id, helper }: { id?: NodeIdType, helper?: any} = {}) {
    this.id = id
    this.helper = helper

    if (!inited) {
      this.addListeners(getGlobalContext().window)
      inited = true
    }
  }

  connect = (el: Element, id) => {
    el.setAttribute('draggable', 'true')
    this.IdToDOM.set(id, el)
    this.DomToId.set(el, id)
    const handleDragStart = (e) => {
      this.id = id
    }
    el.addEventListener('dragstart', handleDragStart)
  }

  receiveId(id: NodeIdType) {
    this.id = id
  }
  receiveHelper(helper: any) {
    this.helper = helper
  }

  addListeners = (target: Node) => {
    if (!target.addEventListener) return

    // 拖拽子元素，则捕获先执行；拖拽本元素，则冒泡先执行
    target.addEventListener('dragstart', this.handleDragStart)
    target.addEventListener('dragend', this.handleDragEnd)
    target.addEventListener('dragenter', this.handleDragEnter)
    target.addEventListener('dragover', this.handleDragOver)
    target.addEventListener('drop', this.handleDrop)

  }

  handleDragStart = (e: any) => {
    // 更新events.dragged为当前id
    if (e.defaultPrevented) {
      return
    }
    this.el = e.target
  }
  handleDragEnd = (e: any) => {
    this.el = null
  }
  handleDragEnter = (e: any) => {
    const dom = e.target
    const targetId = this.DomToId.get(dom)
    console.log(targetId);
    if (!targetId) return
    const sourceId = this.id
    const { clientX: x, clientY: y } = e;
    this.helper.getDropPlaceholder(
      sourceId,
      targetId,
      { x, y }
    )

  }
  handleDragOver() {}
  handleDrop() {}
  handleHover() {
    // 更新events.hovered
  }
}

// export function useConnector() {
//   const nodeHelper = useNodeHelper()
//   const { nodes } = useSelector<any>(state => state.nodes) as any
//   const connector = useMemo(() =>  {
//     nodeHelper.receiveNodes(nodes)
//     const connector = new Connector({ helper: nodeHelper })
//     return connector
//   } , [nodeHelper, nodes])
//   return connector
// }
