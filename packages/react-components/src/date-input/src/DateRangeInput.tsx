import "./DateRangeInput.css";

import { Box } from "../../box";
import { ButtonPresets } from "./ButtonPresets";
import {
    ChangeEvent,
    ComponentProps,
    ElementType,
    FocusEvent,
    FocusEventHandler,
    ForwardedRef,
    KeyboardEvent,
    SyntheticEvent,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState
} from "react";
import { ClearInputGroupContext, InputGroup, useInputGroupProps } from "../../input-group";
import { CrossButton } from "../../button";
import { DateInputMask, useDateInput } from "./useDateInput";
import { Divider } from "../../divider";
import {
    InteractionStatesProps,
    Keys,
    augmentElement,
    cssModule,
    isNil,
    isNilOrEmpty,
    isNumber,
    mergeProps,
    omitProps,
    useAutoFocus,
    useControllableState,
    useDisposables,
    useEventCallback,
    useFocusWithin,
    useMergedRefs
} from "../../shared";
import { MenuPresets } from "./MenuPresets";
import { areEqualDates, toMidnightDate } from "./date-utils";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

export interface DateRangePreset {
    text: string;
    startDate: Date;
    endDate: Date;
}

const defaultElement = "div";

export interface InnerDateRangeInputProps extends InteractionStatesProps, ComponentProps<typeof defaultElement> {
    /**
     * @ignore
     */
    name?: string;
    /**
     * A controlled start date value.
     */
    startDate?: Date | null;
    /**
     * A controlled end date value.
     */
    endDate?: Date | null;
    /**
     * The initial value of start date.
     */
    defaultStartDate?: Date;
    /**
     * The initial value of end date.
     */
    defaultEndDate?: Date;
    /**
     * Temporary text that occupies both date inputs when they are empty.
     */
    placeholder?: string;
    /**
     * The minimum (inclusive) date.
     */
    min?: Date;
    /**
     * The maximum (inclusive) date.
     */
    max?: Date;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the date(s) are / is applied.
     * @param {SyntheticEvent} event - React's original event.
     * @param {Object} startDate - Selected start date.
     * @param {Object} endDate - Selected end date.
     * @returns {void}
     */
    onDatesChange?: (event: SyntheticEvent, startDate: Date, endDate: Date) => void;
    /**
     * @ignore
     */
    onFocus?: FocusEventHandler;
    /**
     * @ignore
     */
    onBlur?: FocusEventHandler;
    /**
     * Array of pre-determined dates range.
     */
    presets?: DateRangePreset[];
    /**
     * The presets style to use.
     */
    presetsVariant?: "compact" | "expanded";
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Whether or not the input is readonly.
     */
    readOnly?: boolean;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

const DateInput = forwardRef<HTMLInputElement, any>(({
    value,
    placeholder = "dd/mm/yyyy",
    required,
    validationState,
    min,
    max,
    onChange,
    onDateChange,
    autoFocus,
    disabled,
    readOnly,
    ...rest
}, ref) => {
    const inputRef = useMergedRefs(ref);

    useAutoFocus(inputRef, {
        isDisabled: !autoFocus || disabled || readOnly,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const dateProps = useDateInput({
        value,
        min,
        max,
        onChange,
        onDateChange,
        forwardedRef: inputRef
    });

    return (
        <input
            {...mergeProps(
                rest,
                {
                    placeholder,
                    className: "o-ui-date-range-input-date-input",
                    type: "text",
                    disabled,
                    readOnly,
                    "aria-required": required ? true : undefined,
                    "aria-invalid": validationState === "invalid" ? true : undefined,
                    ref: inputRef
                },
                dateProps
            )}
        />
    );
});

const RangeInput = forwardRef<any, any>((props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, isInField] = useFieldInputProps();
    const [inputGroupProps, isInGroup] = useInputGroupProps();

    const {
        startDate,
        endDate,
        placeholder,
        min,
        max,
        required,
        validationState,
        onDatesChange,
        onFocus,
        onBlur,
        autoFocus,
        fluid,
        disabled,
        readOnly,
        active,
        focus = false,
        hover,
        name,
        ...rest
    } = mergeProps(
        props,
        inputGroupProps
    );

    const [hasFocus, setHasFocus] = useState(focus);

    const containerRef = useRef<HTMLElement>();
    const startDateRef = useRef<HTMLInputElement>();
    const endDateRef = useRef<HTMLInputElement>();

    const disposables = useDisposables();

    useImperativeHandle(ref, () => {
        const element = containerRef.current;

        element.focus = () => {
            startDateRef.current?.focus();
        };

        return element;
    });

    const handleStartDateChange = useEventCallback((event: ChangeEvent<HTMLInputElement>, newDate) => {
        if (!isNil(newDate) && !isNil(endDate) && newDate > endDate) {
            newDate = endDate;
        }

        if (!isNil(onDatesChange)) {
            onDatesChange(event, newDate, endDate);
        }
    });

    const handleEndDateChange = useEventCallback((event: ChangeEvent<HTMLInputElement>, newDate) => {
        if (!isNil(newDate) && !isNil(startDate) && newDate < startDate) {
            newDate = startDate;
        }

        if (!isNil(onDatesChange)) {
            onDatesChange(event, startDate, newDate);
        }
    });

    const handleStartDateInputValueChange = useEventCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === DateInputMask.length) {
            // Defering because useDateInput is used in controlled mode and otherwise the value will not be updated when the value is clamped.
            disposables.requestAnimationFrame(() => {
                endDateRef.current?.focus();
            });
        }
    });

