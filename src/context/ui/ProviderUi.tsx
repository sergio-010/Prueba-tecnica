'use client'

import { useState } from "react";
import { ContextUI, IContextUI } from "./ContextUI";

const initialState: IContextUI = {
    toggleSidebar: true,
    handleToggleSidebar: () => { }
}

export default function UIProvider({ children }: { children: React.ReactNode }) {
    const [uiState, setUiState] = useState(initialState)

    const handleToggleSidebar = () => {
        setUiState({
            ...uiState,
            toggleSidebar: !uiState.toggleSidebar
        })
    }
    return (
        <ContextUI.Provider
            value={{
                toggleSidebar: uiState.toggleSidebar,
                handleToggleSidebar,
            }}
        >
            {children}
        </ContextUI.Provider>
    )
}
