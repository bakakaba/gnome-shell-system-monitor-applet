import GObject from "gi://GObject";
import St from "gi://St";

import * as Main from "resource:///org/gnome/shell/ui/main.js";
import * as PanelMenu from "resource:///org/gnome/shell/ui/panelMenu.js";
import * as PopupMenu from "resource:///org/gnome/shell/ui/popupMenu.js";

import { FrequencyMonitor } from "./FrequencyMonitor.js";
import { IRefresh } from "./types.js";

export class MonitorsIndicator extends PanelMenu.Button {
  _init() {
    super._init(0.0, _("System Monitor"));

    const box = new St.BoxLayout();

    const label = new St.Label({
      text: "System Monitor",
      style_class: "system-status-icon",
    });
    box.add_actor(label);

    const monitors = this._getMonitors();
    monitors.forEach((monitor) => {
      box.add_actor(monitor);
    });

    this.add_actor(box);

    this._startPolling(monitors);
  }

  private _getMonitors(): IRefresh[] {
    return [new FrequencyMonitor()];
  }

  private _startPolling(monitors: IRefresh[]) {
    this._timer = setInterval(() => {
      monitors.forEach((monitor) => {
        monitor.refresh();
      });
    }, 1000);
  }

  destroy() {
    clearInterval(this._timer);
    super.destroy();
  }
}

GObject.registerClass(MonitorsIndicator);