    const handleEndDateInputValueChange = useEventCallback((event: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const newCharacter = event.nativeEvent.data;

        // If the new character is not a digit, we don't want to do anything since the new character will be removed by the mask input.
        // The digit is test with a regex because this is how our mask input third party is doing it and we want to be consistant.
        if (/\d/.test(newCharacter)) {
            if (isNilOrEmpty(event.target.value)) {
                startDateRef.current?.focus();
            }
        }
    });

    const handleClearDates = useEventCallback((event: SyntheticEvent) => {
        // Deferring because otherwise the start date will not be blured which might result in not clearing the input properly.
        disposables.requestAnimationFrame(() => {
            startDateRef?.current.focus();
        });

        if (!isNil(onDatesChange)) {
            onDatesChange(event, null, null);
        }
    });

    const handleContainerKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.esc) {
            event.preventDefault();
            handleClearDates(event);
        }
    });

    const handleEndDateKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.backspace) {
            if (isNilOrEmpty(endDateRef.current?.value)) {
                startDateRef.current?.focus();
            }
        }
    });

    const focusWithinProps = useFocusWithin({
        onFocus: useEventCallback((event: FocusEvent) => {
            setHasFocus(true);

            if (!isNil(onFocus)) {
                onFocus(event);
            }
        }),
        onBlur: useEventCallback((event: FocusEvent) => {
            setHasFocus(false);

            if (!isNil(onBlur)) {
                onBlur(event);
            }
        })
    });

    const hasValue = !isNil(startDate) || !isNil(endDate);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    onKeyDown: handleContainerKeyDown,
                    className: cssModule(
                        "o-ui-date-range-input",
                        validationState,
                        fluid && "fluid",
                        disabled && "disabled",
                        readOnly && "readonly",
                        active && "active",
                        hasFocus && "focus",
                        hover && "hover",
                        isInGroup && "in-group"
                    ),
                    role: !isInField ? "group" : undefined,
                    ref: containerRef
                },
                focusWithinProps
            )}
        >
            <DateInput
                value={startDate}
                placeholder={placeholder}
                required={required}
                validationState={validationState}
                min={min}
                max={max}
                onChange={handleStartDateInputValueChange}
                onDateChange={handleStartDateChange}
                autoFocus={autoFocus}
                disabled={disabled}
                readOnly={readOnly}
                name={!isNil(name) ? `${name}-start-date` : undefined}
                ref={startDateRef}
            />
            <Divider orientation="vertical" className="o-ui-date-range-input-divider" />
            <DateInput
                value={endDate}
                placeholder={placeholder}
                required={required}
                validationState={validationState}
                min={min}
                max={max}
                onChange={handleEndDateInputValueChange}
                onDateChange={handleEndDateChange}
                onKeyDown={handleEndDateKeyDown}
                disabled={disabled}
                readOnly={readOnly}
                name={!isNil(name) ? `${name}-end-date` : undefined}
                tabIndex={hasFocus ? 0 : -1}
                ref={endDateRef}
            />
            {hasValue && !disabled && !readOnly &&
                <ClearInputGroupContext>
                    <CrossButton
                        onClick={handleClearDates}
                        size="xs"
                        condensed
                        className="o-ui-date-range-input-clear-button"
                        aria-label="Clear dates"
                    />
                </ClearInputGroupContext>}
        </Box>
    );
});

