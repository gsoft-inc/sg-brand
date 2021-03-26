import "./Select.css";

import { ChevronIcon } from "../../icons";
import { DisclosureArrow } from "../../disclosure";
import { HiddenSelect } from "./HiddenSelect";
import { Listbox } from "../../listbox";
import { Overlay } from "../../overlay";
import { Text } from "../../text";
import { any, bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { arrayOf } from "prop-types";
import { augmentElement, cssModule, mergeClasses, mergeProps } from "../../shared";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { useFieldInputProps } from "../../field";
import { useSelect } from "./useSelect";

const propTypes = {
    /**
     * Whether or not to open the select element.
     */
    open: bool,
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen: bool,
    /**
     * A controlled selected key.
     */
    selectedKey: string,
    /**
     * The initial value of `selectedKey` when uncontrolled.
     */
    defaultSelectedKey: string,
    /**
     * Temporary text that occupies the select trigger when no value is selected.
     */
    placeholder: string,
    /**
     * Items to render.
     */
    items: arrayOf(object),
    /**
     * Whether or not a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether or not the select should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the select value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string} selectedKey - The new selected key.
     * @returns {void}
     */
    onSelectionChange: func,
    /**
     * Called when the select open state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {boolean} isOpen - Indicate if the menu is open.
     * @returns {void}
     */
    onOpenChange: func,
    /**
     * The style to use.
     */
    variant: oneOf(["outline", "ghost"]),
    /**
     * A trigger icon.
     */
    icon: element,
    /**
     * The direction the select menu will open relative to the input.
     */
    direction: oneOf(["bottom", "top"]),
    /**
     * The horizontal alignment of the select menu relative to the input.
     */
    align: oneOf(["start", "end"]),
    /**
     * Whether or not the select should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the select take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not the select is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the select menu can flip when it will overflow it's boundary area.
     */
    allowFlip: bool,
    /**
     * Whether or not the selection menu position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow: bool,
    /**
     * z-index of the overlay element.
     */
    zIndex: number,
    /**
     * Additional props to render on the menu of options.
     */
    menuProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerSelect(props) {
    const [fieldProps] = useFieldInputProps();

    const {
        id,
        open,
        defaultOpen,
        selectedKey: selectedKeyProp,
        defaultSelectedKey,
        placeholder,
        items,
        required,
        validationState,
        onSelectionChange,
        onOpenChange,
        variant = "outline",
        icon,
        direction = "bottom",
        align = "start",
        autoFocus,
        name,
        fluid,
        disabled,
        allowFlip = true,
        allowPreventOverflow = true,
        zIndex,
        active,
        focus,
        hover,
        "aria-label": ariaLabel,
        // Usually provided by the field inputs.
        "aria-labelledby": ariaLabelledBy,
        "aria-describedby": ariaDescribedBy,
        menuProps,
        as: TriggerType = "button",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        fieldProps
    );

    const { selectedKey, selectedItem, isOpen, triggerProps, overlayProps, listboxProps } = useSelect(children, {
        id,
        open,
        defaultOpen,
        selectedKey: selectedKeyProp,
        defaultSelectedKey,
        items,
        onSelectionChange,
        onOpenChange,
        direction,
        align,
        autoFocus,
        disabled,
        allowFlip,
        allowPreventOverflow,
        allowResponsiveMenuWidth: variant !== "ghost",
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
        menuProps,
        ref: forwardedRef
    });

    const iconMarkup = icon && augmentElement(icon, {
        className: "o-ui-select-icon",
        size: "sm"
    });

    const selectedIconMarkup = selectedItem?.icon && augmentElement(selectedItem.icon, {
        size: "sm",
        className: "o-ui-select-value-start-icon"
    });

    const selectedTextMarkup = selectedItem?.text && (
        <Text className="o-ui-select-value-text">
            {selectedItem.text}
        </Text>
    );

    const selectedEndIconMarkup = selectedItem?.endIcon && augmentElement(selectedItem.endIcon, {
        size: "sm",
        className: "o-ui-select-value-end-icon"
    });

    const valueMarkup = isNil(selectedItem)
        ? placeholder && (
            <Text className="o-ui-select-placeholder">{placeholder}</Text>
        )
        : (
            <span className="o-ui-select-value">
                {selectedIconMarkup}
                {selectedTextMarkup}
                {selectedEndIconMarkup}
            </span>
        );

    return (
        <>
            <HiddenSelect
                name={name}
                selectedKey={selectedKey}
                required={required}
                validationState={validationState}
                disabled={disabled}
            />
            <TriggerType
                {...mergeProps(
                    rest,
                    {
                        className: cssModule(
                            "o-ui-select-trigger",
                            variant,
                            validationState,
                            fluid && "fluid",
                            active && "active",
                            focus && "focus",
                            hover && "hover"
                        )
                    },
                    triggerProps
                )}
            >
                {iconMarkup}
                {valueMarkup}
                <DisclosureArrow
                    open={isOpen}
                    size="sm"
                />
            </TriggerType>
            <Overlay
                {...overlayProps}
                zIndex={zIndex}
            >
                <Listbox {...listboxProps} />
            </Overlay>
        </>
    );
}

InnerSelect.propTypes = propTypes;

export const Select = forwardRef((props, ref) => (
    <InnerSelect {...props} forwardedRef={ref} />
));

Select.displayName = "Select";
