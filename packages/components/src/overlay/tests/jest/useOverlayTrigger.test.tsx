import { ComponentProps } from "react";
import { mergeProps, Keys } from "@components/shared";
import { UseOverlayTriggerOptions, useOverlayTrigger } from "@components/overlay";
import { act, fireEvent, waitFor } from "@testing-library/react";
import { renderWithTheme } from "@jest-utils";
import userEvent from "@testing-library/user-event";

type OverlayProps = { open: boolean } & UseOverlayTriggerOptions & ComponentProps<"button">;

function Overlay({
    open,
    hideOnLeave = true,
    trigger,
    onShow,
    onHide,
    disabled,
    ...rest
}: OverlayProps) {
    const overlayTriggerProps = useOverlayTrigger(open, {
        hideOnLeave,
        trigger,
        onShow,
        onHide,
        isDisabled: disabled
    });

    return (
        <button
            {...mergeProps(
                rest,
                overlayTriggerProps
            )}
            type="button"
        >
            Trigger
        </button>
    );
}

describe("\"click\" trigger", () => {
    test("when is closed, call onShow on trigger click", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                onShow={handler}
                trigger="click"
                data-testid="trigger"
            />
        );

        await act(() => {
            return userEvent.click(getByTestId("trigger"));
        });

        await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    });

    test("when is closed, call onShow on trigger space keypress", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                onShow={handler}
                trigger="click"
                data-testid="trigger"
            />
        );

        act(() => {
            fireEvent.keyDown(getByTestId("trigger"), { key: Keys.space });
        });

        await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    });

    test("when is opened, do not call onShow on trigger space keypress", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open
                onShow={handler}
                trigger="click"
                data-testid="trigger"
            />
        );

        act(() => {
            fireEvent.keyDown(getByTestId("trigger"), { key: Keys.space });
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when is closed, call onShow on trigger enter keypress", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                onShow={handler}
                trigger="click"
                data-testid="trigger"
            />
        );

        act(() => {
            fireEvent.keyDown(getByTestId("trigger"), { key: Keys.enter });
        });

        await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    });

    test("when is opened, do not call onShow on trigger enter keypress", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                onShow={handler}
                trigger="click"
                data-testid="trigger"
            />
        );

        act(() => {
            fireEvent.keyDown(getByTestId("trigger"), { key: Keys.enter });
        });

        await waitFor(() => expect(handler).toHaveBeenCalled());
    });

    test("when is closed and disabled, do not call onShow on trigger click", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                disabled
                onShow={handler}
                trigger="click"
                data-testid="trigger"
            />
        );

        await act(() => {
            return userEvent.click(getByTestId("trigger"));
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when is closed and disabled, do not call onShow on trigger space keypress", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                disabled
                onShow={handler}
                trigger="click"
                data-testid="trigger"
            />
        );

        act(() => {
            fireEvent.keyDown(getByTestId("trigger"), { key: Keys.space });
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when is closed and disabled, do not call onShow on trigger enter keypress", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                disabled
                onShow={handler}
                trigger="click"
                data-testid="trigger"
            />
        );

        act(() => {
            fireEvent.keyDown(getByTestId("trigger"), { key: Keys.enter });
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when is opened, call onHide on trigger click", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open
                onHide={handler}
                trigger="click"
                data-testid="trigger"
            />
        );

        await act(() => {
            return userEvent.click(getByTestId("trigger"));
        });

        await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    });
});

describe("\"hover\" trigger", () => {
    test("when is closed, call onShow on hover", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                onShow={handler}
                trigger="hover"
                data-testid="trigger"
            />
        );

        await act(() => {
            return userEvent.hover(getByTestId("trigger"));
        });

        await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    });

    test("when is closed, call onShow on focus", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                onShow={handler}
                trigger="hover"
                data-testid="trigger"
            />
        );

        act(() => {
            getByTestId("trigger").focus();
        });

        await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    });

    test("when is opened, call onHide on unhover", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open
                onShow={handler}
                trigger="hover"
                data-testid="trigger"
            />
        );

        await act(() => {
            return userEvent.hover(getByTestId("trigger"));
        });

        await act(() => {
            return userEvent.unhover(getByTestId("trigger"));
        });

        await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    });

    test("when is opened, call onHide on blur", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open
                onShow={handler}
                trigger="hover"
                data-testid="trigger"
            />
        );

        act(() => {
            getByTestId("trigger").focus();
        });

        await act(() => {
            return userEvent.click(document.body);
        });

        await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
    });

    test("when hideOnLeave is false, do not call onHide on unhover", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                hideOnLeave={false}
                open
                onHide={handler}
                trigger="hover"
                data-testid="trigger"
            />
        );

        await act(() => {
            return userEvent.hover(getByTestId("trigger"));
        });

        await act(() => {
            return userEvent.unhover(getByTestId("trigger"));
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when hideOnLeave is false, do not call onHide on blur", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                hideOnLeave={false}
                open
                onHide={handler}
                trigger="hover"
                data-testid="trigger"
            />
        );

        act(() => {
            getByTestId("trigger").focus();
        });

        await act(() => {
            return userEvent.click(document.body);
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when is closed and disabled, do not call onShow on hover", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                disabled
                open={false}
                onShow={handler}
                trigger="hover"
                data-testid="trigger"
            />
        );

        await act(() => {
            return userEvent.hover(getByTestId("trigger"));
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when is closed and disabled, do not call onShow on focus", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                disabled
                open={false}
                onShow={handler}
                trigger="hover"
                data-testid="trigger"
            />
        );

        act(() => {
            getByTestId("trigger").focus();
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });
});

describe("\"none\" trigger", () => {
    test("when is closed, do not call onShow on trigger click", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                onShow={handler}
                trigger="none"
                data-testid="trigger"
            />
        );

        await act(() => {
            return userEvent.click(getByTestId("trigger"));
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when is closed, do not call onShow on trigger space keypress", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                onShow={handler}
                trigger="none"
                data-testid="trigger"
            />
        );

        act(() => {
            fireEvent.keyDown(getByTestId("trigger"), { key: Keys.space });
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when is closed, do not call onShow on trigger enter keypress", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                onShow={handler}
                trigger="none"
                data-testid="trigger"
            />
        );

        act(() => {
            fireEvent.keyDown(getByTestId("trigger"), { key: Keys.enter });
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when is closed, do not call onShow on hover", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                onShow={handler}
                trigger="none"
                data-testid="trigger"
            />
        );

        await act(() => {
            return userEvent.hover(getByTestId("trigger"));
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });

    test("when is closed, do not call onShow on focus", async () => {
        const handler = jest.fn();

        const { getByTestId } = renderWithTheme(
            <Overlay
                open={false}
                onShow={handler}
                trigger="none"
                data-testid="trigger"
            />
        );

        act(() => {
            getByTestId("trigger").focus();
        });

        await waitFor(() => expect(handler).not.toHaveBeenCalled());
    });
});

