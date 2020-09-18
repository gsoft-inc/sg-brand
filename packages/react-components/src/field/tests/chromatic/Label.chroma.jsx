import { Inline } from "@react-components/layout";
import { Label } from "@react-components/field";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Label"))
        .segment(segment)
        .parameters(paramsBuilder()
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

stories()
    .add("default", () =>
        <Inline align="end">
            <Label size="sm">Where to?</Label>
            <Label>Where to?</Label>
            <Label size="lg">Where to?</Label>
        </Inline>
    )
    .add("complex", () =>
        <Inline align="end">
            <Label size="sm">
                <span>Where to? (<a href="https://www.google.com/sky" target="_blank" rel="noreferrer">view destinations</a>)</span>
            </Label>
            <Label>
                <span>Where to? (<a href="https://www.google.com/sky" target="_blank" rel="noreferrer">view destinations</a>)</span>
            </Label>
            <Label size="lg">
                <span>Where to? (<a href="https://www.google.com/sky" target="_blank" rel="noreferrer">view destinations</a>)</span>
            </Label>
        </Inline>
    )
    .add("as span", () =>
        <Inline align="end">
            <Label as="span" size="sm">Where to?</Label>
            <Label as="span">Where to?</Label>
            <Label as="span" size="lg">Where to?</Label>
        </Inline>
    );
