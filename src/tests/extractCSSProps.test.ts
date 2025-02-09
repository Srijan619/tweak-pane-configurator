import { expect, test } from "vitest";
import { extractCSSProperty } from "../core/commonCSSProps.js";

const testCases = [
  {
    input: "cardContainerFontSize",
    expected: {
      prefix: "cardContainer",
      cssPropName: "fontSize",
      matchLength: 8,
    },
  },
  {
    input: "buttonMargin",
    expected: { prefix: "button", cssPropName: "margin", matchLength: 6 },
  },
  {
    input: "imageBorderRadius",
    expected: { prefix: "image", cssPropName: "borderRadius", matchLength: 12 },
  },
  {
    input: "headerBackgroundColor",
    expected: {
      prefix: "header",
      cssPropName: "backgroundColor",
      matchLength: 15,
    },
  },
  {
    input: "footerPadding",
    expected: { prefix: "footer", cssPropName: "padding", matchLength: 7 },
  },
];

test.each(testCases)(
  "Extract CSS attribute key from prefixed key - %s",
  ({ input, expected }) => {
    const extractedProperty = extractCSSProperty(input);
    expect(extractedProperty).toEqual(expected);
  },
);
