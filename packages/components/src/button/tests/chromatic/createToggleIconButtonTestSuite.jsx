import { CheckIcon } from "@components/icons";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { cloneElement } from "react";

function ToggleIconButton({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createToggleIconButtonTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleIconButton size="sm" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleIconButton checked aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton active aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton focus aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton hover aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton focus hover aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton disabled aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
            </Stack>
        )
        .add("rounded", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleIconButton size="sm" shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleIconButton checked shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton active shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton focus shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton hover shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton focus hover shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton disabled shape="rounded" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
            </Stack>
        )
        .add("circular", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleIconButton size="sm" shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleIconButton checked shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton active shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton focus shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton hover shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton focus hover shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton disabled shape="circular" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
            </Stack>
        )
        .add("primary", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleIconButton color="primary" size="sm" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton color="primary" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleIconButton color="primary" checked aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton color="primary" active aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton color="primary" focus aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton color="primary" hover aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton color="primary" focus hover aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton color="primary" disabled aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
            </Stack>
        )
        .add("secondary", () =>
            <Stack>
                <Inline alignY="end">
                    <ToggleIconButton color="secondary" size="sm" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton color="secondary" aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
                <Inline alignY="end">
                    <ToggleIconButton color="secondary" checked aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton color="secondary" active aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton color="secondary" focus aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton color="secondary" hover aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton color="secondary" focus hover aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                    <ToggleIconButton color="secondary" disabled aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Inline>
            </Stack>
        )
        .add("checked", () =>
            <Inline>
                <ToggleIconButton checked aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                <ToggleIconButton defaultChecked aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
            </Inline>
        )
        .add("zoom", () =>
            <Inline>
                <Div className="zoom-in">
                    <ToggleIconButton aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Div>
                <Div className="zoom-out">
                    <ToggleIconButton aria-label="Activate" element={element}><CheckIcon /></ToggleIconButton>
                </Div>
            </Inline>
        );
}
