import { Pane } from "tweakpane";
import { FolderApi } from "@tweakpane/core";
import { sanitizeAndExtractCommonCSSProps } from "./commonCSSProps";
import { flattenPropsFirstAndLastKey } from "./flattenProps";
//import QuadValuesBladePluginBundle from "../../node_modules/plugin-tweakpane-quad-border/src/index";

// Default four-sided properties handling (e.g., margin, padding)
export const fourSidedProps = ["margin", "padding", "borderWidth"];

export interface PanelConfig {
  container?: HTMLElement;
  props: Record<string, any>;
  showJsonInput?: boolean;
  expanded?: boolean;
  restructureProps?: boolean;
}

export class TweakpaneConfig {
  private pane: Pane;
  private props: Record<string, any>;
  private folders: FolderApi[] = [];
  private sanitizedProps: Record<string, any>;
  private config: PanelConfig;

  constructor(config: PanelConfig) {
    this.pane = new Pane({ container: config.container });
    // this.pane.registerPlugin(QuadValuesBladePluginBundle);
    this.config = config;
    this.config.restructureProps = config.props.restructureProps || true;
    this.props = config.props;
    this.sanitizedProps = config.restructureProps
      ? sanitizeAndExtractCommonCSSProps(this.props)
      : this.props;

    this.createPanel(this.sanitizedProps);

    if (config.showJsonInput) {
      this.createJsonInput();
    }

    this.pane.on("change", (e) => {
      console.log("Normal input config: ", this.sanitizedProps);
      console.log(
        "Flatten input config: ",
        flattenPropsFirstAndLastKey(this.sanitizedProps),
      );
    });
  }

  private createPanel(props: Record<string, any>, parentFolder: any = null) {
    if (!parentFolder) this.clearFolders(); // Cleanup before creating new panel
    Object.entries(props).forEach(([section, properties]) => {
      if (!properties) props[section] = ""; // If for some reason value is undefined... set empty string

      if (typeof properties === "object") {
        const folder = this.pane.addFolder({
          title: section,
          expanded: this.config.expanded ?? false,
        });
        this.folders.push(folder);
        Object.entries(properties).forEach(([prop, value]) => {
          if (value && typeof value === "object") {
            //parentFolder?.addBinding(value, prop);
            const newFolder = folder.addFolder({
              title: prop,
              expanded: this.config.expanded ?? false,
            });
            this.createPanel(value, newFolder);
            return;
          }
          if (fourSidedProps.includes(prop)) {
            this.createFourSidedControl(folder, props[section], prop);
          } else {
            folder.addBinding(props[section], prop);
          }
        });
      } else {
        if (parentFolder) {
          parentFolder.addBinding(props, section);
        } else {
          this.pane.addBinding(props, section);
        }
      }
    });
  }

  private createFourSidedControl(
    folder: FolderApi,
    obj: Record<string, any>,
    propName: string,
  ) {
    const subFolder = folder.addFolder({
      title: propName.charAt(0) + propName.slice(1),
      expanded: false,
    });

    let value = obj[propName] || "0";
    if (
      (typeof value === "string" && !value.includes(" ")) ||
      typeof value === "number"
    ) {
      obj[propName] = { top: value, bottom: value, left: value, right: value };
    }

    Object.keys(obj[propName]).forEach((side) => {
      subFolder.addBinding(obj[propName], side);
    });
  }

  private createJsonInput() {
    const appContainer = document.createElement("div");
    appContainer.id = "app";
    document.body.appendChild(appContainer);

    const messageLabel = document.createElement("label");
    messageLabel.id = "message";
    appContainer.appendChild(messageLabel);

    const jsonInput = document.createElement("textarea");
    jsonInput.id = "jsonInput";
    jsonInput.rows = 10;
    jsonInput.cols = 50;
    jsonInput.placeholder = "Paste test JSON config here";
    appContainer.appendChild(jsonInput);

    jsonInput.addEventListener("input", (event) => {
      try {
        const inputValue = (event.target as HTMLTextAreaElement).value;
        this.props = sanitizeAndExtractCommonCSSProps(JSON.parse(inputValue));
        this.createPanel(this.props);
        messageLabel.textContent = "";
      } catch (error) {
        console.error("Invalid JSON:", error);
        messageLabel.textContent = "Invalid JSON!";
      }
    });
  }

  private clearFolders() {
    this.folders.forEach((folder) => folder.dispose());
    this.folders = [];
  }

  public updateProps(newProps: Record<string, any>) {
    this.sanitizedProps = sanitizeAndExtractCommonCSSProps(newProps);
    this.createPanel(this.sanitizedProps);
  }

  public getFlattenedProps() {
    return flattenPropsFirstAndLastKey(this.sanitizedProps);
  }
}
