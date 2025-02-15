import { TweakpaneConfig } from "./core/tweakPaneConfigurator";
import { props } from "./mock-data/propsTest";

// Example on how to use
const container = document.createElement("div");
container.style.width = "2rem";
container.style.height = "2rem";

const tweakpaneInstance = new TweakpaneConfig({
  container,
  props,
  showJsonInput: false,
  expanded: false,

  // restructureProps: true,
});

document.body.appendChild(container);
// Update props dynamically
// tweakpaneInstance.updateProps({
//   buttonRightColor: "#ff0000",
//   buttonRightMargin: "10px",
//   buttonRightPadding: "10px",
// });

// Get flattened properties
console.log(tweakpaneInstance.getFlattenedProps());
