import { isNil } from "lodash";
import { storiesOf } from "@storybook/react";

class StoriesConfigurationBuilder {
    _section;
    _segment;
    _layout = {}
    _chromatic = {}

    constructor(section) {
        if (!section) {
            throw new Error("StoryiesConfigurationBuilder.ctor - section is required.");
        }

        this._section = section;
    }

    segment(segment) {
        if (!isNil(segment)) {
            this._segment = segment;
        }

        return this;
    }

    layout(config) {
        if (!isNil(config)) {
            this._layout = {
                ...this._layout,
                ...config
            };
        }

        return this;
    }

    layoutWidth(width) {
        if (!isNil(width)) {
            this._layout.width = width;
        }

        return this;
    }

    chromatic(config) {
        if (!isNil(config)) {
            this._chromatic = {
                ...this._chromatic,
                ...config
            };
        }

        return this;
    }

    chromaticIgnoreStory() {
        this._chromatic.disable = true;

        return this;
    }

    chromaticDelay(delay) {
        if (!isNil(delay)) {
            this._chromatic.delay = delay;
        }

        return this;
    }

    build() {
        let name = this._section;

        if (!isNil(this._segment)) {
            name += this._segment;
        }

        const parameters = {
            options: {
                layout: this._layout
            },
            chromatic: this._chromatic
        };

        return storiesOf(name, module).addParameters(parameters);
    }
}

export function storiesBuilder(section) {
    return new StoriesConfigurationBuilder(section);
}
