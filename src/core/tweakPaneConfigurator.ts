import { Pane } from "tweakpane";
import { FolderApi } from "@tweakpane/core";
import { sanitizeCommonCSSProps } from "./commonCSSProps";
import { flattenProps } from "./flattenProps";

// Default four-sided properties handling (e.g., margin, padding)
const fourSidedProps = ["margin", "padding", "borderWidth"];

export interface PanelConfig {
  props: Record<string, any>;
  showJsonInput?: boolean;
  expanded?: boolean;
}

export class TweakpaneConfig {
  private pane: Pane;
  private props: Record<string, any>;
  private folders: FolderApi[] = [];
  private sanitizedProps: Record<string, any>;
  private config: PanelConfig;

  constructor(config: PanelConfig) {
    this.pane = new Pane();
    this.config = config;
    this.props = config.props;
    this.sanitizedProps = sanitizeCommonCSSProps(this.props);

    this.createPanel(this.sanitizedProps);

    if (config.showJsonInput) {
      this.setupJsonInput();
    }

    this.pane.on("change", () => {
      console.log("Normal input config: ", this.sanitizedProps);
      console.log("Flatten input config: ", flattenProps(this.sanitizedProps));
    });
  }

  private createPanel(props: Record<string, any>) {
    this.clearFolders();
    Object.entries(props).forEach(([section, properties]) => {
      if (typeof properties === "object") {
        const folder = this.pane.addFolder({
          title: section,
          expanded: this.config.expanded ?? false,
        });
        this.folders.push(folder);
        Object.entries(properties).forEach(([prop, value]) => {
          if (fourSidedProps.includes(prop)) {
            this.createFourSidedControl(folder, props[section], prop);
          } else {
            folder.addBinding(props[section], prop);
          }
        });
      } else {
        this.pane.addBinding(props, section);
      }
    });
  }

  private createFourSidedControl(
    folder: FolderApi,
    obj: Record<string, any>,
    propName: string,
  ) {
    const subFolder = folder.addFolder({
      title: propName.charAt(0).toUpperCase() + propName.slice(1),
      expanded: false,
    });

    let value = obj[propName] || "0";
    if (typeof value === "string" && !value.includes(" ")) {
      obj[propName] = { top: value, bottom: value, left: value, right: value };
    }

    Object.keys(obj[propName]).forEach((side) => {
      subFolder.addBinding(obj[propName], side);
    });
  }

  private setupJsonInput() {
    document.getElementById("jsonInput")?.addEventListener("input", (event) => {
      const inputValue = (event.target as HTMLInputElement).value;
      const messageEl = document.getElementById("message");

      try {
        this.sanitizedProps = sanitizeCommonCSSProps(JSON.parse(inputValue));
        this.createPanel(this.sanitizedProps);
        if (messageEl) messageEl.textContent = "";
      } catch (error) {
        console.error("Invalid JSON:", error);
        if (messageEl) messageEl.textContent = "Invalid JSON";
      }
    });
  }

  private clearFolders() {
    this.folders.forEach((folder) => folder.dispose());
    this.folders = [];
  }

  public updateProps(newProps: Record<string, any>) {
    this.sanitizedProps = sanitizeCommonCSSProps(newProps);
    this.createPanel(this.sanitizedProps);
  }

  public getFlattenedProps() {
    return flattenProps(this.sanitizedProps);
  }
}
