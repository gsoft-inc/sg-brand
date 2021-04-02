import "./DateInput.css";

import { BoxProps } from "../../box";
import { CalendarIcon } from "../../icons";
import { ComponentProps, ElementType, ForwardedRef, SyntheticEvent } from "react";
import { TextInput } from "../../text-input";
import { forwardRef, mergeProps } from "../../shared";
import { useDateInput } from "./useDateInput";

export interface InnerDateInputProps {
    /**
     * A controlled value.
     */
    value?: Date,
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: Date,
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder?: string,
    /**
     * The minimum (inclusive) date.
     */
    minDate?: Date,
    /**
     * The maximum (inclusive) date.
     */
    maxDate?: Date,
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange?(event: SyntheticEvent): void,
    /**
     * Called when the date change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} date - The new date value.
     * @returns {void}
     */
    onDateChange?(event: SyntheticEvent, date: Date): void,
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>
}

export function InnerDateInput({
    value,
    defaultValue,
    minDate,
    maxDate,
    onChange,
    onDateChange,
    wrapperProps,
    as = "input",
    forwardedRef,
    ...rest
}: InnerDateInputProps) {

    const dateProps = useDateInput({
        value,
        defaultValue,
        minDate,
        maxDate,
        onChange,
        onDateChange,
        forwardedRef
    });

    return (
        <TextInput
            {...mergeProps(
                rest,
                {
                    icon: <CalendarIcon />,
                    wrapperProps: mergeProps(
                        wrapperProps ?? {},
                        {
                            className: "o-ui-date-input"
                        }
                    ),
                    as
                },
                dateProps
            )}
        />
    );
}

export const DateInput = forwardRef<InnerDateInputProps, "input">((props, ref) => (
    <InnerDateInput {...props} forwardedRef={ref} />
));

export type DateInputProps = ComponentProps<typeof DateInput>

DateInput.displayName = "DateInput";