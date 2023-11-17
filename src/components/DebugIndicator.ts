import GObject from "gi://GObject";
import St from "gi://St";

import * as Main from "resource:///org/gnome/shell/ui/main.js";
import * as PanelMenu from "resource:///org/gnome/shell/ui/panelMenu.js";
import * as PopupMenu from "resource:///org/gnome/shell/ui/popupMenu.js";

export class DebugIndicator extends PanelMenu.Button {
  _init() {
    super._init(0.0, _("Debug Indicator"));

    this.add_child(
      new St.Icon({
        icon_name: "org.gnome.SystemMonitor-symbolic",
        style_class: "system-status-icon",
      })
    );

    let lgItem = new PopupMenu.PopupMenuItem(_("Looking Glass"));
    lgItem.connect("activate", () => {
      if (Main.lookingGlass === null) {
        Main.createLookingGlass();
      }

      Main.lookingGlass.toggle();
    });
    this.menu.addMenuItem(lgItem);

    let helloItem = new PopupMenu.PopupMenuItem(_("Hello world"));
    helloItem.connect("activate", () => {
      Main.notify(_("Hello world!"));
    });
    this.menu.addMenuItem(helloItem);
  }
}

GObject.registerClass(DebugIndicator);
