import { expect, test } from "vitest";
import { flattenPropsFirstAndLastKey } from "../core/flattenProps.js";
// Test flattening props with first key and last key...

test("Flatten first and last key together one depth..", () => {
  const props = {
    buttonRight: {
      fontSize: 14,
      fontWeight: 400,
      fontFamily: "Poppins",
      margin: 1,
    },
  };
  const newProps = flattenPropsFirstAndLastKey(props);
  expect(newProps).toEqual({
    buttonRightFontSize: 14,
    buttonRightFontWeight: 400,
    buttonRightFontFamily: "Poppins",
    buttonRightMargin: 1,
  });
});

test("Flatten first and last key together double depth..", () => {
  const props = {
    buttonRight: {
      backgroundAndStyle: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Poppins",
        margin: 1,
      },
      somethingOutsideString: "string",
      somethingOutsideObject: {
        boxShadow: "shadow",
      },
    },
  };
  const newProps = flattenPropsFirstAndLastKey(props);
  expect(newProps).toEqual({
    buttonRightFontSize: 14,
    buttonRightFontWeight: 400,
    buttonRightFontFamily: "Poppins",
    buttonRightMargin: 1,
    buttonRightSomethingOutsideString: "string",
    buttonRightBoxShadow: "shadow",
  });
});

test("Flatten first and last key together triple depth..", () => {
  const props = {
    buttonRight: {
      backgroundAndStyle: {
        fontSize: 14,
        fontWeight: 400,
        fontFamily: "Poppins",
        margin: 1,
        another: {
          marginTop: 20,
        },
      },
      somethingOutsideString: "string",
      somethingOutsideObject: {
        boxShadow: "shadow",
      },
    },
  };
  const newProps = flattenPropsFirstAndLastKey(props);
  expect(newProps).toEqual({
    buttonRightFontSize: 14,
    buttonRightFontWeight: 400,
    buttonRightFontFamily: "Poppins",
    buttonRightMargin: 1,
    buttonRightMarginTop: 20,
    buttonRightSomethingOutsideString: "string",
    buttonRightBoxShadow: "shadow",
  });
});
