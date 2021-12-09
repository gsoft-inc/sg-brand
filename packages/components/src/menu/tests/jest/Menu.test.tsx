import { Item, Section } from "@components/collection";
import { act, fireEvent, waitFor } from "@testing-library/react";

import { Divider } from "@components/divider";
import { Keys } from "@components/shared";
import { Menu } from "@components/menu";
import { Text } from "@components/typography";
import { createRef } from "react";
import { renderWithTheme } from "@jest-utils";
import userEvent from "@testing-library/user-event";

// ***** Behaviors *****

test("when a menu have no selection, the first item is tabbable", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("tabindex", "0"));
});

test("when a menu with sections have no selection, the first item is tabbable", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Section title="Visited">
                <Item key="earth" data-testid="earth-item">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Section>
            <Section title="Not Visited">
                <Item key="jupiter">Jupiter</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="uranus">Uranus</Item>
            </Section>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("tabindex", "0"));
});

test("when a menu with dividers have no selection, the first item is tabbable", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="mars">Mars</Item>
            <Divider />
            <Item key="saturn">Saturn</Item>
            <Item key="jupiter">Jupiter</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("tabindex", "0"));
});

test("a disabled item is tabbable", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Item disabled key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("tabindex", "0"));
});

test("when a menu have a single item selected, this item is tabbable", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu defaultSelectedKeys={["jupiter"]} aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("jupiter-item")).toHaveAttribute("tabindex", "0"));
});

test("when a menu have multiple selected items, the first selected item is tabbable", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu defaultSelectedKeys={["jupiter", "mars"]} selectionMode="multiple" aria-label="Planets">
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("jupiter-item")).toHaveAttribute("tabindex", "0"));
});

test("down arrow keypress moves focus to the next item", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.arrowDown });
    });

    await waitFor(() => expect(document.activeElement).toBe(getByTestId("jupiter-item")));
});

test("up arrow keypress moves focus to the previous item", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.arrowDown });
    });

    act(() => {
        fireEvent.keyDown(getByTestId("jupiter-item"), { key: Keys.arrowUp });
    });

    await waitFor(() => expect(document.activeElement).toBe(getByTestId("earth-item")));
});

test("home keypress move the focus to the first item", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.arrowDown });
    });

    act(() => {
        fireEvent.keyDown(getByTestId("jupiter-item"), { key: Keys.home });
    });

    await waitFor(() => expect(document.activeElement).toBe(getByTestId("earth-item")));
});

test("end keypress move the focus to the last item", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars" data-testid="mars-item">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.end });
    });

    await waitFor(() => expect(document.activeElement).toBe(getByTestId("mars-item")));
});

test("when selectionMode is \"none\", spacebar keypress don't toggle the item selection", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" selectionMode="none">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.space });
    });

    await waitFor(() => expect(getByTestId("earth-item")).not.toHaveAttribute("aria-checked"));
});

test("when selectionMode is \"none\", enter keypress don't toggle the item selection", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" selectionMode="none">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.enter });
    });

    await waitFor(() => expect(getByTestId("earth-item")).not.toHaveAttribute("aria-checked"));
});

test("when selectionMode is \"none\", mouse click doesn't toggle the item selection", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" selectionMode="none">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(getByTestId("earth-item")).not.toHaveAttribute("aria-checked"));
});

test("when selectionMode is \"single\", spacebar keypress toggle the item selection", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" selectionMode="single">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.space });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.space });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"single\", enter keypress toggle the item selection", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" selectionMode="single">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.enter });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.enter });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"single\", mouse click toggle the item selection", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" selectionMode="single">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"multiple\", spacebar keypress toggle the item selection", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" selectionMode="multiple">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.space });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.space });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"multiple\", enter keypress toggle the item selection", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" selectionMode="multiple">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        getByTestId("earth-item").focus();
    });

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.enter });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));

    act(() => {
        fireEvent.keyDown(getByTestId("earth-item"), { key: Keys.enter });
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when selectionMode is \"multiple\", mouse click toggle the item selection", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" selectionMode="multiple">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "false"));
});

test("when autofocus is true, the first menu item is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu autoFocus>
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveFocus());
});

test("when autofocus is true and the menu is disabled, the first item is not focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu disabled autoFocus>
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).not.toHaveFocus());
});

test("when autofocus is true and the menu have sections, the first menu item is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu autoFocus>
            <Section title="Visited">
                <Item key="earth" data-testid="earth-item">Earth</Item>
                <Item key="mars">Mars</Item>
                <Item key="saturn">Saturn</Item>
            </Section>
            <Section title="Not Visited">
                <Item key="jupiter">Jupiter</Item>
                <Item key="mercury">Mercury</Item>
                <Item key="neptune">Neptune</Item>
                <Item key="uranus">Uranus</Item>
            </Section>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveFocus());
});

test("when autofocus is true and there is a single default key, the menu item matching the default key is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu defaultSelectedKeys={["jupiter"]} autoFocus>
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("jupiter-item")).toHaveFocus());
});

test("when autofocus is true and there are multiple default keys, the menu item matching the first default key is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu defaultSelectedKeys={["jupiter", "mars"]} selectionMode="multiple" autoFocus>
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("jupiter-item")).toHaveFocus());
});

test("when autofocus is true and the default focus target is \"first\", the menu first item is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu defaultFocusTarget="first" autoFocus>
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveFocus());
});

