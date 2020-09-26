import { PlainObject } from './helper';

export interface INodeProvider {
  id: NodeIdType
  related?: boolean
}

export type NodeDescriptor = {
  id: NodeIdType
  data: NodeDataType
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
  selected: boolean
  dragged: boolean
  hovered: boolean
}

export type NodeIdType = string

export type NodeRulesType = {
  canDrag: Function
  canDrop: Function
  canMoveIn: Function
  canMoveOut: Function
}

export type NodeRelatedType = any