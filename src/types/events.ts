import { NodeDescriptor } from './node';
export type CraftDOMEvent<T extends Event> = T & {
  craft: {
    stopPropagation: () => void;
    blockedEvents: Record<string, boolean>;
  };
};

export type CraftEventListener = [
  string,
  (e: CraftDOMEvent<Event>, opts: any) => void,
  boolean
];

export type Handler = {
  init: (el: HTMLElement, opts: any) => any;
  events: readonly CraftEventListener[];
}

export interface Indicator {
  placement: Placement;
  error: string | false;
}


export interface DropAction {
  parent: NodeDescriptor;
  index: number;
  where: string;
}

export type Placement = DropAction & {
  currentNode: NodeDescriptor | null
  dragNode: NodeDescriptor | null
};
