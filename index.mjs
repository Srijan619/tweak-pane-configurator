var y = Object.defineProperty;
var C = (s, t, n) => t in s ? y(s, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : s[t] = n;
var d = (s, t, n) => C(s, typeof t != "symbol" ? t + "" : t, n);
import { Pane as w } from "tweakpane";
const h = {
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
  boxSizing: "border-box"
}, g = {
  position: "relative",
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto",
  zIndex: 0
}, c = {
  backgroundColor: "#ffffff",
  backgroundImage: "none",
  backgroundSize: "cover",
  color: "#000000",
  opacity: 1
}, u = {
  fontSize: "16px",
  fontFamily: "Arial, sans-serif",
  fontWeight: "normal",
  textAlign: "left",
  lineHeight: "1.5",
  textTransform: "none"
}, m = {
  displayFlex: "none",
  displayGrid: "none",
  flexDirection: "row",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gridTemplateColumns: "1fr",
  gridTemplateRows: "1fr"
}, x = {
  overflow: "visible",
  borderRadius: "0px",
  boxShadow: "none"
}, b = {
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  fontWeight: "normal",
  fontStyle: "normal",
  textAlign: "left",
  letterSpacing: "normal",
  lineHeight: "1.5",
  textTransform: "none",
  textDecoration: "none",
  textShadow: "none"
}, A = {
  whiteSpace: "normal",
  wordWrap: "normal",
  wordBreak: "normal"
}, P = {
  layoutAndBoxModel: h,
  positioning: g,
  backgroundAndColor: c,
  typography: u,
  flexAndGrid: m,
  other: x
}, z = {
  ...P,
  objectFit: "contain",
  objectPosition: "center center"
}, F = {
  ...P,
  fontAndTextStyling: b,
  cursor: "pointer"
}, j = {
  div: {
    layoutAndBoxModel: h,
    positioning: g,
    backgroundAndColor: c,
    typography: u,
    flexAndGrid: m,
    other: x
  },
  text: {
    fontAndTextStyling: b,
    textLayout: A,
    backgroundAndColor: c
  },
  image: z,
  button: F
}, I = (s) => {
  var n;
  const t = (n = s.split("$TWEAK_CSS_CONFIG_")[1]) == null ? void 0 : n.toLowerCase();
  return j[t];
}, O = [
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
  "boxDecorationBreak"
], l = (s) => {
  let t = {};
  function n(o) {
    let r = [];
    for (let e of O)
      if (e = e.toLowerCase(), o.toLowerCase().endsWith(e)) {
        const i = o.slice(0, o.length - e.length), a = e.charAt(0).toLowerCase() + e.slice(1);
        r.push({ prefix: i, cssPropName: a, matchLength: e.length });
      }
    return r.length > 0 ? (r.sort((e, i) => i.matchLength - e.matchLength), r[0]) : o;
  }
  return Object.entries(s).forEach(([o, r]) => {
    if (typeof r == "object") return t[o] = r;
    if (typeof r == "string" && r.startsWith("$TWEAK_CSS_CONFIG"))
      return t[o] = I(r);
    const e = n(o);
    if (e && typeof e == "object" && "prefix" in e && "cssPropName" in e) {
      const { prefix: i, cssPropName: a } = e;
      if (t[i]) {
        t[i] = r;
        return;
      }
      t[i] || (t[i] = {}), t[i][a] = r;
    } else
      t[o] = r;
  }), console.log("Sanitized props..", t), t;
};
let f = "";
function p(s, t = "") {
  let n = {};
  return f || (f = Object.keys(s)[0]), Object.entries(s).forEach(([o, r]) => {
    const e = t ? `${t}` : o;
    typeof r == "object" && r !== null && !Array.isArray(r) ? Object.assign(n, p(r, e)) : n[`${e}${o.charAt(0).toUpperCase() + o.slice(1)}`] = r;
  }), n;
}
const W = ["margin", "padding", "borderWidth"];
class L {
  constructor(t) {
    d(this, "pane");
    d(this, "props");
    d(this, "folders", []);
    d(this, "sanitizedProps");
    d(this, "config");
    this.pane = new w(), this.config = t, this.config.restructureProps = t.props.restructureProps || !0, this.props = t.props, this.sanitizedProps = t.restructureProps ? l(this.props) : this.props, this.createPanel(this.sanitizedProps), t.showJsonInput && this.createJsonInput(), this.pane.on("change", () => {
      console.log("Normal input config: ", this.sanitizedProps), console.log(
        "Flatten input config: ",
        p(this.sanitizedProps)
      );
    });
  }
  createPanel(t, n = null) {
    n || this.clearFolders(), Object.entries(t).forEach(([o, r]) => {
      if (r || (t[o] = ""), typeof r == "object") {
        const e = this.pane.addFolder({
          title: o,
          expanded: this.config.expanded ?? !1
        });
        this.folders.push(e), Object.entries(r).forEach(([i, a]) => {
          if (a && typeof a == "object") {
            const S = e.addFolder({
              title: i,
              expanded: this.config.expanded ?? !1
            });
            this.createPanel(a, S);
            return;
          }
          W.includes(i) ? this.createFourSidedControl(e, t[o], i) : e.addBinding(t[o], i);
        });
      } else
        n ? n.addBinding(t, o) : this.pane.addBinding(t, o);
    });
  }
  createFourSidedControl(t, n, o) {
    const r = t.addFolder({
      title: o.charAt(0) + o.slice(1),
      expanded: !1
    });
    let e = n[o] || "0";
    (typeof e == "string" && !e.includes(" ") || typeof e == "number") && (n[o] = { top: e, bottom: e, left: e, right: e }), Object.keys(n[o]).forEach((i) => {
      r.addBinding(n[o], i);
    });
  }
  createJsonInput() {
    const t = document.createElement("div");
    t.id = "app", document.body.appendChild(t);
    const n = document.createElement("label");
    n.id = "message", t.appendChild(n);
    const o = document.createElement("textarea");
    o.id = "jsonInput", o.rows = 10, o.cols = 50, o.placeholder = "Paste test JSON config here", t.appendChild(o), o.addEventListener("input", (r) => {
      try {
        const e = r.target.value;
        this.props = l(JSON.parse(e)), this.createPanel(this.props), n.textContent = "";
      } catch (e) {
        console.error("Invalid JSON:", e), n.textContent = "Invalid JSON!";
      }
    });
  }
  clearFolders() {
    this.folders.forEach((t) => t.dispose()), this.folders = [];
  }
  updateProps(t) {
    this.sanitizedProps = l(t), this.createPanel(this.sanitizedProps);
  }
  getFlattenedProps() {
    return p(this.sanitizedProps);
  }
}
export {
  L as default
};
