import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, mergeProps, useId } from "../../shared";

const DefaultElement = "div";

export interface InnerFieldsetProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * A label identifying the group.
     */
    label: string;
}

export function InnerFieldset({
    id,
    label,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerFieldsetProps) {
    const rootId = useId(id, "o-ui-fieldset");
    const labelId = `${rootId}-label`;

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-labelledby": labelId,
                    as,
                    className: "o-ui-fieldset",
                    id: rootId,
                    ref: forwardedRef,
                    role: "group"
                }
            )}
        >
            <span
                className="o-ui-fieldset-label"
                id={labelId}
            >
                {label}
            </span>
            {children}
        </Box>
    );
}

export const Fieldset = forwardRef<any, OmitInternalProps<InnerFieldsetProps>>((props, ref) => (
    <InnerFieldset {...props} forwardedRef={ref} />
));

export type FieldsetProps = ComponentProps<typeof Fieldset>;
