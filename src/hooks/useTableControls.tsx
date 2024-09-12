import { PencilRuler, Trash2 } from "lucide-react";
import React from "react";

interface TableControl<T> {
    icon: 'edit' | 'delete' | 'view';
    onClickEvent: (item: T) => void;
}

export function useTableControls<T>(controls: TableControl<T>[] | undefined) {
    const renderControls = (item: T) => {
        return controls?.map((control, index) => (
            <React.Fragment key={index}>
                {control.icon === 'edit' && (
                    <PencilRuler className="cursor-pointer" onClick={() => control.onClickEvent(item)} />
                )}
                {control.icon === 'delete' && (
                    <Trash2 className="cursor-pointer" onClick={() => control.onClickEvent(item)} />
                )}
            </React.Fragment>
        ));
    };

    return { renderControls };
}
