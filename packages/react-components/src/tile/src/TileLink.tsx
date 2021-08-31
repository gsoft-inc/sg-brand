import { AbstractLinkProps, Link } from "../../link";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InteractionProps, InternalProps, OmitInternalProps, OrbitComponentProps, StyleProps, cssModule, mergeProps } from "../../shared";
import { Orientation } from "../../layout";
import { useTile } from "./useTile";

const DefaultElement = "a";

export interface InnerTileLinkProps extends
    AbstractLinkProps,
    StyleProps,
    InternalProps,
    InteractionProps,
    Omit<OrbitComponentProps<typeof DefaultElement>, "target"> {
    /**
     * Whether or not the tile should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The orientation of the tile.
     */
    orientation?: Orientation;
}

export function InnerTileLink({
    active,
    as = DefaultElement,
    children,
    disabled,
    focus,
    forwardedRef,
    hover,
    orientation = "vertical",
    ...rest
}: InnerTileLinkProps) {
    const { markup, tileProps } = useTile({
        active,
        children,
        focus,
        hover,
        orientation,
        variant: "link"
    });

    return (
        <Link
            {...mergeProps(
                rest,
                {
                    active,
                    as,
                    className: cssModule(
                        "o-ui-tile-link",
                        disabled && "disabled"
                    ),
                    disabled,
                    focus,
                    hover,
                    ref: forwardedRef
                },
                tileProps
            )}
        >
            {markup}
        </Link>
    );
}

export const TileLink = forwardRef<any, OmitInternalProps<InnerTileLinkProps>>((props, ref) => (
    <InnerTileLink {...props} forwardedRef={ref} />
));

export type TileLinkProps = ComponentProps<typeof TileLink>;


