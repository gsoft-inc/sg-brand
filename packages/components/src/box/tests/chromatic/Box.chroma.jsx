import { Box } from "@components/box";
import { Inline } from "@components/layout";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Box")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Box>The Universe is under no obligation to make sense to you.</Box>
    )
    .add("styling", () =>
        <Inline>
            <Box border="sunray-10">The Universe is under no obligation to make sense to you.</Box>
            <Box className="bg-red">The Universe is under no obligation to make sense to you.</Box>
            <Box style={{ backgroundColor: "red" }}>The Universe is under no obligation to make sense to you.</Box>
        </Inline>
    );
