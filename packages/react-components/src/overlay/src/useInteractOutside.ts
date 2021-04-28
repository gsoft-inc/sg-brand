import { MouseEvent, RefObject } from "react";
import { isNil, useDocumentListener, useEventCallback } from "../../shared";

export interface UseInteractOutsideOptions {
    isDisabled?: boolean;
    onInteractOutside?: (e: MouseEvent) => void;
}

export function useInteractOutside(rootRef: RefObject<HTMLElement>, { isDisabled, onInteractOutside }: UseInteractOutsideOptions = {}) {
    const handleDocumentClick = useEventCallback(event => {
        if (!rootRef.current?.contains(event.target as Node)) {
            if (!isNil(onInteractOutside)) {
                onInteractOutside(event);
            }
        }
    });

    // If "capture" is removed, test the popover component to make sure it still works.
    // https://reactjs.org/blog/2020/08/10/react-v17-rc.html#fixing-potential-issues
    useDocumentListener("click", handleDocumentClick, !isDisabled, { capture: true });
}
