import { AddIcon24, MagnifierIcon } from "@orbit-ui/icons";
import { ArgumentError, DOMEventListener, KEYS, mergeClasses } from "@orbit-ui/react-components-shared";
import { MonkeyPatchDropdown } from "./monkey-patch-dropdown";
import { MultiSelectDropdownMenu } from "./multi-select-dropdown-menu";
import { MultiSelectDropdownSearchInput } from "./multi-select-dropdown-search-input";
import { MultiSelectDropdownTrigger } from "./multi-select-dropdown-trigger";
import { PureComponent, cloneElement, createRef } from "react";
import { Ref } from "semantic-ui-react";
import { arrayOf, bool, func, node, number, shape, string } from "prop-types";
import { debounce, isFunction, isNil } from "lodash";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the preset will not render properly in the docs.
const ITEM_SHAPE = {
    text: string.isRequired,
    value: string.isRequired
};

function defaultItemRenderer(item, isSelected) {
    return <MonkeyPatchDropdown.Item text={item.text} value={item.value} selected={isSelected} data-testid="multi-select-dropdown-item" />;
}

function defaultHeaderRenderer(group) {
    return <MonkeyPatchDropdown.Header content={group} />;
}

export class MultiSelectDropdown extends PureComponent {
    static propTypes = {
        /**
         * Array of items.
         */
        items: arrayOf(shape(ITEM_SHAPE)),
        /**
         * Called when an item is selected.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Item} item - Selected item.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onItemSelect: func,
        /**
         * Called when the search input change.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {string} query - Search query.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onSearch: func,
        /**
         * Called when an open event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onOpen: func,
        /**
         * Called when a close event happens.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @param {Object} props - All the props.
         * @returns {void}
         */
        onClose: func,
        /**
         * Render an item.
         * @param {Item} item - Item to render.
         * @param {boolean} isSelected - Whether or not the item is selected.
         * @param {Object} props - All the props.
         * @returns {ReactElement} - React element to render.
         */
        itemRenderer: func,
        /**
         * Render an header (also called a category).
         * @param {string} text - Header text.
         * @param {Item[]} items - Items under the header.
         * @param {Object} props - All the props.
         * @returns {ReactElement} - React element to render.
         */
        headerRenderer: func,
        /**
         * Whether or not the dropdown should close when an item is selected.
         */
        closeOnSelect: bool,
        /**
         * Delay before initiating a search when the query change.
         */
        debounceDelay: number,
        /**
         * Message to display when there are no items matching the query.
         */
        noResultsMessage: string,
        /**
         * A custom React component that open the dropdown.
         */
        trigger: node,
        /**
         * The trigger text.
         */
        triggerText: string,
        /**
         * A custom React SVG component displayed before the trigger text.
         */
        triggerIcon: node,
        /**
         * A custom React SVG component displayed before the trigger text when the multi-select is disabled.
         */
        triggerDisabledIcon: node,
        /**
         * A custom React component to display the items.
         */
        menu: node,
        /**
         * A custom React component to enter a query.
         */
        searchInput: node,
        /**
         * A custom React SVG component displayed before the search input query.
         */
        searchIcon: node,
        /**
         * The search input placeholder text.
         */
        placeholder: string,
        /**
         * A controlled open value that determined whether or not the dropdown is displayed.
         */
        open: bool,
        /**
         * A disabled dropdown does not allow user interaction.
         */
        disabled: bool,
        /**
         * Whether or not the dropdown should close when multi-select loose focus.
         */
        closeOnBlur: bool,
        /**
         * Whether or not the dropdown should close when a click happens outside the multi-select.
         * Requires `closeOnBlur` to be `false`.
         */
        closeOnOutsideClick: bool,
        /**
         * Additional classes.
         */
        className: string
    };

