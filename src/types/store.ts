import { NodeState, EventState } from './state';
export interface Action<Payload> {
	type: string
	payload: Payload
}

export type AppState = {
	nodes: NodeState
	events: EventState
}
