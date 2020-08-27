import "./Button.css";

import { EmbeddedIcon } from "../../icons";
import { SIZE, createEmbeddableAdapter, createSizeAdapterSlotFactory, mergeClasses, useSlotProps } from "../../shared";
import { any, bool, element, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { useButton } from "./useButton";

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["solid", "outline", "ghost", "link"]),
    /**
     * The color accent.
     */
    color: oneOf(["primary", "secondary", "danger"]),
    /**
     * The button shape.
     */
    shape: oneOf(["pill", "rounded", "circular"]),
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the text.
     */
    icon: element,
    /**
     * Whether the button should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * Whether the button take up the width of its container.
     */
    fluid: bool,
    /**
     * A button can show a loading indicator.
     */
    loading: bool,
    /**
     * A button can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * The button type.
     */
    type: oneOf(["button", "submit", "reset"]),
    /**
     * Called when the button is click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onClick: func,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    variant: "solid",
    shape: "pill",
    type: "button",
    as: "button"
};

export function InnerButton(props) {
    const {
        variant,
        color,
        shape,
        icon,
        counter,
        autoFocus,
        autoFocusDelay,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        disabled,
        as: ElementType,
        className,
        children,
        forwardedRef,
        ...rest
    } = useSlotProps(props, "button");

    const buttonProps = useButton({
        variant,
        color,
        shape,
        autoFocus,
        autoFocusDelay,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        disabled,
        className,
        forwardedRef
    });

    const textMarkup = (
        <span className="text">{children}</span>
    );

    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon size={size}>{icon}</EmbeddedIcon>
    );

    // const badgeMarkup = !isNil(badge) && embedBadge(badge, {
    //     size,
    //     disabled
    // });

    const content = (
        <>
            {iconMarkup}
            {textMarkup}
            {counter}
        </>
    );

    return (
        <ElementType
            data-testid="button"
            {...rest}
            {...buttonProps}
            className={mergeClasses(
                "o-ui button",
                buttonProps.className
            )}
        >
            {content}
        </ElementType>
    );
}

InnerButton.propTypes = propTypes;
InnerButton.defaultProps = defaultProps;

export const Button = forwardRef((props, ref) => (
    <InnerButton {...props} forwardedRef={ref} />
));

export const embedButton = createEmbeddableAdapter({
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.tiny,
    [SIZE.large]: SIZE.small
});

export const buttonSlot = createSizeAdapterSlotFactory({
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.tiny,
    [SIZE.large]: SIZE.small
});




