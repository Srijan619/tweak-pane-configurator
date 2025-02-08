import { Pane } from "tweakpane";
import { props } from "./props";
import { FolderApi } from "@tweakpane/core";
//import { groupProperties } from "./groupProps";
import { sanitizeCommonCSSProps } from "./commonCSSProps";
import { flattenProps } from "./flattenProps";

// Detects four-sided properties automatically
const fourSidedProps = ["margin", "padding", "borderWidth"];

let pane = new Pane();

// Helper function for four-sided properties
function createFourSidedControl(folder, obj, propName) {
  const subFolder = folder.addFolder({
    title: propName.charAt(0).toUpperCase() + propName.slice(1),
    expanded: false,
  });

  let value = obj[propName] || "0"; // Default value

  // Convert shorthand values like "1rem" -> { top: "1rem", bottom: "1rem", left: "1rem", right: "1rem" }
  if (typeof value === "string" && !value.includes(" ")) {
    obj[propName] = { top: value, bottom: value, left: value, right: value };
  }

  Object.keys(obj[propName]).forEach((side) => {
    subFolder.addBinding(obj[propName], side);
  });
}
let folders: FolderApi[] = [];

const createPanel = (props: Record<string, any>) => {
  folders?.forEach((folder) => folder.dispose());
  folders = [];
  Object.entries(props).forEach(([section, properties]) => {
    if (typeof properties === "object") {
      const folder = pane.addFolder({ title: section, expanded: false });
      folders.push(folder);
      Object.entries(properties).forEach(([prop, value]) => {
        if (fourSidedProps.includes(prop)) {
          createFourSidedControl(folder, props[section], prop);
        } else {
          folder.addBinding(props[section], prop);
        }
      });
    } else {
      pane.addBinding(props, section);
    }
  });
};

// Sanitize props ...if it is in flatten format like cardContainerMargin...
let sanitizedProps = sanitizeCommonCSSProps(props);
createPanel(sanitizedProps);

// DEMO EXAMPLE TEST INPUT
document.getElementById("jsonInput")?.addEventListener("input", function () {
  const inputValue = this.value;
  const messageEl = document.getElementById("message");
  console.log("JSON input", inputValue);
  try {
    sanitizedProps = sanitizeCommonCSSProps(JSON.parse(inputValue));
    createPanel(sanitizedProps);
    if (messageEl) {
      messageEl.textContent = "";
    }
  } catch (error) {
    // If JSON is invalid, you can handle the error here
    console.error("Invalid JSON:", error);

    if (messageEl) {
      messageEl.textContent = "Invalid JSON:";
    }
  }
});

pane.on("change", () => {
  console.log("Normal input config: ", sanitizedProps);
  console.log("Flatten input config: ", flattenProps(sanitizedProps));
});
