import "./DateInput.css";

import { Box, BoxProps as BoxPropsForDocumentation } from "../../box";
import { ButtonPresets } from "./ButtonPresets";
import {
    ChangeEvent,
    ChangeEventHandler,
    ComponentProps,
    SyntheticEvent,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef
} from "react";
import { InputGroup, useInputGroupProps } from "../../input-group";
import {
    InteractionProps,
    InternalProps,
    OmitInternalProps,
    augmentElement,
    cssModule,
    isNil,
    mergeClasses,
    mergeProps,
    useControllableState,
    useEventCallback
} from "../../shared";
import { MenuPresets } from "./MenuPresets";
import { TextInput } from "../../text-input";
import { areEqualDates, toMidnightDate } from "./date-utils";
import { useDateInput } from "./useDateInput";
import { wrappedInputPropsAdapter } from "../../input";

// Used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

export interface DatePreset {
    date: Date;
    text: string;
}

export interface InnerDateInputProps extends InternalProps, InteractionProps, Omit<ComponentProps<"input">, "autoFocus" | "defaultValue" | "max" | "min" | "value"> {
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * @ignore
     */
    className?: string;
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: Date;
    /**
     * @ignore
     */
    disabled?: boolean;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * The maximum (inclusive) date.
     */
    max?: Date;
    /**
     * The minimum (inclusive) date.
     */
    min?: Date;
    /**
     * @ignore
     */
    onChange?: ChangeEventHandler;
    /**
     * Called when the date change.
     * @param {ChangeEvent} event - React's original synthetic event.
     * @param {object} date - The new date value.
     * @returns {void}
     */
    onDateChange?: (event: ChangeEvent<HTMLInputElement>, date: Date) => void;
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder?: string;
    /**
     * Array of pre-determined dates.
     */
    presets?: DatePreset[];
    /**
     * The presets style to use.
     */
    presetsVariant?: "compact" | "expanded";
    /**
     * Whether or not the input is readonly.
     */
    readOnly?: boolean;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * A controlled value.
     */
    value?: Date | null;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
}

const Input = forwardRef<any, any>((props, ref) => {
    const [inputGroupProps, isInGroup] = useInputGroupProps();

    const {
        className,
        max,
        min,
        onChange,
        onDateChange,
        style,
        value,
        wrapperProps,
        ...rest
    } = mergeProps(
        props,
        wrappedInputPropsAdapter(inputGroupProps)
    );

    const dateProps = useDateInput({
        forwardedRef: ref,
        max,
        min,
        onChange,
        onDateChange,
        value
    });

    return (
        <TextInput
            {...mergeProps(
                rest,
                {
                    wrapperProps: mergeProps(
                        wrapperProps ?? {},
                        {
                            className: mergeClasses(
                                className,
                                cssModule(
                                    "o-ui-date-input",
                                    isInGroup && "in-group"
                                )
                            ),
                            style
                        }
                    )
                },
                dateProps
            )}
        />
    );
});

export function InnerDateInput({
    as,
    className,
    defaultValue,
    disabled,
    fluid,
    forwardedRef,
    onDateChange,
    placeholder = "dd/mm/yyyy",
    presets,
    presetsVariant = "compact",
    readOnly,
    style,
    value: valueProp,
    wrapperProps,
    ...rest
}: InnerDateInputProps) {
    const [value, setValue] = useControllableState(valueProp, defaultValue, null);

    const containerRef = useRef<HTMLElement>();
    const inputRef = useRef<HTMLInputElement>();

    useImperativeHandle(forwardedRef, () => {
        // For presets, used the group container as the ref element.
        if (!isNil(presets)) {
            const element = containerRef.current;

            element.focus = () => {
                inputRef.current?.focus();
            };

            return element;
        }

        return inputRef.current;
    });

    const applyDate = useCallback((event, newDate) => {
        if (!areEqualDates(value, newDate)) {
            setValue(newDate);

            if (!isNil(onDateChange)) {
                onDateChange(event, newDate);
            }
        }
    }, [onDateChange, value, setValue]);

    const handleDateChange = useEventCallback((event, newDate) => {
        applyDate(event, newDate);
    });

    const handleSelectPreset = useEventCallback((event: SyntheticEvent, newIndex: number) => {
        const preset = presets[newIndex];

        if (!isNil(preset)) {
            applyDate(event, preset.date);
        }
    });

    const presetsProps = useMemo(() => {
        if (!isNil(presets)) {
            const selectedIndex = presets.findIndex(x => areEqualDates(toMidnightDate(x.date), toMidnightDate(value)));

            return {
                onSelectionChange: handleSelectPreset,
                selectedIndex: selectedIndex !== -1 ? selectedIndex : undefined,
                values: presets.map(x => x.text)
            };
        }

        return null;
    }, [presets, value, handleSelectPreset]);

    const inputMarkup = (
        <Input
            {...mergeProps(
                rest,
                {
                    onDateChange: handleDateChange,
                    placeholder,
                    ref: inputRef,
                    value
                }
            )}
        />
    );

    if (!isNil(presetsProps)) {
        return presetsVariant === "compact"
            ?
            (
                <InputGroup
                    {...mergeProps(
                        {
                            as,
                            className,
                            disabled,
                            fluid,
                            readOnly,
                            ref: containerRef,
                            style
                        } as const,
                        wrapperProps ?? {}
                    )}
                >
                    {inputMarkup}
                    <MenuPresets {...presetsProps} />
                </InputGroup>
            )
            : (
                <Box
                    {...mergeProps(
                        {
                            as,
                            className: mergeClasses(
                                className,
                                cssModule(
                                    "o-ui-date-input-button-presets",
                                    fluid && "fluid"
                                )
                            ),
                            ref: containerRef,
                            style
                        },
                        wrapperProps ?? {}
                    )}
                >
                    {inputMarkup}
                    {!disabled && !readOnly && (
                        <ButtonPresets {...presetsProps} />
                    )}
                </Box>
            );
    }

    // A fragment is wrapping the result to make this component work with react-docgen: https://github.com/reactjs/react-docgen/issues/336
    return (
        <>
            {augmentElement(inputMarkup, {
                as,
                className,
                disabled,
                fluid,
                readOnly,
                style,
                wrapperProps
            })}
        </>
    );
}

export const DateInput = forwardRef<HTMLInputElement, OmitInternalProps<InnerDateInputProps>>((props, ref) => (
    <InnerDateInput {...props} forwardedRef={ref} />
));

export type DateInputProps = ComponentProps<typeof DateInput>;
