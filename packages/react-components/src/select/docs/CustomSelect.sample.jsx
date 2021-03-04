function CustomSelect({
    placeholder,
    "aria-label": ariaLabel,
    children,
    ...rest
}) {
    const { selectedItem, triggerProps, overlayProps, listboxProps } = useSelect(children, {
        ariaLabel
    });

    return (
        <>
            <Button
                {...rest}
                {...triggerProps}
                color="secondary"
                className="w-20"
            >
                {!isNil(selectedItem) ? selectedItem.text : placeholder}
            </Button>
            <Overlay {...overlayProps}>
                <Listbox {...listboxProps} />
            </Overlay>
        </>
    );
}

render(() =>
    <CustomSelect placeholder="Select a planet" aria-label="Planets">
        <Item key="earth">Earth</Item>
        <Item key="jupiter">Jupiter</Item>
        <Item key="mars">Mars</Item>
        <Item key="mercury">Mercury</Item>
        <Item key="neptune">Neptune</Item>
        <Item key="saturn">Saturn</Item>
        <Item key="uranus">Uranus</Item>
    </CustomSelect>
);
