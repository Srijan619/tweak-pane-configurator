import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/core/index.ts"),
      name: "TweakPaneConfigurator", // Name of your global variable
      formats: ["es", "umd"], // This will generate .js for both formats
      fileName: (format) => {
        if (format === "es") {
          return "index.mjs"; // Output index.mjs for the ESM format
        }
        return "index.umd.js"; // Output index.umd.js for the UMD format
      },
    },
    rollupOptions: {
      // Ensure external dependencies are not bundled into the library
      external: ["tweakpane", "@tweakpane/core"],
      output: {
        globals: {
          tweakpane: "TweakPane",
          "@tweakpane/core": "TweakPaneCore",
        },
      },
    },
  },
});
