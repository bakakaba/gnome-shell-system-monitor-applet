import GObject from "gi://GObject";

import { chartSize } from "../configuration.js";
import type { IRefresh } from "../types.js";
import { colors } from "../utilities/colors.js";
import { getCpuStatistics } from "../utilities/cpu.js";
import { updateScrollingData } from "../utilities/data.js";
import { Chart } from "./Chart.js";

export class CpuMonitor extends Chart implements IRefresh {
  refresh() {
    if (!this.visible) return;

    const stats = getCpuStatistics();
    this.set_width(chartSize + 10); // There seems to be some padding of 10 pixels for the component

    this._samples[0] = {
      color: colors.blue,
      data: updateScrollingData(
        chartSize,
        stats["cpu"]?.load ?? 0,
        this._samples[0]?.data
      ),
    };

    this.queue_repaint();
  }
}

GObject.registerClass(CpuMonitor);
