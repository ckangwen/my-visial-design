import { createContext, useContext } from "react";

export const EditorContext = createContext<any>({} as any);

export const useEventHandler = () => useContext(EditorContext)
