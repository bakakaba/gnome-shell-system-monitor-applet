import GObject from "gi://GObject";
import St from "gi://St";

import * as Main from "resource:///org/gnome/shell/ui/main.js";
import * as PanelMenu from "resource:///org/gnome/shell/ui/panelMenu.js";
import * as PopupMenu from "resource:///org/gnome/shell/ui/popupMenu.js";

export const Indicator = GObject.registerClass(
  class Indicator extends PanelMenu.Button {
    _init() {
      super._init(0.0, _("My Shiny Indicator"));

      this.add_child(
        new St.Icon({
          icon_name: "face-smile-symbolic",
          style_class: "system-status-icon",
        })
      );

      let item = new PopupMenu.PopupMenuItem(_("Looking Glass"));
      item.connect("activate", () => {
        if (Main.lookingGlass === null) {
          Main.createLookingGlass();
        }

        Main.lookingGlass.toggle();
      });
      this.menu.addMenuItem(item);
      let item2 = new PopupMenu.PopupMenuItem(_("Show Boom"));
      item2.connect("activate", () => {
        Main.notify(_("Kapow"));
      });
      this.menu.addMenuItem(item2);
    }
  }
);
