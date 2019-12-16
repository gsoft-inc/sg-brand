import { CountriesSearchInput } from "./components";
import { LAURIE_VALUE } from "@react-components/search-input/stories/data";
import { createChromaticSection } from "@utils/create-section";
import { noop } from "lodash";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function createRemoteSearchInput(props = {}) {
    return <CountriesSearchInput
        onValueChange={noop}
        {...props}
    />;
}

function stories(segment) {
    return storiesOfBuilder(module, createChromaticSection("Search Input/remote"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .width("80%")
                .chromaticDelay(100)
                .sortLast()
                .build()
        )
        .build();
}

stories()
    .add("closed",
         () =>
             createRemoteSearchInput()
    )
    .add("opened",
         () =>
             createRemoteSearchInput({
                 defaultOpen: true
             })
    )
    .add("disabled",
         () =>
             createRemoteSearchInput({
                 disabled: true
             })
    );

stories("/selected value")
    .add("no selection",
         () =>
             createRemoteSearchInput()
    )
    .add("value selected",
         () =>
             createRemoteSearchInput({
                 defaultValue: LAURIE_VALUE
             })
    );
