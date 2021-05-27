import { ReactNode, createContext, useContext } from "react";
import { isNil } from "../../shared";

export interface InputGroupContextType {
    fluid?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
}

export const InputGroupContext = createContext<InputGroupContextType>(null);

export function useInputGroupContext(): [InputGroupContextType, boolean] {
    const context = useContext(InputGroupContext);

    return !isNil(context)
        ? [context, true]
        : [{}, false];
}

interface ClearInputGroupContextProps {
    children?: ReactNode;
}

export function ClearInputGroupContext({ children }: ClearInputGroupContextProps) {
    return (
        <InputGroupContext.Provider value={null}>
            { children}
        </InputGroupContext.Provider>
    );
}

export interface UseInputGroupPropsReturn {
    fluid?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
}

export function useInputGroupProps(): [UseInputGroupPropsReturn, boolean] {
    const [context, isInInputGroup] = useInputGroupContext();

    const props = isInInputGroup && {
        ...context,
        className: "o-ui-input-group-input"
    };

    return [props || {}, isInInputGroup];
}

export interface UseInputGroupAddonPropsReturn {
    disabled?: boolean;
    className?: string;
}

export function useInputGroupAddonProps(): [UseInputGroupAddonPropsReturn, boolean] {
    const [{ disabled }, isInInputGroup] = useInputGroupContext();

    const props = isInInputGroup && {
        disabled,
        className: "o-ui-input-group-addon"
    };

    return [props || {}, isInInputGroup];
}

export interface UseInputGroupButtonAddonPropsReturn {
    variant?: string;
    shape?: string;
    disabled?: boolean;
    className?: string;
}

export function useInputGroupButtonAddonProps(): [UseInputGroupButtonAddonPropsReturn, boolean] {
    const [{ disabled }, isInInputGroup] = useInputGroupContext();

    const props = isInInputGroup && {
        variant: "outline",
        color: "secondary",
        shape: "rounded",
        disabled,
        className: "o-ui-input-group-addon"
    };

    return [props || {}, isInInputGroup];
}

export interface UseInputGroupSelectAddonPropsReturn {
    disabled?: boolean;
    readOnly?: boolean;
    className?: string;
}

export function useInputGroupSelectAddonProps(): [UseInputGroupSelectAddonPropsReturn, boolean] {
    const [{ disabled, readOnly }, isInInputGroup] = useInputGroupContext();

    const props = isInInputGroup && {
        disabled,
        readOnly,
        allowResponsiveMenuWidth: false,
        className: "o-ui-input-group-addon o-ui-input-group-select-addon"
    };

    return [props || {}, isInInputGroup];
}