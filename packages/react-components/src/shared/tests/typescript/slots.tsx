import { ReactNode } from "react";
import { expectAssignable } from "../../../../../../typescript/tests/helpers";
import { getSlots } from "../../src";

const node: ReactNode = null;
const result = getSlots(node, {
    _: {
        defaultWrapper: null,
        required: ["text"]
    },
    icon: {
        className: "o-ui-accordion-icon"
    },
    text: {
        size: "inherit",
        className: "o-ui-accordion-title"
    }
});

expectAssignable<keyof typeof result>("icon");
expectAssignable<keyof typeof result>("text");

// @ts-expect-error
expectAssignable<keyof typeof result>("autre");