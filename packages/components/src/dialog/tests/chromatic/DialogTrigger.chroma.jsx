import { Button } from "@components/button";
import { Content } from "@components/placeholders";
import { Dialog, DialogTrigger } from "@components/dialog";
import { Heading, Paragraph } from "@components/typography";

export default {
    title: "Chromatic/DialogTrigger",
    component: DialogTrigger,
    parameters: {
        chromatic: {
            delay: 100,
            chromaticPauseAnimationAtEnd: true
        }
    }
};

export const Default = () =>
    <DialogTrigger>
        <Button variant="secondary">Open</Button>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye." </Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    </DialogTrigger>;

export const DefaultOpen = () =>
    <DialogTrigger defaultOpen>
        <Button variant="secondary">Open</Button>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye." </Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    </DialogTrigger>;

export const NotDismissable = () =>
    <DialogTrigger dismissable={false} defaultOpen>
        <Button variant="secondary">Open</Button>
        <Dialog>
            <Heading>Iconic Arecibo Observatory collapses</Heading>
            <Content>
                <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye." </Paragraph>
                <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
            </Content>
        </Dialog>
    </DialogTrigger>;

export const FunctionalContent = () =>
    <DialogTrigger defaultOpen>
        {() => {
            return (
                <>
                    <Button variant="secondary">Open</Button>
                    <Dialog>
                        <Heading>Iconic Arecibo Observatory collapses</Heading>
                        <Content>
                            <Paragraph>This year, the National Science Foundation (NSF) said farewell to the iconic Arecibo Observatory in Puerto Rico after two major cable failures led to the radio telescope's collapse. The 57-year old structure was once the largest radio dish telescope in the world, and researchers have used its capabilities to make significant breakthroughs in astronomy. The Arecibo Observatory also served as the dramatic backdrop to films like "Contact" and "Goldeneye." </Paragraph>
                            <Paragraph>The facility suffered two cable failures this year, and then in early December, the suspended platform above the radio dish came crashing down.</Paragraph>
                            <Paragraph>The news about Arecibo's structural damage and subsequent decommissioning was disheartening for the local community, too. Field trips to its visitors' center are a ''rite of passage'' for Puerto Rican children.</Paragraph>
                        </Content>
                    </Dialog>
                </>
            );
        }}
    </DialogTrigger>;

Default.storyName = "default";
DefaultOpen.storyName = "default open";
NotDismissable.storyName = "not dismissable";
FunctionalContent.storyName = "functional content";
