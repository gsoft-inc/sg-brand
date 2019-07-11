import { ANCHOR_LEFT, ANCHOR_RIGHT, DateRangePicker } from "../../src";
import { ControlledDateRangePicker } from "./components/controlled-date-range-picker";
import { DEFAULT_DATE, DEFAULT_PRESETS, LAST_12_MONTHS_PRESET, LAST_3_MONTHS_PRESET, LAST_6_MONTHS_PRESET, LAST_MONTH_PRESET, LAST_WEEK_PRESET, logDatesChanged } from "../shared";
import { MirroredDateRangePickers } from "./components/mirrored-date-range-pickers";
import { array, boolean, date, select, text, withKnobs } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import moment from "moment";

import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

export const DEFAULT_PRESETS_OPTIONS = {
    "LAST_WEEK_PRESET": LAST_WEEK_PRESET,
    "LAST_MONTH_PRESET": LAST_MONTH_PRESET,
    "LAST_3_MONTHS_PRESET": LAST_3_MONTHS_PRESET,
    "LAST_6_MONTHS_PRESET": LAST_6_MONTHS_PRESET,
    "LAST_12_MONTHS_PRESET": LAST_12_MONTHS_PRESET,
};

function momentKnob(name, defaultValue) {
    const timestamp = date(name, defaultValue);

    return moment(timestamp);
}

function presetsKnob(name, defaultValue) {
    const presets = array(name, defaultValue);

    return presets.map(x => {
        return DEFAULT_PRESETS_OPTIONS[x]
    });
}

// TODO: transform into a shared StoryBuilder
/*
storyBuilder
    .section("Date-Range-Picker|play")
    .segment("date restrictions")
    .layout(object)
    .layoutWitdh(value)
    .chromatic(object)
    .chromaticIgnore()
    .chromaticDelay(value)
*/
function stories(segment) {
    let name = "Date-Range-Picker|play";

    if (segment) {
        name += segment;
    }

    return storiesOf(name, module).addParameters({
        options: {
            layout: {
                width: "80%"
            }
        },
        chromatic: {
            disable: true
        }
    });
}

stories()
    .add("default", () =>
        <DateRangePicker
            onDatesChange={logDatesChanged}
        />
    )
    .addDecorator(withKnobs)
    .add("knobs", () =>
        <DateRangePicker
            defaultStartDate={momentKnob("defaultStartDate", moment(DEFAULT_DATE).toDate())}
            defaultEndDate={momentKnob("defaultEndDate", moment(DEFAULT_DATE).add(5, "days").toDate())}
            allowSingleDateSelection={boolean("allowSingleDateSelection", false)}
            minDate={momentKnob("minDate", moment(DEFAULT_DATE).subtract(6, "months").toDate())}
            maxDate={momentKnob("maxDate", moment(DEFAULT_DATE).add(6, "months").toDate())}
            placeholder={text("placeholder", DateRangePicker.defaultProps.placeholder)}
            rangeFormat={text("rangeFormat", DateRangePicker.defaultProps.rangeFormat)}
            dateFormat={text("dateFormat", DateRangePicker.defaultProps.dateFormat)}
            anchorDirection={select("anchorDirection", { "Left": ANCHOR_LEFT, "Right": ANCHOR_RIGHT }, ANCHOR_LEFT)}
            presets={presetsKnob("presets (value separator is ',')", Object.keys(DEFAULT_PRESETS))}
            clearText={text("clearText", DateRangePicker.defaultProps.clearText)}
            applyText={text("applyText", DateRangePicker.defaultProps.applyText)}
            disabled={boolean("disabled", false)}
            className={text("className")}
            onDatesChange={logDatesChanged}
        />
    )
    .add("presets", () =>
        <DateRangePicker
            presets={DEFAULT_PRESETS}
            onDatesChange={logDatesChanged}
        />
    )
    .add("min date restriction", () =>
        <DateRangePicker
            minDate={moment(DEFAULT_DATE).subtract(2, "weeks")}
            onDatesChange={logDatesChanged}
        />
    )
    .add("max date restriction", () =>
        <DateRangePicker
            maxDate={moment(DEFAULT_DATE).add(2, "weeks")}
            onDatesChange={logDatesChanged}
        />
    )
    .add("min & max dates restriction", () =>
        <DateRangePicker
            minDate={moment(DEFAULT_DATE).subtract(2, "weeks")}
            maxDate={moment(DEFAULT_DATE).add(2, "weeks")}
            onDatesChange={logDatesChanged}
        />
    )
    .add("allow single date selection", () =>
        <DateRangePicker
            allowSingleDateSelection
            onDatesChange={logDatesChanged}
        />
    )
    .add("disabled", () =>
        <DateRangePicker
            disabled
            onDatesChange={logDatesChanged}
        />
    )
    .add("inlined", () =>
        <div className="flex">
            <div className="mr4" style={{ width: "50%" }}>
                <DateRangePicker
                    onDatesChange={(event, startDate, endDate, preset) => {
                        console.log("Start: ", startDate, " End: ", endDate, "Preset: ", preset);
                    }}
                />
            </div>
            <div style={{ width: "50%" }}>
                <DateRangePicker
                    onDatesChange={(event, startDate, endDate, preset) => {
                        console.log("Start: ", startDate, " End: ", endDate, "Preset: ", preset);
                    }}
                />
            </div>
        </div>
    );

stories("/controlled")
    .add("stateful", () =>
        <ControlledDateRangePicker
            startDate={moment(DEFAULT_DATE)}
            endDate={moment(DEFAULT_DATE).add(LAST_3_MONTHS_PRESET, "days")}
        />
    )
    .add("null values", () =>
        <ControlledDateRangePicker
            startDate={null}
            endDate={null}
        />
    )
    .add("mirrored", () =>
        <MirroredDateRangePickers />
    );
