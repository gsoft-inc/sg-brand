import "./Switch.css";

import { Box } from "../../box";
import { Text } from "../../text";
import { VisuallyHidden } from "../../visually-hidden";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { embeddedIconSize } from "../../icons";
import { forwardRef, useMemo } from "react";
import { mergeProps, omitProps, resolveChildren, useSlots } from "../../shared";
import { useCheckbox } from "../../checkbox";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

const propTypes = {
    /**
     * A controlled checked state value.
     */
    checked: bool,
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked: bool,
    /**
     * Whether or not the checkbox should autoFocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether or not the checkbox should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * A checkbox can vary in size.
     */
    size: oneOf(["sm", "md"]),
    /**
     * Invert the order the checkmark box and the label.
     */
    reverse: bool,
    /**
     * Called when the switch checked state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func])
};

export function InnerSwitch(props) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps, isInField] = useFieldInputProps();

    const {
        id,
        checked,
        defaultChecked,
        autoFocus,
        required,
        validationState,
        onChange,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        as = "label",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        fieldProps
    );

    const { wrapperProps, inputProps } = useCheckbox({
        cssModule: "o-ui-switch",
        isInField,
        id,
        checked,
        defaultChecked,
        autoFocus,
        required,
        validationState,
        onChange,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        forwardedRef
    });

    const content = resolveChildren(children);

    const { text, icon, counter } = useSlots(content, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        text: {
            color: "inherit",
            size,
            className: "o-ui-switch-label"
        },
        icon: {
            size: embeddedIconSize(size),
            className: "o-ui-switch-icon"
        },
        counter: {
            variant: "divider",
            color: "inherit",
            size,
            reverse,
            pushed: true,
            className: "o-ui-switch-counter"
        }
    }), [size, reverse]));

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as
                },
                wrapperProps
            )}
        >
            <VisuallyHidden {...inputProps} />
            <span className="o-ui-switch-control" />
            {text}
            {icon}
            {counter}
        </Box>
    );
}

InnerSwitch.propTypes = propTypes;

export const Switch = forwardRef((props, ref) => (
    <InnerSwitch {...props} forwardedRef={ref} />
));

Switch.displayName = "Switch";
