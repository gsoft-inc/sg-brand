import { HtmlInput } from "../../html";
import { Ref } from "react";
import { StyledComponentProps, isNil, mergeProps } from "../../shared";
import { ValidationState } from "../../input";

const DefaultElement = "input";

export interface HiddenSelectProps extends Omit<StyledComponentProps<typeof DefaultElement>, "ref"> {
    /**
     * @ignore
     */
    ref?: Ref<HTMLInputElement>;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * A controlled selected key.
     */
    selectedKey?: string;
    /**
     * Whether or not the select should display as "valid" or "invalid".
     */
    validationState?: ValidationState;
}

export function HiddenSelect({ name, required, selectedKey, validationState, ...rest }: HiddenSelectProps) {
    if (isNil(name)) {
        return null;
    }

    return (
        <HtmlInput
            {...mergeProps(
                rest,
                {
                    "aria-invalid": validationState === "invalid" ? true : undefined,
                    "aria-required": required ? true : undefined,
                    type: "hidden",
                    value: selectedKey ?? ""
                }
            )}
        />
    );
}

HiddenSelect.defaultElement = DefaultElement;
