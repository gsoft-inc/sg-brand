import { Icon } from "semantic-ui-react";
import { createSemanticThemeSection } from "@utils/create-section";
import { paramsBuilder } from "@utils/params-builder";
import { storiesOfBuilder } from "@utils/stories-of-builder";

function stories(segment) {
    return storiesOfBuilder(module, createSemanticThemeSection("Icon"))
        .segment(segment)
        .parameters(
            paramsBuilder()
                .chromaticDelay(100)
                .width("80%")
                .sortLast()
                .build()
        )
        .build();
}

stories()
    .add("default",
         () =>
             <div className="flex flex-column">
                 <Icon name="search" />
                 <Icon flipped="horizontally" name="search" />
                 <Icon flipped="vertically" name="search" />
                 <Icon disabled name="search" />
                 <Icon flipped="horizontally" disabled name="search" />
                 <Icon flipped="vertically" disabled name="search" />
                 <Icon name="delete" />
                 <Icon flipped="horizontally" name="delete" />
                 <Icon flipped="vertically" name="delete" />
                 <Icon disabled name="delete" />
                 <Icon disabled flipped="horizontally" name="delete" />
                 <Icon disabled flipped="vertically" name="delete" />
                 <Icon name="close" />
                 <Icon flipped="horizontally" name="close" />
                 <Icon flipped="vertically" name="close" />
                 <Icon disabled name="close" />
                 <Icon disabled flipped="horizontally" name="close" />
                 <Icon disabled flipped="vertically" name="close" />
             </div>
    );
