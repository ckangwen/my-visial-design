import { NodeIdType, NodeDescriptor } from './node';
import { PlainObject } from './helper';

export type UpdateNodePayload = {
  id: NodeIdType
  node: NodeDescriptor
}

export type AddNodePayload = UpdateNodePayload

export type AddMulitNodesPayload = {
  nodes: PlainObject<NodeDescriptor>
}

export type DeleteNodePayload = {
  id: NodeIdType
}

export type UpdateEventPayload = {
  key: string
  value: null | undefined | false | string
}
