import { expect, test } from "vitest";
import { sanitizeAndExtractCommonCSSProps } from "../core/commonCSSProps.js";

test("Flatten first and last key together one depth..", () => {
  const props = {
    buttonRightBackgroundColor: "#ffff",
    dataSource: "something",
    cardContainerZIndex: 1,
    cssPropInMiddleColorShouldDoNothing: "red",
  };
  const newProps = sanitizeAndExtractCommonCSSProps(props);
  expect(newProps).toEqual({
    buttonRight: {
      backgroundColor: "#ffff",
    },
    cardContainer: {
      zIndex: 1,
    },
    dataSource: "something",
    cssPropInMiddleColorShouldDoNothing: "red",
  });
});
