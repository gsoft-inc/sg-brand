import { CheckIcon, CrossIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { ToggleIconButton } from "@react-components/button";
import { storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/ToggleIconButton")
        .segment(segment)
        .build();
}

stories()
    .add("default", () =>
        <Stack>
            <Inline verticalAlign="end">
                <ToggleIconButton size="sm" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton aria-label="Activate"><CheckIcon /></ToggleIconButton>
            </Inline>
            <Inline verticalAlign="end">
                <ToggleIconButton checked aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton active aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton focus aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton hover aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton focus hover aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton disabled aria-label="Activate"><CheckIcon /></ToggleIconButton>
            </Inline>
        </Stack>
    )
    .add("circular outline", () =>
        <Stack>
            <Inline verticalAlign="end">
                <ToggleIconButton size="sm" variant="outline" shape="circular" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton variant="outline" shape="circular" aria-label="Activate"><CheckIcon /></ToggleIconButton>
            </Inline>
            <Inline verticalAlign="end">
                <ToggleIconButton checked variant="outline" shape="circular" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton active variant="outline" shape="circular" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton focus variant="outline" shape="circular" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton hover variant="outline" shape="circular" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton focus hover variant="outline" shape="circular" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton disabled variant="outline" shape="circular" aria-label="Activate"><CheckIcon /></ToggleIconButton>
            </Inline>
        </Stack>
    )
    .add("rounded outline", () =>
        <Stack>
            <Inline verticalAlign="end">
                <ToggleIconButton size="sm" variant="outline" shape="rounded" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton variant="outline" shape="rounded" aria-label="Activate"><CheckIcon /></ToggleIconButton>
            </Inline>
            <Inline verticalAlign="end">
                <ToggleIconButton checked variant="outline" shape="rounded" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton active variant="outline" shape="rounded" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton focus variant="outline" shape="rounded" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton hover variant="outline" shape="rounded" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton focus hover variant="outline" shape="rounded" aria-label="Activate"><CheckIcon /></ToggleIconButton>
                <ToggleIconButton disabled variant="outline" shape="rounded" aria-label="Activate"><CheckIcon /></ToggleIconButton>
            </Inline>
        </Stack>
    )
    .add("checked", () =>
        <Inline>
            <ToggleIconButton checked aria-label="Activate"><CheckIcon /></ToggleIconButton>
            <ToggleIconButton defaultChecked aria-label="Activate"><CheckIcon /></ToggleIconButton>
        </Inline>
    )
    .add("render props", () =>
        <Inline>
            <ToggleIconButton aria-label="Activate">
                {
                    () => <CheckIcon />
                }
            </ToggleIconButton>
            <ToggleIconButton defaultChecked aria-label="Activate">
                {
                    ({ isChecked }) => isChecked ? <CheckIcon /> : <CrossIcon />
                }
            </ToggleIconButton>
        </Inline>
    )
    .add("styling", () =>
        <Inline>
            <ToggleIconButton className="bg-red" aria-label="Activate"><CheckIcon /></ToggleIconButton>
            <ToggleIconButton style={{ backgroundColor: "red" }} aria-label="Activate"><CheckIcon /></ToggleIconButton>
        </Inline>
    );




