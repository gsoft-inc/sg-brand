import { CheckboxGroup } from "@react-components/checkbox";
import { Tag } from "@react-components/tag";
import { useCallback } from "react";
import { useCheckableContext } from "@react-components/shared";

function CustomComponent({
    value,
    children,
    ...rest
}) {
    const { isChecked, onCheck } = useCheckableContext(value);

    const handleCheck = useCallback(event => {
        onCheck(event, value);
    }, [value, onCheck]);

    return (
        <Tag
            {...rest}
            as="button"
            value={value}
            onClick={handleCheck}
            className={isChecked ? "white bg-primary-500" : "bg-secondary-500"}
            aria-checked={isChecked}
        >
            {children}
        </Tag>
    );
}

export function CustomGroup() {
    return (
        <CheckboxGroup gap={2}>
            <CustomComponent value="milky-way">Milky Way</CustomComponent>
            <CustomComponent value="andromeda">Andromeda</CustomComponent>
            <CustomComponent value="medusa">Medusa</CustomComponent>
        </CheckboxGroup>
    );
}
