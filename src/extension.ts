import St from "gi://St";

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { Indicator } from "./indicator.js";
import { Graph } from "./graph.js";
// import { Graph } from "./src/graph.js";

export default class SystemMonitorExtension extends Extension {
  enable() {
    this._indicator = new Indicator();
    Main.panel.addToStatusArea(this.uuid, this._indicator);

    const box = new St.BoxLayout();
    const label = new St.Label({ text: "System Monitor" });
    box.add_actor(label);
    this._indicator.add_actor(box);
    // Main.panel._addToPanelBox('system-monitor', box, 1, Main.panel._rightBox);
    // this._test = new Graph(50, 50);
    // Main.panel.addToStatusArea("yahad", this._test);
  }

  disable() {
    this._indicator.destroy();
    this._indicator = null;
  }
}
