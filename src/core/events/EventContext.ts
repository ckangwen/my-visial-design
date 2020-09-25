import { createContext, useContext } from 'react';

export const EventHandlerContext = createContext<any>(null)

export const useEventHandler = () => useContext(EventHandlerContext)
