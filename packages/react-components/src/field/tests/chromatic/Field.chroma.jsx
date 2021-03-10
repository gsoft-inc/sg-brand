import { Autocomplete } from "@react-components/autocomplete";
import { Checkbox } from "@react-components/checkbox";
import { ErrorMessage, Field, HelpMessage, Label, ValidMessage } from "@react-components/field";
import { Inline, Stack } from "@react-components/layout";
import { Item } from "@react-components/placeholders";
import { NumberInput } from "@react-components/number-input";
import { PasswordInput, TextInput } from "@react-components/text-input";
import { Select } from "@react-components/select";
import { Switch } from "@react-components/switch";
import { TextArea } from "@react-components/text-area";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Field")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Field>
            <TextInput placeholder="Where to?" />
        </Field>
    )
    .add("label", () =>
        <Field>
            <Label>Where to?</Label>
            <TextInput />
        </Field>
    )
    .add("message", () =>
        <Stack gap={10}>
            <Field>
                <TextInput placeholder="Where to?" />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
            </Field>
            <div>
                <Field>
                    <TextInput />
                    <HelpMessage>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</HelpMessage>
                </Field>
            </div>
        </Stack>
    )
    .add("validation", () =>
        <Inline>
            <Field>
                <Label>Where to?</Label>
                <TextInput />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
                <ValidMessage>Thank you!</ValidMessage>
                <ErrorMessage>This is not a valid destination.</ErrorMessage>
            </Field>
            <Field validationState="valid">
                <Label>Where to?</Label>
                <TextInput />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
                <ValidMessage>Thank you!</ValidMessage>
                <ErrorMessage>This is not a valid destination.</ErrorMessage>
            </Field>
            <Field validationState="invalid">
                <Label>Where to?</Label>
                <TextInput />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
                <ValidMessage>Thank you!</ValidMessage>
                <ErrorMessage>This is not a valid destination.</ErrorMessage>
            </Field>
        </Inline>
    )
    .add("fluid", () =>
        <Stack>
            <div>
                <Field fluid>
                    <Label>Where to?</Label>
                    <TextInput />
                    <HelpMessage>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</HelpMessage>
                </Field>
            </div>
            <div className="w-10">
                <Field fluid>
                    <Label>Where to?</Label>
                    <TextInput />
                    <HelpMessage>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.</HelpMessage>
                </Field>
            </div>
        </Stack>
    )
    .add("required", () =>
        <Field required>
            <Label>Where to?</Label>
            <TextInput />
            <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
        </Field>
    )
    .add("states", () =>
        <Inline>
            <Field disabled>
                <Label>Where to?</Label>
                <TextInput />
                <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
            </Field>
        </Inline>
    )
    .add("text input", () =>
        <Field>
            <Label>Where to?</Label>
            <TextInput placeholder="Ex. Mars" />
            <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
        </Field>
    )
    .add("password input", () =>
        <Field>
            <Label>Where to?</Label>
            <PasswordInput />
            <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
        </Field>
    )
    .add("number input", () =>
        <Field>
            <Label>Age</Label>
            <NumberInput placeholder="Ex. 89" />
            <HelpMessage>How long ago are you born?</HelpMessage>
        </Field>
    )
    .add("textarea", () =>
        <Field>
            <Label>Where to?</Label>
            <TextArea placeholder="Ex. Mars" />
            <HelpMessage>Must be a planet in earth solar system.</HelpMessage>
        </Field>
    )
    .add("checkbox", () =>
        <Inline verticalAlign="end">
            <Field size="sm">
                <Label>Select your favorite galaxy</Label>
                <Checkbox>Milky Way</Checkbox>
                <HelpMessage>Must be reachable within 200,000 light-years.</HelpMessage>
            </Field>
            <Field>
                <Label>Select your favorite galaxy</Label>
                <Checkbox>Milky Way</Checkbox>
                <HelpMessage>Must be reachable within 200,000 light-years.</HelpMessage>
            </Field>
        </Inline>
    )
    .add("switch", () =>
        <Inline verticalAlign="end">
            <Field size="sm">
                <Label>Engines</Label>
                <Switch>Milky Way</Switch>
                <HelpMessage>Engines must cooldown for 30 minutes between startups.</HelpMessage>
            </Field>
            <Field>
                <Label>Engines</Label>
                <Switch>Milky Way</Switch>
                <HelpMessage>Engines must cooldown for 30 minutes between startups.</HelpMessage>
            </Field>
        </Inline>
    )
    .add("select", () =>
        <Field>
            <Label>Planet</Label>
            <Select placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Select>
            <HelpMessage>Must be a planet of the solar system.</HelpMessage>
        </Field>
    )
    .add("autocomplete", () =>
        <Field>
            <Label>Planet</Label>
            <Autocomplete placeholder="Select a planet" aria-label="Planets">
                <Item key="earth">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Autocomplete>
            <HelpMessage>Must be a planet of the solar system.</HelpMessage>
        </Field>
    )
    .add("styling", () =>
        <Inline>
            <Field className="border-red">
                <TextInput />
            </Field>
            <Field style={{ border: "1px solid red" }}>
                <TextInput />
            </Field>
        </Inline>
    );
