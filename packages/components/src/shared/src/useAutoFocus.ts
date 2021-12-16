import { FocusManager, FocusManagerMethodOptions } from "./useFocusManager";
import { RefObject, useLayoutEffect } from "react";

import { FocusTarget } from "./focusTarget";
import { createDisposables } from "./useDisposables";
import { useChainedEventCallback } from "./useChainedEventCallback";
import { useEventCallback } from "./useEventCallback";

export interface AbstractAutoFocusOptions {
    delay?: number;
    isDisabled?: boolean;
    onFocus?: (element?: HTMLElement) => void;
}

function useAbstractAutoFocus({ delay, isDisabled, onFocus }: AbstractAutoFocusOptions) {
    useLayoutEffect(() => {
        const disposables = createDisposables();

        if (!isDisabled) {
            if (delay) {
                disposables.setTimeout(() => { onFocus(); }, delay);
            } else {
                disposables.nextFrame(() => { onFocus(); });
            }
        }

        return () => {
            disposables.dispose();
        };
    }, [isDisabled, delay, onFocus]);
}

export interface AutoFocusOptions {
    delay?: number;
    isDisabled?: boolean;
    onFocus?: (element?: HTMLElement) => void;
}

export function useAutoFocus(targetRef: RefObject<HTMLElement>, { delay, isDisabled, onFocus }: AutoFocusOptions = {}) {
    useAbstractAutoFocus({
        delay,
        isDisabled,
        onFocus: useChainedEventCallback(onFocus, () => {
            if (!targetRef.current?.hasAttribute("disabled") && !targetRef.current?.contains(document.activeElement)) {
                targetRef.current?.focus();
            }
        })
    });
}

export interface AutoFocusChildOptions extends FocusManagerMethodOptions {
    delay?: number;
    isDisabled?: boolean;
    target?: string;
}

export function useAutoFocusChild(focusManager: FocusManager, { target = FocusTarget.first, isDisabled, delay, canFocus, onFocus, onNotFound, ...otherOptions }: AutoFocusChildOptions = {}) {
    useAbstractAutoFocus({
        delay,
        isDisabled: isDisabled,
        onFocus: useEventCallback(() => {
            // Do not autofocus another child if there is already one focused.
            if (!focusManager.isInScope(document.activeElement as HTMLElement)) {
                focusManager.focusTarget(target, { canFocus, onFocus, onNotFound, ...otherOptions });
            }
        })
    });
}


