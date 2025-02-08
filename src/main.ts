import { TweakpaneConfig } from "./core/tweakPaneConfigurator";
import { props } from "./mock-data/props";

// Example on how to use
const tweakpaneInstance = new TweakpaneConfig({
  props,
  showJsonInput: false,
  expanded: false,
});

// Update props dynamically
tweakpaneInstance.updateProps({
  buttonRightColor: "#ff0000",
  buttonRightMargin: "10px",
  buttonRightPadding: "10px",
});

// Get flattened properties
console.log(tweakpaneInstance.getFlattenedProps());
