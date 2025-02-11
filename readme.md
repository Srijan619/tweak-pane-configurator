_Welcome to TweakPane Configurator_

**Convert any JSON config to panel and fits more perfectly for CSS attributes..**

Check mock-data for example...

It does few things:

If props keys can be grouped, it groups them (using css attributes as postfix)
Automatically manges nested objects in folder structure.
Few dynamic keys available to auto generate CSS props$TWEAK_CSS_CONFIG_DIV, $TWEAK_CSS_CONFIG_TEXT and $TWEAK_CSS_CONFIG_BUTTON... more could be added in future. Most common attributes are there but could be extended manually too.
🚧🚧 Still alot WIP so be careful while banging your head here...🚧🚧

Huge credit to (TweakPane) [https://www.npmjs.com/package/tweakpane].

Stay tuned for more updates. PS: A plugin for margin/padding quad values view is on the way which seamlessly integrates to tweakpane.

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
