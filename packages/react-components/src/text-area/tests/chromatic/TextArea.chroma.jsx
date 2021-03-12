import { Inline } from "@react-components/layout";
import { TextArea } from "@react-components/text-area";
import { createTestSuite } from "./createTestSuite";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/TextArea")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

createTestSuite(<TextArea variant="outline" />, stories("/outline"));

createTestSuite(<TextArea variant="transparent" />, stories("/transparent"));

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
        <TextArea rows={12} />
    )
    .add("autofocus", () =>
        <TextArea autoFocus />
    )
    .add("when disabled do not autofocus", () =>
        <TextArea disabled autoFocus />
    )
    .add("when readOnly do not autofocus", () =>
        <TextArea disabled autoFocus />
    )
    .add("autofocus with delay", () =>
        <TextArea autoFocus={50} />
    )
    .add("styling", () =>
        <Inline>
            <TextArea className="bg-red" />
            <TextArea style={{ backgroundColor: "red" }} />
            <TextArea wrapperProps={{ className: "border-red" }} />
            <TextArea wrapperProps={{ style: { border: "1px solid red" } }} />
        </Inline>
    );
