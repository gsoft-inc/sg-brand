import { Box } from "../../box";
import { ComponentProps,ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { slot } from "../../shared";

const defaultElement = "div";

export interface InnerHeaderProps extends ComponentProps<typeof defaultElement> {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * React children.
     */
    children: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerHeader({
    as = defaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerHeaderProps) {
    return (
        <Box
            {...rest}
            as={as}
            ref={forwardedRef}
        >
            {children}
        </Box>
    );
}

export const Header = slot("header", forwardRef<any, Omit<InnerHeaderProps, "forwardedRef">>((props, ref) => (
    <InnerHeader {...props} forwardedRef={ref} />
)));

export type HeaderProps = ComponentProps<typeof Header>;

Header.displayName = "Header";
