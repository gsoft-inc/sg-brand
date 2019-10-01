import { ControlledStarWarsCharactersSearchInput } from "./components";
import { LAURIE_VALUE, logValueChanged } from "@stories/react-components/search-input/shared";
import { RemoteSearchInput, SearchInputController } from "@orbit-ui/react-search-input/src";
import { StarWarsCharactersSearchInput } from "@stories/react-components/search-input/components";
import { boolean, number, text, withKnobs } from "@storybook/addon-knobs";
import { storiesBuilder } from "@utils/stories-builder";

function stories(segment) {
    return storiesBuilder(module, "Remote-Search-Input|play")
        .segment(segment)
        .layoutWidth("80%")
        .chromaticIgnoreStory()
        .build();
}

stories()
    .add("default",
         () =>
             <StarWarsCharactersSearchInput
                 onValueChange={logValueChanged}
             />
    )
    .add("knobs",
         () =>
             <StarWarsCharactersSearchInput
                 defaultValue={text("defaultValue")}
                 debounceDelay={number("debounceDelay", RemoteSearchInput.defaultProps.debounceDelay)}
                 loadingDelay={number("loadingDelay", RemoteSearchInput.defaultProps.loadingDelay)}
                 minCharacters={number("minCharacters", RemoteSearchInput.defaultProps.minCharacters)}
                 noResultsMessage={text("noResultsMessage")}
                 placeholder={text("placeholder", SearchInputController.defaultProps.placeholder)}
                 disabled={boolean("disabled", false)}
                 onValueChange={logValueChanged}
             />,
         { decorators: [withKnobs] }
    )
    .add("selected value",
         () =>
             <StarWarsCharactersSearchInput
                 defaultValue={LAURIE_VALUE}
                 onValueChange={logValueChanged}
             />
    )
    .add("clear on select",
         () =>
             <StarWarsCharactersSearchInput
                 clearOnSelect
                 onValueChange={logValueChanged}
             />
    )
    .add("autofocus",
         () =>
             <StarWarsCharactersSearchInput
                 autofocus
                 clearOnSelect
                 onValueChange={logValueChanged}
             />
    )
    .add("disabled",
         () =>
             <StarWarsCharactersSearchInput
                 disabled
                 onValueChange={logValueChanged}
             />
    )
    .add("failing fetch",
         () =>
             <RemoteSearchInput
                 onFetchResults={() => Promise.reject()}
                 onValueChange={logValueChanged}
             />
    );

stories("/controlled")
    .add("stateful",
         () =>
             <ControlledStarWarsCharactersSearchInput
                 value={LAURIE_VALUE}
                 onValueChange={logValueChanged}
             />
    );
