import { Inline } from "@react-components/layout";
import { TextArea } from "@react-components/input";
import { createChromaticSection, paramsBuilder, storiesOfBuilder } from "@utils";
import { createTextAreaTestSuite } from "./createTextAreaTestSuite";

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("TextArea"))
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .canvasLayout({ width: "80%" })
            .build())
        .build();
}

createTextAreaTestSuite(<TextArea variant="outline" />, stories("/outline"));

createTextAreaTestSuite(<TextArea variant="transparent" />, stories("/transparent"));

stories()
    .add("autosize", () =>
        <Inline align="start">
            <TextArea defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a eros nec urna mollis sollicitudin id et lacus. Nam in feugiat urna, eget volutpat sem. Duis ornare, eros nec accumsan consectetur, nunc nisi elementum quam, egestas posuere elit purus a neque. Nunc risus mi, interdum id nisl et, tempor pulvinar elit." />
            <TextArea maxRows={5} defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a eros nec urna mollis sollicitudin id et lacus. Nam in feugiat urna, eget volutpat sem. Duis ornare, eros nec accumsan consectetur, nunc nisi elementum quam, egestas posuere elit purus a neque. Nunc risus mi, interdum id nisl et, tempor pulvinar elit." />
        </Inline>
    )
    .add("no resize", () =>
        <TextArea resize="none" />
    )
    .add("rows", () =>
        <TextArea rows="12" />
    )
    .add("autofocus", () =>
        <TextArea autoFocus />
    )
    .add("when disabled do not autofocus", () =>
        <TextArea disabled autoFocus />
    )
    .add("autofocus with delay", () =>
        <TextArea autoFocus autoFocusDelay={50} />
    );
