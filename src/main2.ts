import { Pane } from "tweakpane";

const styles = {
  cardContainer: {
    color: "#fff",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    backgroundColor: "#333",
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
  },
  icon: {
    color: "#f00",
    size: 40,
  },
};

const pane = new Pane();

const cardContainerFolder = pane.addFolder({
  title: "Card Container",
  expanded: false,
});

// Grouped margin control
const marginFolder = cardContainerFolder.addFolder({
  title: "Margin",
  expanded: false,
});

marginFolder.addBinding(styles.cardContainer, "marginTop", {
  min: 0,
  max: 100,
  step: 1,
});
marginFolder.addBinding(styles.cardContainer, "marginBottom", {
  min: 0,
  max: 100,
  step: 1,
});
marginFolder.addBinding(styles.cardContainer, "marginLeft", {
  min: 0,
  max: 100,
  step: 1,
});
marginFolder.addBinding(styles.cardContainer, "marginRight", {
  min: 0,
  max: 100,
  step: 1,
});

cardContainerFolder.addBinding(styles.cardContainer, "color");
cardContainerFolder.addBinding(styles.cardContainer, "padding", {
  min: 0,
  max: 100,
  step: 1,
});
cardContainerFolder.addBinding(styles.cardContainer, "backgroundColor");

const titleFolder = pane.addFolder({
  title: "Title",
  expanded: false,
});

titleFolder.addBinding(styles.title, "color");
titleFolder.addBinding(styles.title, "fontSize", { min: 8, max: 72, step: 1 });
titleFolder.addBinding(styles.title, "fontWeight");

const iconFolder = pane.addFolder({
  title: "Icon",
  expanded: false,
});

iconFolder.addBinding(styles.icon, "color");
iconFolder.addBinding(styles.icon, "size", { min: 10, max: 100, step: 1 });

// Global listener for changes in the entire pane
pane.on("change", () => {
  console.log(styles);
});
