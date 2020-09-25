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
