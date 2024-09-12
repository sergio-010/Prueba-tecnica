'use client'

import { createContext } from "react";

export interface IContextUI {
    toggleSidebar: boolean
    handleToggleSidebar: () => void
}

export const ContextUI = createContext<IContextUI>({} as IContextUI)