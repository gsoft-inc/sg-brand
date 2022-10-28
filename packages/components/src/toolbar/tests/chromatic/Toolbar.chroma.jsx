import { Field, Label } from "@components/field";
import { Inline, Stack } from "@components/layout";
import { Radio, RadioGroup } from "@components/radio";
import { ToggleButton, ToggleIconButton } from "@components/button";

import { CheckboxGroup } from "@components/checkbox";
import { Div } from "@components/html";
import { InputGroup } from "@components/input-group";
import { NotificationIcon } from "@components/icons";
import { Text } from "@components/typography";
import { TextInput } from "@components/text-input";
import { Toolbar } from "@components/toolbar";

export default {
    title: "Chromatic/Toolbar",
    component: Toolbar,
    parameters: {
        chromatic: {
            delay: 100
        }
    }
};

export const Default = () =>
    <Toolbar>
        <CheckboxGroup>
            <ToggleButton value="1">1</ToggleButton>
            <ToggleButton value="2">2</ToggleButton>
            <ToggleButton value="3">3</ToggleButton>
        </CheckboxGroup>
        <ToggleIconButton aria-label="Activate notification">
            <NotificationIcon />
        </ToggleIconButton>
        <RadioGroup>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    </Toolbar>;

export const DisabledElement = () =>
    <Toolbar>
        <CheckboxGroup disabled>
            <ToggleButton value="1">1</ToggleButton>
            <ToggleButton value="2">2</ToggleButton>
            <ToggleButton value="3">3</ToggleButton>
        </CheckboxGroup>
        <ToggleIconButton aria-label="Activate notification">
            <NotificationIcon />
        </ToggleIconButton>
        <RadioGroup>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    </Toolbar>;

export const Fluid = () =>
    <Toolbar fluid>
        <CheckboxGroup>
            <ToggleButton value="1">1</ToggleButton>
            <ToggleButton value="2">2</ToggleButton>
            <ToggleButton value="3">3</ToggleButton>
        </CheckboxGroup>
        <ToggleButton fluid>Turn On</ToggleButton>
        <RadioGroup>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    </Toolbar>;

export const Disabled = () =>
    <Toolbar disabled>
        <CheckboxGroup>
            <ToggleButton value="1">1</ToggleButton>
            <ToggleButton value="2">2</ToggleButton>
            <ToggleButton value="3">3</ToggleButton>
        </CheckboxGroup>
        <ToggleButton fluid>Turn On</ToggleButton>
        <RadioGroup>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    </Toolbar>;

export const Gap = () =>
    <Toolbar gap={13}>
        <CheckboxGroup>
            <ToggleButton value="1">1</ToggleButton>
            <ToggleButton value="2">2</ToggleButton>
            <ToggleButton value="3">3</ToggleButton>
        </CheckboxGroup>
        <ToggleIconButton aria-label="Activate notification">
            <NotificationIcon />
        </ToggleIconButton>
        <RadioGroup>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
    </Toolbar>;

export const Align = () =>
    <Stack>
        <Toolbar alignX="start">
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <ToggleIconButton aria-label="Activate notification">
                <NotificationIcon />
            </ToggleIconButton>
        </Toolbar>
        <Toolbar alignX="end">
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <ToggleIconButton aria-label="Activate notification">
                <NotificationIcon />
            </ToggleIconButton>
        </Toolbar>
        <Toolbar alignX="center">
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <ToggleIconButton aria-label="Activate notification">
                <NotificationIcon />
            </ToggleIconButton>
        </Toolbar>
    </Stack>;

export const VerticalAlign = () =>
    <Inline gap={13}>
        <Toolbar alignY="start" height={10}>
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <ToggleIconButton aria-label="Activate notification">
                <NotificationIcon />
            </ToggleIconButton>
        </Toolbar>
        <Toolbar alignY="end" height={10}>
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <ToggleIconButton aria-label="Activate notification">
                <NotificationIcon />
            </ToggleIconButton>
        </Toolbar>
        <Toolbar alignY="center" height={10}>
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <ToggleIconButton aria-label="Activate notification">
                <NotificationIcon />
            </ToggleIconButton>
        </Toolbar>
    </Inline>;

export const NoWrap = () =>
    <Div width={12}>
        <Toolbar wrap={false}>
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
            <ToggleIconButton aria-label="Activate notification">
                <NotificationIcon />
            </ToggleIconButton>
            <RadioGroup>
                <Radio value="1">1</Radio>
                <Radio value="2">2</Radio>
                <Radio value="3">3</Radio>
            </RadioGroup>
        </Toolbar>
    </Div>;

export const Complex = () =>
    <Toolbar>
        <CheckboxGroup>
            <ToggleButton value="1">1</ToggleButton>
            <ToggleButton value="2">2</ToggleButton>
            <ToggleButton value="3">3</ToggleButton>
        </CheckboxGroup>
        <TextInput aria-label="Label" />
        <ToggleButton>On</ToggleButton>
        <RadioGroup>
            <Radio value="1">1</Radio>
            <Radio value="2">2</Radio>
            <Radio value="3">3</Radio>
        </RadioGroup>
        <RadioGroup>
            <ToggleButton value="1">1</ToggleButton>
            <ToggleButton value="2">2</ToggleButton>
            <ToggleButton value="3">3</ToggleButton>
        </RadioGroup>
        <InputGroup>
            <TextInput aria-label="Label" />
            <Text>Days</Text>
        </InputGroup>
    </Toolbar>;

export const FieldsLabel = () =>
    <Toolbar alignY="end">
        <Field>
            <Label>Package</Label>
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
        </Field>
        <Field>
            <Label>Search</Label>
            <TextInput aria-label="Label" />
        </Field>
        <ToggleButton>Activate</ToggleButton>
    </Toolbar>;

export const Styling = () =>
    <Stack>
        <Toolbar border="warning-7">
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
        </Toolbar>
        <Toolbar className="border-red">
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
        </Toolbar>
        <Toolbar style={{ border: "1px solid red" }}>
            <CheckboxGroup>
                <ToggleButton value="1">1</ToggleButton>
                <ToggleButton value="2">2</ToggleButton>
                <ToggleButton value="3">3</ToggleButton>
            </CheckboxGroup>
        </Toolbar>
    </Stack>;

Default.storyName = "default";
DisabledElement.storyName = "disabled element";
Fluid.storyName = "fluid";
Disabled.storyName = "disabled";
Gap.storyName = "gap";
Align.storyName = "align";
VerticalAlign.storyName = "vertical align";
NoWrap.storyName = "no wrap";
Complex.storyName = "complex";
FieldsLabel.storyName = "fields + label";
Styling.storyName = "styling";
