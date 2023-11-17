import GObject from "gi://GObject";
import St from "gi://St";

import { getCpuFrequency } from "../utilities/cpu.js";
import type { IRefresh } from "../types.js";

export class FrequencyMonitor extends St.Label implements IRefresh {
  _init() {
    super._init({
      text: "Frequency",
      style_class: "system-status-icon",
    });
  }

  refresh() {
    const { average, max } = getCpuFrequency();
    this.set_text(`${average}/${max} GHz`);
  }
}

GObject.registerClass(FrequencyMonitor);
