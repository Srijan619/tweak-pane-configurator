//TODO: This is obsolete
type CSSMatch = {
  prefix: string;
  cssPropName: string;
  matchLength: number;
};

const commonCSSProps = [
  "color",
  "backgroundColor",
  "font",
  "fontSize",
  "fontWeight",
  "fontFamily",
  "lineHeight",
  "textAlign",
  "margin",
  "padding",
  "border",
  "borderRadius",
  "boxShadow",
  "width",
  "height",
  "minWidth",
  "minHeight",
  "maxWidth",
  "maxHeight",
  "display",
  "position",
  "top",
  "right",
  "bottom",
  "left",
  "zIndex",
  "opacity",
  "visibility",
  "flex",
  "flexDirection",
  "flexWrap",
  "justifyContent",
  "alignItems",
  "alignSelf",
  "gap",
  "gridTemplateColumns",
  "gridTemplateRows",
  "gridColumn",
  "gridRow",
  "gridArea",
  "textTransform",
  "letterSpacing",
  "wordSpacing",
  "cursor",
  "transition",
  "transform",
  "boxSizing",
  "overflow",
  "resize",
  "whiteSpace",
  "textOverflow",
  "visibility",
  "objectFit",
  "objectPosition",
  "backgroundImage",
  "backgroundSize",
  "backgroundPosition",
  "backgroundRepeat",
  "filter",
  "clipPath",
  "boxShadow",
  "outline",
  "outlineOffset",
  "borderWidth",
  "borderStyle",
  "borderColor",
  "opacity",
  "userSelect",
  "pointerEvents",
  "boxDecorationBreak",
];

export const sanitizeCommonCSSProps = (props: Record<string, any>) => {
  let structuredProps = {};

  function extractCSSProperty(key: string): CSSMatch | string {
    let matches: CSSMatch[] = [];

    for (let cssProp of commonCSSProps) {
      cssProp = cssProp.toLowerCase();
      if (key.toLowerCase().endsWith(cssProp)) {
        const prefix = key.slice(0, key.length - cssProp.length); // Get the prefix part
        const cssPropName = cssProp.charAt(0).toLowerCase() + cssProp.slice(1); // Convert to camelCase

        // Store the matches with their lengths
        matches.push({ prefix, cssPropName, matchLength: cssProp.length });
      }
    }

    // If there are multiple matches, return the one with the longest match length eg..(maxWidth and width...we take the one that matches most)
    if (matches.length > 0) {
      // Sort by the match length in descending order and pick the first match
      matches.sort((a, b) => b.matchLength - a.matchLength);
      return matches[0]; // Return the match with the longest match length
    } else {
      // If does not matches to css prop but we can still group it in this prefix..
    }

    return key; // Return as it is if not found
  }

  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === "object") return (structuredProps[key] = value); // do not do anything for objects i.e props probably already structured
    const result = extractCSSProperty(key);

    if (
      result &&
      typeof result === "object" &&
      "prefix" in result &&
      "cssPropName" in result
    ) {
      // Ensure result is a valid CSSMatch
      const { prefix, cssPropName } = result;

      if (!structuredProps[prefix]) {
        structuredProps[prefix] = {};
      }

      structuredProps[prefix][cssPropName] = value;
    } else {
      // If not a valid CSS property, store it as is
      structuredProps[key] = value;
    }
  });

  console.log("Sanitized props..", structuredProps);
  return structuredProps;
};
