import { Card } from "@components/card";
import { Content } from "@components/placeholders";
import { Heading } from "@components/typography";
import { createRef } from "react";
import { renderWithTheme } from "@test-utils";
import { waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Card ref={ref}>
            <Heading>Nasa</Heading>
            <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
        </Card>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("SECTION"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Card
            ref={node => {
                refNode = node;
            }}
        >
            <Heading>Nasa</Heading>
            <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
        </Card>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("SECTION"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Card ref={handler}>
            <Heading>Nasa</Heading>
            <Content>The National Aeronautics and Space Administration is an independent agency of the U.S. federal government responsible for the civilian space program, as well as aeronautics and space research.</Content>
        </Card>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
