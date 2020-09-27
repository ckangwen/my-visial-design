import { PlainObject } from './helper';

export interface INodeProvider {
  id: NodeIdType
  related?: boolean
}

export type NodeDescriptor = {
  id: NodeIdType
  data: NodeDataType
  dom?: Element
  events: NodeEventType
  rules: NodeRulesType
  related:  NodeRelatedType
  timestamp: string | number
}

export type NodeDescriptorMapping = {
  [key: string]: NodeDescriptor
}

export type NodeDataType = {
  type: any
  parent: string
  isCanvas: boolean
  hidden: boolean
  props: PlainObject<any>
  custom: PlainObject<any>
  displayName: string
  nodes:  string[]
  text?: string
  [key: string]: any
}

export type NodeEventType = {
  selected: string | null | boolean
  dragged: string | null | boolean
  hovered: string | null | boolean
}

export type NodeIdType = string

export type NodeRulesType = {
  canDrag: Function
  canDrop: Function
  canMoveIn: Function
  canMoveOut: Function
}

export type NodeRelatedType = any

export type NodeBoxInfo = {
  id?: NodeIdType
} & DOMInfo;

export type DOMInfo = Record<
  | 'x'
  | 'y'
  | 'top'
  | 'left'
  | 'bottom'
  | 'right'
  | 'width'
  | 'height'
  | 'outerWidth'
  | 'outerHeight',
  number
> & {
  inFlow: boolean;
  margin: Record<'top' | 'left' | 'bottom' | 'right', number>;
  padding: Record<'top' | 'left' | 'bottom' | 'right', number>;
};