export function InnerDateRangeInput(props: InnerDateRangeInputProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps] = useFieldInputProps();
    const [inputGroupProps, isInGroup] = useInputGroupProps();

    const {
        startDate: startDateProp,
        endDate: endDateProp,
        defaultStartDate,
        defaultEndDate,
        placeholder,
        min,
        max,
        required,
        validationState,
        onDatesChange,
        onFocus,
        onBlur,
        presets,
        presetsVariant = "compact",
        autoFocus,
        fluid,
        disabled,
        readOnly,
        active,
        focus = false,
        hover,
        name,
        as = defaultElement,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        fieldProps,
        inputGroupProps
    );

    const [startDate, setStartDate] = useControllableState(startDateProp, defaultStartDate, null);
    const [endDate, setEndDate] = useControllableState(endDateProp, defaultEndDate, null);

    const containerRef = useRef<HTMLElement>();
    const rangeRef = useRef<HTMLInputElement>();

    useImperativeHandle(forwardedRef, () => {
        // For presets, used the group container as the ref element.
        if (!isNil(presets)) {
            const element = containerRef.current;

            element.focus = () => {
                rangeRef.current?.focus();
            };

            return element;
        }

        return rangeRef.current;
    });

    const applyDates = useCallback((event: SyntheticEvent, newStartDate: Date, newEndDate: Date) => {
        if (!areEqualDates(startDate, newStartDate) || !areEqualDates(endDate, newEndDate)) {
            setStartDate(newStartDate);
            setEndDate(newEndDate);

            if (!isNil(onDatesChange)) {
                onDatesChange(event, newStartDate, newEndDate);
            }
        }
    }, [onDatesChange, startDate, setStartDate, endDate, setEndDate]);

    const handleSelectPreset = useEventCallback((event: SyntheticEvent, newIndex: number) => {
        const preset = presets[newIndex];

        if (!isNil(preset)) {
            applyDates(event, preset.startDate, preset.endDate);
        }
    });

    const presetsProps = useMemo(() => {
        if (!isNil(presets)) {
            const selectedIndex = presets.findIndex(x =>
                areEqualDates(toMidnightDate(x.startDate), toMidnightDate(startDate)) &&
                areEqualDates(toMidnightDate(x.endDate), toMidnightDate(endDate))
            );

            return {
                values: presets.map(x => x.text),
                selectedIndex: selectedIndex !== -1 ? selectedIndex : undefined,
                onSelectionChange: handleSelectPreset
            };
        }

        return null;
    }, [presets, startDate, endDate, handleSelectPreset]);

    const rangeMarkup = (
        <RangeInput
            startDate={startDate}
            endDate={endDate}
            placeholder={placeholder}
            min={min}
            max={max}
            required={required}
            validationState={validationState}
            onDatesChange={applyDates}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus}
            fluid={fluid}
            disabled={disabled}
            readOnly={readOnly}
            active={active}
            focus={focus}
            hover={hover}
            name={name}
            ref={rangeRef}
        />
    );

    if (!isNil(presetsProps)) {
        return presetsVariant === "compact"
            ? (
                <InputGroup
                    {...mergeProps(
                        rest,
                        {
                            disabled,
                            readOnly,
                            fluid,
                            as,
                            ref: containerRef
                        }
                    )}
                >
                    {rangeMarkup}
                    <MenuPresets {...presetsProps} />
                </InputGroup>
            )
            : (
                <Box
                    {...mergeProps(
                        rest,
                        {
                            className: cssModule(
                                "o-ui-date-range-input-button-presets",
                                fluid && "fluid"
                            ),
                            as,
                            ref: containerRef
                        }
                    )}
                >
                    {rangeMarkup}
                    {!disabled && !readOnly && (
                        <ButtonPresets {...presetsProps} />
                    )}
                </Box>
            );
    }

    return (
        <ClearInputGroupContext>
            {augmentElement(rangeMarkup, mergeProps(
                rest,
                {
                    className: isInGroup ? "o-ui-date-range-input-in-group" : undefined,
                    as,
                    ref: containerRef
                }
            ))}
        </ClearInputGroupContext>
    );
}

export const DateRangeInput = forwardRef<any, Omit<InnerDateRangeInputProps, "forwardedRef">>((props, ref) => (
    <InnerDateRangeInput {...props} forwardedRef={ref} />
));

export type DateRangeInputProps = ComponentProps<typeof DateRangeInput>;

DateRangeInput.displayName = "DateRangeInput";
