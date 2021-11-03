function ColorSchemePicker() {
    const { colorScheme, setColorScheme } = useThemeContext();

    return (
        <Inline
            gap={1}
            backgroundColor="alias-default"
        >
            <Text marginRight={2}>Color Scheme: </Text>
            <TextLink
                onClick={() => setColorScheme("light")}
                fontWeight={colorScheme === "light" ? 3 : undefined}
            >
                Light
            </TextLink>
            <Divider orientation="vertical" />
            <TextLink
                onClick={() => setColorScheme("dark")}
                fontWeight={colorScheme === "dark" ? 3 : undefined}
            >
                Dark
            </TextLink>
        </Inline>
    );
}

render(() => {
    return (
        <ThemeProvider theme={ApricotTheme} colorScheme="system" defaultColorScheme="light">
            <Stack>
                <Button variant="primary">Cutoff</Button>
                <ColorSchemePicker />
            </Stack>
        </ThemeProvider>
    );
});