    static defaultProps = {
        debounceDelay: 200,
        itemRenderer: defaultItemRenderer,
        headerRenderer: defaultHeaderRenderer,
        menu: <MultiSelectDropdownMenu />,
        trigger: <MultiSelectDropdownTrigger />,
        triggerIcon: <AddIcon24 className="w6 h6 fill-marine-700 ml1" />,
        triggerDisabledIcon: <AddIcon24 className="w6 h6 fill-marine-700 ml1" />,
        searchInput: <MultiSelectDropdownSearchInput />,
        searchIcon: <MagnifierIcon className="w7 h7 fill-marine-500" />,
        closeOnBlur: true,
        closeOnOutsideClick: false
    };

    state = {
        keyboardItem: null,
        keyboardIndex: null
    };

    _triggerRef = createRef();
    _dropdownRef = createRef();

    // Using a focus / unfocus flag was not the preferred way to prevent the dropdown from closing on blur when the new focused item was inside the dropdown.
    // The first attempt has been to use a setTimeout in pair with the document.activeElement. The setTimeout ensured that the new focused element was set to
    // with document.activeElement. This was working well in the browser.
    //
    // However, our interaction tests rely on jsdom and jsdom support for document.activementElement is not reliable (in fact, it doesn't have the same behavior
    // as browsers).
    //
    // The fallback is to use this _hasFocus flag. The idea is that when the focusout event pop, we wait for a tick (with a setTimeout) and if _hasFocus is false
    // after that tick, it means that the new focused element is not inside the dropdown and we can safely close the dropdown.
    //
    // Did I mention focusout instead of blur? We add to use a combination of focusin / focusout instead of focus / blur because focus and blur doesn't bubbles.
    // This means that when a child of the dropdown is focus / blur the parent is not notified.
    _hasFocus = false;

    componentDidUpdate(prevProps) {
        const { items, closeOnBlur, closeOnOutsideClick } = this.props;

        if (closeOnBlur && closeOnOutsideClick) {
            throw new ArgumentError("MultiSelect - The \"closeOnBlur\" and \"closeOnOutsideClick\" props cannot be both \"true\".");
        }

        if (prevProps.items !== items) {
            this.setKeyboardItem(null, null);
        }
    }

    componentWillUnmount() {
        this.cancelOnSearchDebounce();
    }

    handleDocumentKeyDown = event => {
        switch (event.keyCode) {
            case KEYS.esc:
                this.handleDocumentEscape(event);
                break;
            case KEYS.enter:
                this.handleDocumentEnter(event);
                break;
            case KEYS.up:
                this.handleDocumentUp(event);
                break;
            case KEYS.down:
                this.handleDocumentDown(event);
                break;
        }
    };

    handleDocumentEscape = event => {
        this.close(event);
    };

    handleDocumentEnter = event => {
        const { keyboardItem } = this.state;

        if (!isNil(keyboardItem)) {
            this.selectItem(event, keyboardItem);
        }
    };

    handleDocumentUp = () => {
        const { items } = this.props;
        const { keyboardIndex } = this.state;

        if (items.length > 0) {
            if (!isNil(keyboardIndex)) {
                if (keyboardIndex > 0) {
                    const newKeyboardIndex = keyboardIndex - 1;

                    this.setKeyboardItem(items[newKeyboardIndex], newKeyboardIndex);
                }
            }
        }
    };

    handleDocumentDown = () => {
        const { items } = this.props;
        const { keyboardIndex } = this.state;

        if (items.length > 0) {
            if (isNil(keyboardIndex)) {
                this.setKeyboardItem(items[0], 0);
            } else {
                if (keyboardIndex < items.length - 1) {
                    const newKeyboardIndex = keyboardIndex + 1;

                    this.setKeyboardItem(items[newKeyboardIndex], newKeyboardIndex);
                }
            }
        }
    };

    handleDropdownFocusIn = () => {
        this._hasFocus = true;
    };

    // Closing the dropdown on blur will:
    // - close on outside click
    // - close on blur
    handleDropdownFocusOut = event => {
        const { closeOnBlur } = this.props;

        this._hasFocus = false;

        if (closeOnBlur) {
        // The check is delayed because between leaving the old element and entering the new element the active element will always be the document/body itself.
            setTimeout(() => {
                if (!this._hasFocus) {
                    this.close(event);
                }
            }, 0);
        }
    };

