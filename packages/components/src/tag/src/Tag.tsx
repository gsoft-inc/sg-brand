import { Box } from "../../box";
import { ComponentProps, ReactNode, SyntheticEvent, forwardRef, useMemo } from "react";
import { CrossButton, embedIconButton } from "../../button";
import { InteractionProps, InternalProps, OmitInternalProps, StyledComponentProps, cssModule, isNil, mergeProps, normalizeSize, useMergedRefs, useSlots } from "../../shared";
import { ResponsiveProp, useResponsiveValue } from "../../styling";
import { Text } from "../../typography";
import { embeddedIconSize } from "../../icons";

const DefaultElement = "div";

export interface InnerTagProps extends InternalProps, InteractionProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the tag have a disable look.
     */
    disabled?: boolean;
    /**
     * Whether the tag take up the width of its container.
     */
    fluid?: ResponsiveProp<boolean>;
    /**
     * Called when the remove button is clicked.
     * @param {SyntheticEvent} event - React's original event.
     * @returns {void}
     */
    onRemove?: (event: SyntheticEvent) => void;
    /**
     * A tag can vary in size.
     */
    size?: ResponsiveProp<"sm" | "md">;
    /**
     * The tag style to use.
     */
    variant?: "solid" | "outline";
}

export function InnerTag({
    active,
    as = DefaultElement,
    children,
    disabled,
    fluid,
    focus,
    forwardedRef,
    hover,
    onRemove,
    size,
    variant = "solid",
    ...rest
}: InnerTagProps) {
    const fluidValue = useResponsiveValue(fluid);
    const sizeValue = useResponsiveValue(size);

    const ref = useMergedRefs(forwardedRef);

    const { counter, dot, "end-icon": endIcon, icon, text } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        counter: {
            color: "inherit",
            disabled,
            pushed: true,
            size: sizeValue
        },
        dot: {
            className: "o-ui-tag-dot",
            disabled
        },
        "end-icon": {
            className: "o-ui-tag-end-icon",
            size: embeddedIconSize(sizeValue)
        },
        icon: {
            className: "o-ui-tag-start-icon",
            size: embeddedIconSize(sizeValue)
        },
        text: {
            className: "o-ui-tag-text",
            color: "inherit",
            size: sizeValue
        }
    }), [sizeValue, disabled]));

    const removeMarkup = !isNil(onRemove) && embedIconButton(<CrossButton aria-label="Remove" />, {
        "aria-label": "Remove",
        className: "o-ui-tag-remove-button",
        condensed: true,
        onClick: onRemove,
        size: sizeValue
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-tag",
                        variant,
                        dot && "has-dot",
                        icon && "has-start-icon",
                        endIcon && "has-end-icon",
                        removeMarkup && "has-remove-button",
                        fluidValue && "fluid",
                        active && "active",
                        focus && "focus",
                        hover && "hover",
                        normalizeSize(sizeValue)
                    ),
                    disabled,
                    ref
                }
            )}
        >
            {icon}
            {dot}
            {text}
            {endIcon}
            {counter}
            {removeMarkup}
        </Box>
    );
}

export const Tag = forwardRef<any, OmitInternalProps<InnerTagProps>>((props, ref) => (
    <InnerTag {...props} forwardedRef={ref} />
));

export type TagProps = ComponentProps<typeof Tag>;

