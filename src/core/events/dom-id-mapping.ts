import { NodeIdType } from '@/types'
import { ROOT_ELEMENT_ID } from '@/shared'

export const IdToDOM: Map<NodeIdType, Element> = new Map()
export const DomToId: Map<Element, NodeIdType> = new Map()

export const getTargetId = (dom: Element) => {
  while( dom && !dom.getAttribute('draggable') && dom.id !== ROOT_ELEMENT_ID) {
    dom = dom.parentElement
  }
  if (!dom) return
  let id = DomToId.get(dom)
  if (!id) {
    return getTargetId(dom.parentElement)
  }
  return id
}