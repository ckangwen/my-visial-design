import { NodeEventType, NodeDescriptorMapping } from './node';
import { Indicator } from './events';

export type EventState = NodeEventType & {
  indicator: Indicator
}

export type NodeState = {
  nodes: NodeDescriptorMapping
}
