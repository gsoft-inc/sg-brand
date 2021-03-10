import { Alert, CriticalAlert, InfoAlert, PositiveAlert, WarningAlert } from "@react-components/alert";
import { Box } from "@react-components/box";
import { Button } from "@react-components/button";
import { Content } from "@react-components/placeholders";
import { Heading } from "@react-components/heading";
import { InfoIcon } from "@react-components/icons";
import { Inline, Stack } from "@react-components/layout";
import { ListItem, UnorderedList } from "@react-components/list";
import { Paragraph } from "@react-components/paragraph";
import { TextLink } from "@react-components/link";
import { paramsBuilder, storiesOfBuilder } from "@stories/utils";

function stories(segment) {
    return storiesOfBuilder(module, "Chromatic/Alert")
        .segment(segment)
        .parameters(paramsBuilder()
            .chromaticDelay(100)
            .build())
        .build();
}

stories()
    .add("text only", () =>
        <Inline verticalAlign="end">
            <Alert>Scheduled launch today at 1PM.</Alert>
            <Alert>Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
        </Inline>
    )
    .add("text + dismiss", () =>
        <Inline verticalAlign="end">
            <Alert onDismiss={() => {}}>Scheduled launch today at 1PM.</Alert>
            <Alert onDismiss={() => {}}>Scheduled launch today at 1PM.<br />Please be cautious.</Alert>
        </Inline>
    )
    .add("icon + text", () =>
        <Inline verticalAlign="end">
            <Alert>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.</Content>
            </Alert>
            <Alert>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
            </Alert>
        </Inline>
    )
    .add("icon + text + dismiss", () =>
        <Inline verticalAlign="end">
            <Alert onDismiss={() => {}}>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.</Content>
            </Alert>
            <Alert onDismiss={() => {}}>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
            </Alert>
        </Inline>
    )
    .add("icon + text + action", () =>
        <Inline verticalAlign="end">
            <Alert>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.</Content>
                <Button>Undo</Button>
            </Alert>
            <Alert>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                <Button>Undo</Button>
            </Alert>
        </Inline>
    )
    .add("icon + text + action + dismiss", () =>
        <Inline verticalAlign="end">
            <Alert onDismiss={() => {}}>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.</Content>
                <Button>Undo</Button>
            </Alert>
            <Alert onDismiss={() => {}}>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.<br /><TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Content>
                <Button>Undo</Button>
            </Alert>
        </Inline>
    )
    .add("rich content", () =>
        <Alert onDismiss={() => {}}>
            <InfoIcon />
            <Content>
                <Heading>Scheduled launch</Heading>
                <Paragraph>A launch is scheduled today at 1PM.</Paragraph>
                <UnorderedList>
                    <ListItem>Be cautious</ListItem>
                    <ListItem>Close your windows</ListItem>
                </UnorderedList>
            </Content>
            <Button>Undo</Button>
        </Alert>
    )
    .add("contained", () =>
        <div style={{ width: "500px" }}>
            <Alert>
                <InfoIcon />
                <Content>Scheduled launch today at 1PM.</Content>
            </Alert>
        </div>
    )
    .add("box as content", () =>
        <Alert>
            <InfoIcon />
            <Box slot="content">Scheduled launch today at 1PM.</Box>
            <Button>Undo</Button>
        </Alert>
    )
    .add("styling", () =>
        <Stack>
            <Alert className="border-red"><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</Alert>
            <Alert style={{ border: "1px solid red" }}><strong>Scheduled launch</strong> today at 1PM. Please be cautious.</Alert>
        </Stack>
    );

[
    { name: "info", ElementType: InfoAlert },
    { name: "success", ElementType: PositiveAlert },
    { name: "warning", ElementType: WarningAlert },
    { name: "critical", ElementType: CriticalAlert }
]
    .forEach(({ name, ElementType }) => {
        stories()
            .add(name, () =>
                <Stack>
                    <ElementType onDismiss={() => {}}>
                        <Content>
                            <strong>Scheduled launch</strong> today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.
                        </Content>
                    </ElementType>
                    <ElementType onDismiss={() => {}}>
                        A launch is scheduled today at 1PM.
                    </ElementType>
                    <ElementType>
                        A launch is scheduled today at 1PM.
                    </ElementType>
                    <ElementType onDismiss={() => {}}>
                        <Content>
                            <Heading>Scheduled launch</Heading>
                            <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                        </Content>
                    </ElementType>
                    <ElementType onDismiss={() => {}}>
                        <Content>
                            <Heading>Scheduled launch</Heading>
                            <Paragraph>A launch is scheduled today at 1PM. <TextLink href="https://dictionary.cambridge.org/dictionary/english/cautious" external>Please be cautious</TextLink>.</Paragraph>
                        </Content>
                        <Button>Cancel</Button>
                    </ElementType>
                </Stack>
            );
    });
