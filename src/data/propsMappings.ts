const layoutAndBoxModelProps = {
  display: "block",
  width: "100%",
  height: "auto",
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

const propsMapping = {
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
} as const;

export const autoPropsGeneratorPlugin = (key: string) => {
  const type = key.split("$TWEAK_CSS_CONFIG_")[1]?.toLowerCase();
  return propsMapping[type];
};
