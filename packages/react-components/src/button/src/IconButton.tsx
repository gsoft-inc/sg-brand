import "./IconButton.css";

import { Box } from "../../box";
import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, SyntheticEvent } from "react";
import { EmbeddedIcon } from "../../icons";
import { augmentElement, createEmbeddableAdapter, forwardRef, mergeProps, omitProps, slot } from "../../shared";
import { useButton } from "./useButton";
import { useToolbarProps } from "../../toolbar";

export interface InnerIconButtonProps {
    /**
     * The icon button style to use.
     */
    variant?: "solid" | "outline" | "ghost";
    /**
     * The icon button color accent.
     */
    color?: "primary" | "secondary" | "danger" | "inherit";
    /**
     * The icon button shape.
     */
    shape?: "rounded" | "circular";
    /**
     * Whether or not the icon button content should takes additional space.
     */
    condensed?: boolean;
    /**
     * Whether or not the icon button should autoFocus on render.
     */
    autoFocus?: boolean | number
    /**
     * An icon button can show a loading indicator.
     */
    loading?: boolean;
    /**
     * An icon button can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md";
    /**
     * Whether or not the icon button is disabled.
     */
    disabled?: boolean;
    /**
     * The icon button type.
     */
    type?: "button" | "submit" | "reset";
    /**
     * Called when the icon button is click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onClick?(event: SyntheticEvent): void;
    /**
     * A label providing an accessible name to the icon button. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string,
    /**
     * Whether or not the button take up the width of its container.
     */
    fluid?: boolean;
    /**
     * @ignore
     */
    active?: boolean;
    /**
     * @ignore
     */
    focus?: boolean;
    /**
     * @ignore
     */
    hover?: boolean;
    /**
    * @ignore
    */
    title?: string;
    /**
     * React children.
     */
    children: ReactElement<any, any>;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerIconButton(props: InnerIconButtonProps) {
    const [toolbarProps] = useToolbarProps();

    const {
        variant = "solid",
        color,
        shape = "circular",
        condensed,
        autoFocus,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        type = "button",
        title,
        "aria-label": ariaLabel,
        as = "button",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"])
    );

    const buttonProps = useButton({
        cssModule: "o-ui-icon-button",
        variant,
        color,
        shape,
        autoFocus,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        type,
        forwardedRef
    });

    const icon = Children.only(children);

    const iconMarkup = augmentElement(condensed ? icon : <EmbeddedIcon>{icon}</EmbeddedIcon>, {
        size,
        className: "o-ui-button-icon"
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    title: title ?? ariaLabel,
                    as,
                    "aria-label": ariaLabel
                },
                buttonProps
            )}
        >
            {iconMarkup}
        </Box>
    );
}

export const IconButton = slot("button", forwardRef<InnerIconButtonProps, "button">((props, ref) => (
    <InnerIconButton {...props} forwardedRef={ref} />
)));

export type IconButtonProps = ComponentProps<typeof IconButton>

IconButton.displayName = "IconButton";

export const embedIconButton = createEmbeddableAdapter({
    "sm": "2xs",
    "md": "xs"
});