    handleDocumentClick = event => {
        const { closeOnOutsideClick } = this.props;

        if (closeOnOutsideClick) {
            if (this._dropdownRef.current) {
                if (!this._dropdownRef.current.contains(event.target)) {
                    this.close(event);
                }
            }
        }
    };

    handleTriggerOpen = event => {
        this.open(event);
    }

    handleTriggerClose = event => {
        this.close(event);
    }

    handleSearchChange = (event, query) => {
        this.onSearch(event, query, this.props);
    };

    handleItemClick = (event, item) => {
        this.selectItem(event, item, this.props);
    };

    onSearch = this.props.debounceDelay !== 0 ? debounce(this.props.onSearch, this.props.debounceDelay) : this.props.onSearch;

    cancelOnSearchDebounce() {
        if (isFunction(this.onSearch.cancel)) {
            this.onSearch.cancel();
        }
    }

    open(event) {
        const { onOpen } = this.props;

        this.setKeyboardItem(null, null);

        onOpen(event, this.props);
    }

    close(event) {
        const { onClose } = this.props;

        setTimeout(() => {
            if (!isNil(this._triggerRef.current)) {
                this._triggerRef.current.focus();
            }
        }, 0);

        onClose(event, this.props);
    }

    setKeyboardItem(item, index) {
        this.setState({ keyboardItem: item, keyboardIndex: index });
    }

    selectItem(event, item) {
        const { items, onItemSelect, closeOnSelect } = this.props;

        if (closeOnSelect || items.length === 1) {
            this.close(event);
        }

        // Defering onItemSelect ensure that document click has already been handled and the dropdown is not closed because the item is not part of the menu anymore.
        setTimeout(() => {
            const selectedItem = items.find(x => x.value === item.value);

            onItemSelect(event, selectedItem, this.props);
        }, 0);
    }

    getClasses() {
        const { className } = this.props;

        return mergeClasses(
            "no-icons",
            className
        );
    }

    renderTrigger = () => {
        const { trigger, triggerText, triggerIcon, triggerDisabledIcon, open, disabled } = this.props;

        return cloneElement(trigger, {
            onOpen: this.handleTriggerOpen,
            onClose: this.handleTriggerClose,
            text: triggerText,
            icon: triggerIcon,
            disabledIcon: triggerDisabledIcon,
            open,
            disabled,
            ref: this._triggerRef
        });
    };

    renderSearchInput = () => {
        const { searchInput, searchIcon, placeholder } = this.props;

        return cloneElement(searchInput, {
            key: "search-input",
            onChange: this.handleSearchChange,
            icon: searchIcon,
            placeholder
        });
    };

    renderMenu = () => {
        const { menu, items, itemRenderer, headerRenderer, noResultsMessage } = this.props;
        const { keyboardItem } = this.state;

        return cloneElement(menu, {
            items: items,
            onItemClick: this.handleItemClick,
            itemRenderer,
            headerRenderer,
            searchInput: this.renderSearchInput(),
            noResultsMessage,
            keyboardItem
        });
    };

    render() {
        const { open, disabled } = this.props;

        return (
            <>
                <Ref innerRef={this._dropdownRef}>
                    <MonkeyPatchDropdown
                        open={open}
                        trigger={this.renderTrigger()}
                        disabled={disabled}
                        // Otherwise the "listbox" div will be focus first instead of the trigger button.
                        tabIndex="-1"
                        upward={false}
                        floating
                        className={this.getClasses()}
                    >
                        <If condition={open}>
                            {this.renderMenu()}
                        </If>
                    </MonkeyPatchDropdown>
                </Ref>

                <If condition={open}>
                    <DOMEventListener name="keydown" on={this.handleDocumentKeyDown} />
                    <DOMEventListener name="click" on={this.handleDocumentClick} />
                    <DOMEventListener target={this._dropdownRef} name="focusin" on={this.handleDropdownFocusIn} />
                    <DOMEventListener target={this._dropdownRef} name="focusout" on={this.handleDropdownFocusOut} />
                </If>
            </>
        );
    }
}
