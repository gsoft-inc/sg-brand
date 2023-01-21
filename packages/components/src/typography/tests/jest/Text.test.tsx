import { Text } from "@components/typography";
import { createRef } from "react";
import { renderWithTheme } from "@test-utils";
import { waitFor } from "@testing-library/react";

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Text ref={ref}>Text</Text>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    expect(ref.current instanceof HTMLElement).toBeTruthy();
    expect(ref.current.tagName).toBe("SPAN");
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Text
            ref={node => {
                refNode = node;
            }}
        >
            Text
        </Text>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    expect(refNode instanceof HTMLElement).toBeTruthy();
    expect(refNode.tagName).toBe("SPAN");
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Text ref={handler}>
            Text
        </Text>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});
