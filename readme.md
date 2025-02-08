_Welcome to TweakPane Configurator_

\*\* Convert any JSON config to panel and fits more perfectly for CSS attributes..

Example:

```
import { TweakpaneConfig } from "./core/tweakPaneConfigurator";
import { props } from "./mock-data/propsTest";

// Example on how to use
const tweakpaneInstance = new TweakpaneConfig({
props,
showJsonInput: false,
expanded: false,

// restructureProps: true,
});

// Update props dynamically
// tweakpaneInstance.updateProps({
// buttonRightColor: "#ff0000",
// buttonRightMargin: "10px",
// buttonRightPadding: "10px",
// });

// Get flattened properties
console.log(tweakpaneInstance.getFlattenedProps());
```
