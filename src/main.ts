import { Pane } from "tweakpane";

// Your dynamic config
const styles = {
  cardContainer: {
    font: "",
    margin: "1rem",
    padding: "1rem",
    border: "",
    borderRadius: ".4rem",
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    color: "",
    backgroundColor: "",
    width: "",
    height: "",
    minWidth: "",
    minHeight: "",
    maxWidth: "",
    maxHeight: "",
    text: "",
    gridColumn: "",
    gridRow: "",
    alignSelf: "",
    textAlign: "",
    displayKeys: "some some_not",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    gridTemplateRows: "1fr 1fr 1.2fr .3fr 1fr 1fr",
    gap: "0.5rem .5rem",
  },
  buttonRight: {
    font: "",
    margin: "",
    padding: "",
    border: ".5px solid #3ABBC7",
    borderRadius: ".5rem",
    boxShadow: "",
    color: "#3ABBC7",
    backgroundColor: "#ffff",
    width: "",
    height: "",
    text: "Reschedule",
  },
};

// Detects four-sided properties automatically
const fourSidedProps = ["margin", "padding", "borderWidth"]; // Add more if needed

const pane = new Pane();

// Helper function for four-sided properties
function createFourSidedControl(folder, obj, propName) {
  const subFolder = folder.addFolder({
    title: propName.charAt(0).toUpperCase() + propName.slice(1),
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

// Iterate over each section dynamically
Object.entries(styles).forEach(([section, properties]) => {
  const folder = pane.addFolder({ title: section });

  Object.entries(properties).forEach(([prop, value]) => {
    if (fourSidedProps.includes(prop)) {
      createFourSidedControl(folder, styles[section], prop);
    } else {
      folder.addBinding(styles[section], prop);
    }
  });
});

// Global listener
pane.on("change", () => {
  console.log(styles);
});
