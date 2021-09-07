import {
    AlignContentClasses,
    AlignItemsClasses,
    AlignSelfClasses,
    BackgroundAttachmentClasses,
    BackgroundClipClasses,
    BackgroundColorClasses,
    BackgroundPositionClasses,
    BackgroundRepeatClasses,
    BackgroundSizeClasses,
    BorderClasses,
    BorderRadiusClasses,
    BoxShadowClasses,
    BoxSizingClasses,
    ColorClasses,
    CursorClasses,
    DisplayClasses,
    FillClasses,
    FlexBasisClasses,
    FlexClasses,
    FlexGrowClasses,
    FlexShrinkClasses,
    FlexWrapClasses,
    FontSizeClasses,
    FontWeightClasses,
    GapClasses,
    HeightClasses,
    JustifyContentClasses,
    LineHeightClasses,
    MarginBottomClasses,
    MarginClasses,
    MarginLeftClasses,
    MarginRightClasses,
    MarginTopClasses,
    MarginXClasses,
    MarginYClasses,
    MaxHeightClasses,
    MaxWidthClasses,
    MinHeightClasses,
    MinWidthClasses,
    ObjectFitClasses,
    OpacityClasses,
    OrbitSpacingScale,
    OutlineClasses,
    OverflowClasses,
    OverflowXClasses,
    OverflowYClasses,
    PaddingBottomClasses,
    PaddingClasses,
    PaddingLeftClasses,
    PaddingRightClasses,
    PaddingTopClasses,
    PaddingXClasses,
    PaddingYClasses,
    PointerEventsClasses,
    PositionClasses,
    ResizeClasses,
    StrokeClasses,
    TextAlignClasses,
    TextOverflowClasses,
    TextTransformClasses,
    VerticalAlignClasses,
    WhiteSpaceClasses,
    WidthClasses,
    WordBreakClasses,
    ZindexClasses
} from "@react-components/shared";
import { Box } from "@react-components/box";
import { Fragment } from "react";
import { render, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";

interface PropDefinition {
    name: string;
    key: string;
    values: Readonly<any[]>;
}

const Props: PropDefinition[] = [
    { name: "align content", key: "alignContent", values: Object.keys(AlignContentClasses) },
    { name: "align items", key: "alignItems", values: Object.keys(AlignItemsClasses) },
    { name: "align self", key: "alignSelf", values: Object.keys(AlignSelfClasses) },
    { name: "background attachment", key: "backgroundAttachment", values: Object.keys(BackgroundAttachmentClasses) },
    { name: "background clip", key: "backgroundClip", values: Object.keys(BackgroundClipClasses) },
    { name: "background color", key: "backgroundColor", values: Object.keys(BackgroundColorClasses) },
    { name: "background position", key: "backgroundPosition", values: Object.keys(BackgroundPositionClasses) },
    { name: "background repeat", key: "backgroundRepeat", values: Object.keys(BackgroundRepeatClasses) },
    { name: "background size", key: "backgroundSize", values: Object.keys(BackgroundSizeClasses) },
    { name: "border", key: "border", values: Object.keys(BorderClasses) },
    // TODO: to change once borders have been refactored.
    { name: "border bottom", key: "borderBottom", values: ["1px solid black"] },
    { name: "border left", key: "borderLeft", values: ["1px solid black"] },
    { name: "border right", key: "borderRight", values: ["1px solid black"] },
    { name: "border top", key: "borderTop", values: ["1px solid black"] },
    // TODO: end
    { name: "border radius", key: "borderRadius", values: Object.keys(BorderRadiusClasses) },
    { name: "border radius", key: "borderRadius", values: Object.keys(BorderRadiusClasses) },
    { name: "bottom", key: "borderRadius", values: ["1px"] },
    { name: "box shadow", key: "boxShadow", values: Object.keys(BoxShadowClasses) },
    { name: "box sizing", key: "boxSizing", values: Object.keys(BoxSizingClasses) },
    { name: "color", key: "color", values: Object.keys(ColorClasses) },
    { name: "column gap", key: "columnGap", values: [0, ...OrbitSpacingScale] },
    { name: "cursor", key: "cursor", values: Object.keys(CursorClasses) },
    { name: "display", key: "display", values: Object.keys(DisplayClasses) },
    { name: "fill", key: "fill", values: Object.keys(FillClasses) },
    { name: "flex", key: "flex", values: Object.keys(FlexClasses) },
    { name: "flex basis", key: "flexBasis", values: Object.keys(FlexBasisClasses) },
    { name: "flex flow", key: "flexFlow", values: ["row wrap", "row-reverse nowrap", "column wrap-reverse", "column wrap"] },
    { name: "flex grow", key: "flexGrow", values: Object.keys(FlexGrowClasses) },
    { name: "flex shrink", key: "flexShrink", values: Object.keys(FlexShrinkClasses) },
    { name: "flex wrap", key: "flexWrap", values: Object.keys(FlexWrapClasses) },
    { name: "font size", key: "fontSize", values: Object.keys(FontSizeClasses) },
    { name: "font weight", key: "fontWeight", values: Object.keys(FontWeightClasses) },
    { name: "gap", key: "gap", values: Object.keys(GapClasses) },
    { name: "height", key: "height", values: Object.keys(HeightClasses) },
    { name: "justify content", key: "justifyContent", values: Object.keys(JustifyContentClasses) },
    { name: "left", key: "left", values: ["1px"] },
    { name: "line height", key: "lineHeight", values: Object.keys(LineHeightClasses) },
    { name: "margin", key: "margin", values: Object.keys(MarginClasses) },
    { name: "margin bottom", key: "marginBottom", values: Object.keys(MarginBottomClasses) },
    { name: "margin left", key: "marginLeft", values: Object.keys(MarginLeftClasses) },
    { name: "margin right", key: "marginRight", values: Object.keys(MarginRightClasses) },
    { name: "margin top", key: "marginTop", values: Object.keys(MarginTopClasses) },
    { name: "margin x", key: "marginX", values: Object.keys(MarginXClasses) },
    { name: "margin y", key: "marginY", values: Object.keys(MarginYClasses) },
    { name: "max height", key: "maxHeight", values: Object.keys(MaxHeightClasses) },
    { name: "max width", key: "maxWidth", values: Object.keys(MaxWidthClasses) },
    { name: "min height", key: "minHeight", values: Object.keys(MinHeightClasses) },
    { name: "min width", key: "minWidth", values: Object.keys(MinWidthClasses) },
    { name: "object fit", key: "objectFit", values: Object.keys(ObjectFitClasses) },
    { name: "opacity", key: "opacity", values: Object.keys(OpacityClasses) },
    { name: "order", key: "order", values: [1, "inherit"] },
    { name: "outline", key: "outline", values: Object.keys(OutlineClasses) },
    { name: "overflow", key: "overflow", values: Object.keys(OverflowClasses) },
    { name: "overflow x", key: "overflowX", values: Object.keys(OverflowXClasses) },
    { name: "overflow y", key: "overflowY", values: Object.keys(OverflowYClasses) },
    { name: "padding", key: "padding", values: Object.keys(PaddingClasses) },
    { name: "padding bottom", key: "paddingBottom", values: Object.keys(PaddingBottomClasses) },
    { name: "padding left", key: "paddingLeft", values: Object.keys(PaddingLeftClasses) },
    { name: "padding right", key: "paddingRight", values: Object.keys(PaddingRightClasses) },
    { name: "padding top", key: "paddingTop", values: Object.keys(PaddingTopClasses) },
    { name: "padding x", key: "paddingX", values: Object.keys(PaddingXClasses) },
    { name: "padding y", key: "paddingY", values: Object.keys(PaddingYClasses) },
    { name: "pointer events", key: "pointerEvents", values: Object.keys(PointerEventsClasses) },
    { name: "position", key: "position", values: Object.keys(PositionClasses) },
    { name: "resize", key: "resize", values: Object.keys(ResizeClasses) },
    { name: "right", key: "right", values: ["1px"] },
    { name: "row gap", key: "rowGap", values: [0, ...OrbitSpacingScale] },
    { name: "stroke", key: "stroke", values: Object.keys(StrokeClasses) },
    { name: "text align", key: "textAlign", values: Object.keys(TextAlignClasses) },
    { name: "text decoration", key: "textDecoration", values: ["underline", "underline overline #FF3028"] },
    { name: "text overflow", key: "textOverflow", values: Object.keys(TextOverflowClasses) },
    { name: "text transform", key: "textTransform", values: Object.keys(TextTransformClasses) },
    { name: "top", key: "top", values: ["1px"] },
    { name: "user select", key: "userSelect", values: ["none", "auto", "text", "contain", "all"] },
    { name: "vertical align", key: "verticalALign", values: Object.keys(VerticalAlignClasses) },
    { name: "white-space", key: "whiteSpace", values: Object.keys(WhiteSpaceClasses) },
    { name: "width", key: "width", values: Object.keys(WidthClasses) },
    { name: "work-break", key: "wordBreak", values: Object.keys(WordBreakClasses) },
    { name: "z-index", key: "zIndex", values: Object.keys(ZindexClasses) }
];

Props.forEach(x => {
    test(`${x.name}`, () => {
        const tree = renderer
            .create(
                <Fragment key={x.key}>
                    {x.values.map(y =>
                        <Box key={y} {...{ [x.key]: y }} />
                    )}
                </Fragment>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});

test("when className is provided, append new classes", async () => {
    const { getByTestId } = render(
        <Box
            className="toto"
            width={1}
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveClass("toto o-ui-w-1"));
});

test("when className is provided with a class matching a provided styled prop, do not add the class twice", async () => {
    const { getByTestId } = render(
        <Box
            className="o-ui-w-1"
            width={1}
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveAttribute("class", "o-ui-w-1"));
});

test("when style is provided, append new style values", async () => {
    const { getByTestId } = render(
        <Box
            style={{ top: "1px" }}
            bottom="2px"
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveStyle("top: 1px; bottom: 2px;"));
});

test("when style is provided with a value matching a provided style prop, do not add the class twice", async () => {
    const { getByTestId } = render(
        <Box
            style={{ top: "1px" }}
            top="1px"
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveStyle("top: 1px;"));
});

test("when style is provided and the provided value match a provided style prop but with a difference value, the style value have precedence", async () => {
    const { getByTestId } = render(
        <Box
            style={{ top: "1px" }}
            top="2px"
            data-testid="box"
        />
    );

    await waitFor(() => expect(getByTestId("box")).toHaveStyle("top: 1px;"));
});