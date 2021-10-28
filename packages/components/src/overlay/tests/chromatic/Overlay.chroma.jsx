import { Box } from "@components/box";
import { DesktopTheme, ThemeProvider } from "@components/styling";
import { Overlay } from "@components/overlay";
import { augmentElement, mergeProps, useMergedRefs } from "@components/shared";
import { forwardRef, useState } from "react";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Overlay")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .chromaticPauseAnimationAtEnd()
            .build())
        .build();
}

function PrimaryBox({ children, ...rest }) {
    return (
        <Box
            {...rest}
            backgroundColor="primary-6"
            height={9}
            width={9}
        >
            {children}
        </Box>
    );
}

const Boundary = forwardRef(({
    children,
    ...rest
},
ref) => {
    const [boundaryElement, setBoundaryElement] = useState();

    const containerRef = useMergedRefs(setBoundaryElement, ref);

    const content = augmentElement(children, {
        containerElement: boundaryElement
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    ref: containerRef
                }
            )}
        >
            {content}
        </Box>
    );
});

stories()
    .add("inherit theme", () =>
        <ThemeProvider theme={DesktopTheme} colorScheme="light">
            <Boundary>
                <Overlay show>
                    <PrimaryBox />
                </Overlay>
            </Boundary>
        </ThemeProvider>
    )
    .add("styled system", () =>
        <Boundary>
            <Overlay border="warning-7" show>
                <PrimaryBox />
            </Overlay>
        </Boundary>
    )
    .add("className", () =>
        <Boundary>
            <Overlay className="border-red" show>
                <PrimaryBox />
            </Overlay>
        </Boundary>
    )
    .add("style", () =>
        <Boundary>
            <Overlay style={{ border: "1px solid red" }} show>
                <PrimaryBox />
            </Overlay>
        </Boundary>
    );

