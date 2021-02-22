import { Keys, useEventCallback, useRefState } from "../../shared";
import { isNil } from "lodash";
import { useFocusWithin } from "./useFocusWithin";
import { useInteractOutside } from "./useInteractOutside";

export function useOverlayLightDismiss(overlayRef, {
    trigger,
    onHide,
    hideOnEscape,
    hideOnLeave,
    hideOnOutsideClick
}) {
    const [activeElementRef, setActiveElement] = useRefState();

    const hide = event => {
        if (!isNil(onHide)) {
            onHide(event);
        }
    };

    const handleKeyDown = event => {
        if (event.key === Keys.esc) {
            event.preventDefault();
            hide(event);
        }
    };

    const handleFocus = useEventCallback(() => {
        setActiveElement(document.activeElement);
    });

    const handleBlur = useEventCallback(event => {
        // This is a fix to prevent the popper from closing when the dev tools opens.
        // Opening the dev tools will cause a blur event since the popper lose the focus in favor of the dev tools.
        // Since this is the dev tools who receive the focused, no elements of the popper will be focused on the next tick which will cause the popper to close.
        // To prevent the popper from closing we leverage the fact that opening the dev tools doesn't update document.activeElement.
        if (activeElementRef.current !== document.activeElement) {
            hide(event);
        }
    });

    const handleMouseLeave = useEventCallback(event => {
        hide(event);
    });

    const handleInteractOutside = useEventCallback(event => {
        hide(event);
    });

    useInteractOutside(overlayRef, {
        onInteractOutside: handleInteractOutside,
        isDisabled: !hideOnOutsideClick
    });

    const focusWithinProps = useFocusWithin({
        onFocus: handleFocus,
        onBlur: handleBlur,
        isDisabled: !hideOnLeave
    });

    return {
        ...focusWithinProps,
        onMouseLeave: trigger === "hover" ? hideOnLeave ? handleMouseLeave : undefined : undefined,
        onKeyDown: hideOnEscape ? handleKeyDown : undefined
    };
}

// This code aims to solve a bug on Chrome and Edge where no blur event will happen when the focused element becomes disable and that element lose the focus.
// More info at: https://allyjs.io/tutorials/mutating-active-element.html
// **** if using, try switching setTimeout for requestAnimationFrame ideally with useDisposable
// const handleDocumentBlur = useEventCallback(() => {
//     setTimeout(() => {
//         if (!isNil(document.activeElement) && document.activeElement.nodeName === "BODY") {
//             if (!isNil(activeElementRef.current) && activeElementRef.current.disabled) {
//                 setFocusPopper(() => {
//                     const containerElement = containerRef.current;

//                     if (!isNil(containerElement)) {
//                         containerElement.focus();
//                     }
//                 });
//             }
//         }
//     }, 0);
// });
// useDocumentListener("blur", handleDocumentBlur, !isDisabled && isFocusWithin.current, true);
