import { NodeIdType, NodeDescriptor } from './node';
import { PlainObject } from './helper';

export type UpdateNodePayload = {
  id: NodeIdType
  node: NodeDescriptor
}

export type SetNodesPayload = {
  id: NodeIdType
  nodes: NodeIdType[]
}

export type UpdateNodePropertyPayload = {
  id: NodeIdType
  key: string
  value: any
}

export type AddNodePayload = UpdateNodePayload

export type AddMulitNodesPayload = {
  nodes: PlainObject<NodeDescriptor>
}

export type DeleteNodePayload = {
  id: NodeIdType
}

export type SetNodeDomPayload = {
  id: NodeIdType
  el: Element
}

export type UpdateEventPayload = {
  key: string
  value: null | undefined | false | string
}