test("when autofocus is true and the default focus target is \"last\", the menu last item is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu defaultFocusTarget="last" autoFocus>
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars" data-testid="mars-item">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("mars-item")).toHaveFocus());
});

test("when autofocus is true and the default focus target match an item key, the menu item matching the key is focused on render", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu defaultFocusTarget="jupiter" autoFocus>
            <Item key="earth">Earth</Item>
            <Item key="jupiter" data-testid="jupiter-item">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("jupiter-item")).toHaveFocus());
});

test("when autofocus is specified with a delay, the first menu item is focused after the delay", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu autoFocus={10}>
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    expect(getByTestId("earth-item")).not.toHaveFocus();

    await waitFor(() => expect(getByTestId("earth-item")).toHaveFocus());
});

// ***** Aria *****

test("when an id is provided, the menu id attribute match the provided id", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu id="foo" aria-label="Planets" data-testid="menu">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("menu")).toHaveAttribute("id", "foo"));
});

test("a menu role is \"menu\"", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" data-testid="menu">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("menu")).toHaveAttribute("role", "menu"));
});

test("menu aria-orientation is always \"vertical\"", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" data-testid="menu">
            <Item key="earth">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("menu")).toHaveAttribute("aria-orientation", "vertical"));
});

test("when selectionMode is \"none\", a menu item role is \"menuitem\"", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" selectionMode="none">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("role", "menuitem"));
});

test("when selectionMode is \"single\", a menu item role is \"menuitemradio\"", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" selectionMode="single">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("role", "menuitemradio"));
});

test("when selectionMode is \"multiple\", a menu item role is \"menuitemcheckbox\"", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets" selectionMode="multiple">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("role", "menuitemcheckbox"));
});

test("when a menu item is selected, aria-checked is \"true\"", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu defaultSelectedKeys={["earth"]} aria-label="Planets" selectionMode="single">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-checked", "true"));
});

test("when a menu item is disabled, aria-disabled is \"true\"", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Item disabled key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-disabled", "true"));
});

test("a menu item aria-labelledby match the menu item id", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Item id="earth-item" key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-labelledby", "earth-item-label"));
});

test("when a menu item have a description, the menu item aria-describedby match the description id", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Item id="earth-item" key="earth" data-testid="earth-item">
                <Text>Earth</Text>
                <Text slot="description">Is awesome!</Text>
            </Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("aria-describedby", "earth-item-description"));
});

test("when an id is provided to an item, it is used as the item id", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Item id="i-am-earth" key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("id", "i-am-earth"));
});

test("when no item id is provided, an item id is autogenerated", async () => {
    const { getByTestId } = renderWithTheme(
        <Menu aria-label="Planets">
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    await waitFor(() => expect(getByTestId("earth-item")).toHaveAttribute("id"));
});

// ***** Api *****

test("when selectionMode is \"none\", call onSelectionChange when a single item is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Menu
            selectionMode="none"
            onSelectionChange={handler}
            aria-label="Planets"
        >
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["earth"]));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("when selectionMode is \"single\", call onSelectionChange when a single item is selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Menu
            onSelectionChange={handler}
            selectionMode="single"
            aria-label="Planets"
        >
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars">Mars</Item>
        </Menu>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["earth"]));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

test("when selectionMode is \"multiple\", call onSelectionChange when multiple items are selected", async () => {
    const handler = jest.fn();

    const { getByTestId } = renderWithTheme(
        <Menu
            onSelectionChange={handler}
            selectionMode="multiple"
            aria-label="Planets"
        >
            <Item key="earth" data-testid="earth-item">Earth</Item>
            <Item key="jupiter">Jupiter</Item>
            <Item key="mars" data-testid="mars-item">Mars</Item>
        </Menu>
    );

    act(() => {
        userEvent.click(getByTestId("earth-item"));
    });

    act(() => {
        userEvent.click(getByTestId("mars-item"));
    });

    await waitFor(() => expect(handler).toHaveBeenLastCalledWith(expect.anything(), ["earth", "mars"]));
    await waitFor(() => expect(handler).toHaveBeenCalledTimes(2));
});

// ***** Refs *****

test("ref is a DOM element", async () => {
    const ref = createRef<HTMLElement>();

    renderWithTheme(
        <Menu ref={ref} >
            <Item key="jupiter">Jupiter</Item>
        </Menu>
    );

    await waitFor(() => expect(ref.current).not.toBeNull());

    await waitFor(() => expect(ref.current instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(ref.current.tagName).toBe("UL"));
});

test("when using a callback ref, ref is a DOM element", async () => {
    let refNode: HTMLElement = null;

    renderWithTheme(
        <Menu
            ref={node => {
                refNode = node;
            }}
        >
            <Item key="jupiter">Jupiter</Item>
        </Menu>
    );

    await waitFor(() => expect(refNode).not.toBeNull());

    await waitFor(() => expect(refNode instanceof HTMLElement).toBeTruthy());
    await waitFor(() => expect(refNode.tagName).toBe("UL"));
});

test("set ref once", async () => {
    const handler = jest.fn();

    renderWithTheme(
        <Menu ref={handler} >
            <Item key="jupiter">Jupiter</Item>
        </Menu>
    );

    await waitFor(() => expect(handler).toHaveBeenCalledTimes(1));
});

