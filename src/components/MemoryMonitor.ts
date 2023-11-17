import GObject from "gi://GObject";

import { chartSize } from "../configuration.js";
import type { IRefresh } from "../types.js";
import { colors } from "../utilities/colors.js";
import { updateScrollingData } from "../utilities/data.js";
import { getMemoryStatistics } from "../utilities/memory.js";
import { Chart } from "./Chart.js";

export class MemoryMonitor extends Chart implements IRefresh {
  refresh() {
    if (!this.visible) return;

    const stats = getMemoryStatistics();
    this.set_width(chartSize + 10); // There seems to be some padding of 10 pixels for the component

    this._samples[0] = {
      color: colors.green,
      data: updateScrollingData(
        chartSize,
        (stats.total - stats.free) / stats.total,
        this._samples[0]?.data
      ),
    };

    this._samples[1] = {
      color: colors.red,
      data: updateScrollingData(
        chartSize,
        (stats.total - stats.available) / stats.total,
        this._samples[1]?.data
      ),
    };

    this.queue_repaint();
  }
}

GObject.registerClass(MemoryMonitor);
