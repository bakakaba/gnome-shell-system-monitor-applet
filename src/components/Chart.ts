import Clutter from "gi://Clutter";
import GObject from "gi://GObject";
import St from "gi://St";

import { ChartLayer } from "../types.js";
import { getClutterColor } from "../utilities/colors.js";

export class Chart extends St.DrawingArea {
  protected _samples: ChartLayer[] = [];

  _init() {
    super._init({
      style_class: "system-status-icon",
      reactive: false,
    });

    this.visible = true;
    this.connect("repaint", this.onRepaint.bind(this));
  }

  onRepaint() {
    if (!this._samples) return;

    let [width, height] = this.get_surface_size();

    const ctx = this.get_context();
    ctx.setSourceRGBA(1, 1, 1, 0.1);
    ctx.rectangle(0, 0, width, height);
    ctx.fill();

    for (const layer of this._samples) {
      Clutter.cairo_set_source_color(ctx, getClutterColor(layer.color));
      ctx.moveTo(width, height);
      ctx.lineTo(0, height);

      for (let i = 0; i < layer.data.length; i++) {
        ctx.lineTo(i, height - height * layer.data[i]);
      }

      ctx.closePath(width, height);
      ctx.fill();
    }

    ctx.$dispose();
  }
}

GObject.registerClass(Chart);
