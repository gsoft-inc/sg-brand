import { Button } from "./Button";
import { ComponentProps, ReactNode, SyntheticEvent, forwardRef } from "react";
import { InteractionStatesProps, InternalProps, OmitInternalProps, mergeProps, resolveChildren, slot, useCheckableProps } from "../../shared";
import { useToggleButton } from "./useToggleButton";

const DefaultElement = "button";

export interface InnerToggleButtonProps extends InternalProps, InteractionStatesProps, Omit<ComponentProps<typeof DefaultElement>, "autoFocus" | "onChange"> {
    /**
     * A controlled checked value.
     */
    checked?: boolean | null;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * The value to associate with when in a group.
     */
    value?: string;
    /**
     * Called when the toggle button checked state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {bool} isChecked - Whether the button is checked or not.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent, isChecked: boolean) => void;
    /**
     * The style to use.
     */
    variant?: "solid" | "outline";
    /**
     * The toggle button color accent.
     */
    color?: "primary" | "secondary";
    /**
     * The toggle button shape.
     */
    shape?: "pill" | "rounded" | "circular";
    /**
     * Whether or not the toggle button should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * A toggle button can vary in size.
     */
    size?: "sm" | "md";
    /**
     * Whether or not the toggle button is disabled.
     */
    disabled?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerToggleButton(props: InnerToggleButtonProps) {
    const [checkableProps, isCheckable] = useCheckableProps(props);

    const {
        variant = "solid",
        shape = "pill",
        checked,
        defaultChecked,
        value,
        onChange,
        onCheck,
        active,
        as = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        checkableProps
    );

    const { buttonProps } = useToggleButton({
        variant,
        shape,
        checked,
        defaultChecked,
        value,
        onChange,
        onCheck,
        active,
        isCheckable,
        forwardedRef
    });

    const content = resolveChildren(children);

    return (
        <Button
            {...mergeProps(
                rest,
                {
                    as
                },
                buttonProps
            )}
        >
            {content}
        </Button>
    );
}

export const ToggleButton = slot("button", forwardRef<HTMLButtonElement, OmitInternalProps<InnerToggleButtonProps>>((props, ref) => (
    <InnerToggleButton {...props} forwardedRef={ref} />
)));

export type ToggleButtonProps = ComponentProps<typeof ToggleButton>;

ToggleButton.displayName = "ToggleButton";


