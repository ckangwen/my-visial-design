import { NodeIdType, Indicator } from '@/types';
import { NodeHelper } from '../nodes/NodeHelper';
import { addNewNode } from '../store/actions/nodes';
import { updateIndicator } from '../store/actions/events';

export class CreateConnector {
  helper: NodeHelper
  dispatch: any;
  block: any
  indicator: Indicator

  constructor({ id, helper }: { id?: NodeIdType, helper?: any } = {}) {
    this.helper = helper || new NodeHelper()
  }

  connect = (el: Element, block) => {
    this.block = block
    el.setAttribute('draggable', 'true')

    el.addEventListener('dragstart', this.handleDragStart)
    el.addEventListener('dragend', this.handleDragEnd)
  }

  receiveHelper(helper: any) {
    this.helper = helper
  }
  receiveDispatch(dispatch: any) {
    this.dispatch = dispatch
  }
  reveiveState(state) {
    this.indicator = state.indicator
  }

  handleDragStart = (e: any) => {
    console.log('dragstart');
  }
  handleDragEnd = (e: any) => {
    if (!this.indicator) return
    const nodeTree = this.helper.parseReactNode(this.block)
    const nodeDescriptor = nodeTree.nodes[nodeTree.rootNodeId]
    const { placement: { parent, index } } = this.indicator
    console.log(this.indicator);
    const parentId = parent.id
    this.dispatch(addNewNode(nodeDescriptor, parentId, index))
    this.dispatch(updateIndicator(null))
  }
}
