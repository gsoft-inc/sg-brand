import "./Tabs.css";

import { Box, BoxProps } from "../../box";
import { Keys, mergeProps, useAutoFocusChild, useFocusManager, useFocusScope, useKeyboardNavigation, useKeyedRovingFocus } from "../../shared";
import { Tab } from "./Tab";
import { TabType } from "./useTabsItems";
import { isNumber } from "lodash";
import { useTabsContext } from "./TabsContext";

const NavigationKeyBinding = {
    horizontal: {
        previous: [Keys.arrowLeft],
        next: [Keys.arrowRight],
        first: [Keys.home],
        last: [Keys.end]
    },
    vertical: {
        previous: [Keys.arrowUp],
        next: [Keys.arrowDown],
        first: [Keys.home],
        last: [Keys.end]
    }
};

const KeyProp = "data-o-ui-index";

export interface TabListProps extends Omit<BoxProps, "autofocus"> {
    autoFocus?: boolean | number;
    tabs?: TabType[];
}

export function TabList({
    tabs,
    autoFocus,
    ...rest
}: TabListProps) {
    const { selectedIndex, orientation } = useTabsContext();

    const [focusScope, setFocusRef] = useFocusScope();

    const focusManager = useFocusManager(focusScope, { keyProp: KeyProp });

    useKeyedRovingFocus(focusScope, selectedIndex, { keyProp: KeyProp });

    useAutoFocusChild(focusManager, {
        target: selectedIndex,
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const navigationProps = useKeyboardNavigation(focusManager, NavigationKeyBinding[orientation]);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-tab-list",
                    role: "tablist",
                    "aria-orientation": orientation,
                    ref: setFocusRef
                },
                navigationProps
            )}
        >
            {tabs.map(({
                id,
                key,
                position,
                elementType: ElementType = Tab,
                ref,
                panelId,
                props
            }) =>
                <ElementType
                    {...props}
                    tab={{
                        index: position,
                        panelId
                    }}
                    id={id}
                    key={key}
                    ref={ref}
                />
            )}
        </Box>
    );
}

