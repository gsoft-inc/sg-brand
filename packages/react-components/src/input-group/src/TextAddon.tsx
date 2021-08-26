import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitForwardedRefProp, mergeProps } from "../../shared";
import { useInputGroupAddonProps } from "../../input-group";

export interface InnerTextAddonProps extends InternalProps {
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerTextAddon(props: InnerTextAddonProps) {
    const [inputGroupAddonProps] = useInputGroupAddonProps();

    const {
        as,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        inputGroupAddonProps
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-input-group-text-addon",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

export const TextAddon = forwardRef<any, OmitForwardedRefProp<InnerTextAddonProps>>((props, ref) => (
    <InnerTextAddon {...props} forwardedRef={ref} />
));

export type TextAddonProps = ComponentProps<typeof TextAddon>;

TextAddon.displayName = "TextAddon";
