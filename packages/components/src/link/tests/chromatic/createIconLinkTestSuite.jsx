import { AddIcon } from "@components/icons";
import { Div } from "@components/html";
import { Inline, Stack } from "@components/layout";
import { cloneElement } from "react";

function IconLink({ element, ...rest }) {
    return cloneElement(element, rest);
}

export function createIconLinkTestSuite(element, stories) {
    return stories
        .add("default", () =>
            <Inline alignY="end">
                <IconLink size="sm" href="#" aria-label="Add" element={element}><AddIcon /></IconLink>
                <IconLink href="#" aria-label="Add" element={element}><AddIcon /></IconLink>
            </Inline>
        )
        .add("condensed", () =>
            <Inline alignY="end">
                <IconLink condensed size="sm" href="#" aria-label="Add" element={element}><AddIcon /></IconLink>
                <IconLink condensed href="#" aria-label="Add" element={element}><AddIcon /></IconLink>
            </Inline>
        )
        .add("primary", () =>
            <Inline alignY="end">
                <IconLink variant="primary" size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                <IconLink variant="primary" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
            </Inline>
        )
        .add("secondary", () =>
            <Inline alignY="end">
                <IconLink variant="secondary" size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                <IconLink variant="secondary" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
            </Inline>
        )
        .add("danger", () =>
            <Inline alignY="end">
                <IconLink variant="danger" size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                <IconLink variant="danger" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
            </Inline>
        )
        .add("inherit color", () =>
            <Inline alignY="end" color="alias-accent">
                <IconLink color="inherit" size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                <IconLink color="inherit" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
            </Inline>
        )
        .add("states", () =>
            <Stack>
                <Inline alignY="end">
                    <IconLink active size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink active aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink focus size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink focus aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink hover size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink hover aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink focus hover size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink focus hover aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
            </Stack>
        )
        .add("disabled states", () =>
            <Stack>
                <Inline alignY="end">
                    <IconLink disabled size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink disabled aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink disabled active size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink disabled active aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink disabled focus size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink disabled focus aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink disabled hover size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink disabled hover aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
                <Inline alignY="end">
                    <IconLink disabled focus hover size="sm" aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                    <IconLink disabled focus hover aria-label="Add" href="#" element={element}><AddIcon /></IconLink>
                </Inline>
            </Stack>
        )
        .add("external", () =>
            <IconLink external href="https://www.space.com/spacex-delays-south-korea-military-satellite-launch.html" aria-label="Add" element={element}><AddIcon /></IconLink>
        )
        .add("new tab", () =>
            <IconLink target="_blank" href="#" aria-label="Add" element={element}><AddIcon /></IconLink>
        )
        .add("zoom", () =>
            <Stack>
                <Div className="zoom-in">
                    <IconLink href="#" aria-label="Add" element={element}><AddIcon /></IconLink>
                </Div>
                <Div className="zoom-out">
                    <IconLink href="#" aria-label="Add" element={element}><AddIcon /></IconLink>
                </Div>
            </Stack>
        );
}

