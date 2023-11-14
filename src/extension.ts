import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";
import * as Main from "resource:///org/gnome/shell/ui/main.js";

import { DebugIndicator } from "./DebugIndicator.js";
import { MonitorsIndicator } from "./MonitorsIndicator.js";

export default class SystemMonitorExtension extends Extension {
  private _debug = false;
  private _debugIndicator?: DebugIndicator;
  private _monitorIndicator?: MonitorsIndicator;

  enable() {
    this._monitorIndicator = new MonitorsIndicator();
    Main.panel.addToStatusArea(this.uuid, this._monitorIndicator);

    if (this._debug) {
      this._debugIndicator = new DebugIndicator();
      Main.panel.addToStatusArea(`${this.uuid}-debug`, this._debugIndicator);
    }
  }

  disable() {
    this._monitorIndicator?.destroy();
    this._monitorIndicator = undefined;

    if (this._debug) {
      this._debugIndicator?.destroy();
      this._debugIndicator = undefined;
    }
  }
}
