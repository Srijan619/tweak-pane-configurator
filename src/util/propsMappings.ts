const layoutAndBoxModelProps = {
  display: "block",
  width: "100%",
  height: "auto",
  maxWidth: "100%",
  minWidth: "100%",
  minHeight: "100%",
  maxHeight: "100%",
  padding: "0",
  margin: "0",
  border: "1px solid transparent",
  boxSizing: "border-box",
};

const positioningProps = {
  position: "relative",
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto",
  zIndex: 0,
};

const backgroundAndColorProps = {
  backgroundColor: "#ffffff",
  backgroundImage: "none",
  backgroundSize: "cover",
  color: "#000000",
  opacity: 1,
};

const typographyProps = {
  fontSize: "16px",
  fontFamily: "Arial, sans-serif",
  fontWeight: "normal",
  textAlign: "left",
  lineHeight: "1.5",
  textTransform: "none",
};

const flexAndGridProps = {
  displayFlex: "none",
  displayGrid: "none",
  flexDirection: "row",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr",
};

const otherProps = {
  overflow: "visible",
  borderRadius: "0px",
  boxShadow: "none",
};

const fontAndTextStylingProps = {
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  fontWeight: "normal",
  fontStyle: "normal",
  textAlign: "left",
  letterSpacing: "normal",
  lineHeight: "1.5",
  textTransform: "none",
  textDecoration: "none",
  textShadow: "none",
};

const textLayoutProps = {
  whiteSpace: "normal",
  wordWrap: "normal",
  wordBreak: "normal",
};

// Common properties for button and img
const commonProps = {
  layoutAndBoxModel: layoutAndBoxModelProps,
  positioning: positioningProps,
  backgroundAndColor: backgroundAndColorProps,
  typography: typographyProps,
  flexAndGrid: flexAndGridProps,
  other: otherProps,
};

// img specific properties
const imgProps = {
  ...commonProps,
  objectFit: "contain",
  objectPosition: "center center",
};

// button specific properties
const buttonProps = {
  ...commonProps,
  fontAndTextStyling: fontAndTextStylingProps,
  cursor: "pointer",
};

const propsMapping: Record<string, any> = {
  div: {
    layoutAndBoxModel: layoutAndBoxModelProps,
    positioning: positioningProps,
    backgroundAndColor: backgroundAndColorProps,
    typography: typographyProps,
    flexAndGrid: flexAndGridProps,
    other: otherProps,
  },
  text: {
    fontAndTextStyling: fontAndTextStylingProps,
    textLayout: textLayoutProps,
    backgroundAndColor: backgroundAndColorProps,
  },
  image: imgProps,
  button: buttonProps,
} as const;

export const autoPropsGeneratorPlugin = (key: string) => {
  const type = key.split("$TWEAK_CSS_CONFIG_")[1]?.toLowerCase();
  return propsMapping[type] ? structuredClone(propsMapping[type]) : undefined;
};
