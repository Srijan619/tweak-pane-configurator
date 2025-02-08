_Welcome to TweakPane Configurator_

**Convert any JSON config to panel and fits more perfectly for CSS attributes..**

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


// Available dynamic configs
/*
 *cardContainer: "$TWEAK_CSS_CONFIG_DIV",
 *title: "$TWEAK_CSS_CONFIG_TEXT",
 *leftIcon: "$TWEAK_CSS_CONFIG_IMAGE",
 *rightIconButton: "$TWEAK_CSS_CONFIG_BUTTON"
*/
// Get flattened properties
console.log(tweakpaneInstance.getFlattenedProps());
```
