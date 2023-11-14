import GObject from "gi://GObject";
import GLib from "gi://GLib";
import St from "gi://St";

import { IRefresh } from "./types";

export class FrequencyMonitor extends St.Label implements IRefresh {
  _init() {
    super._init({
      text: "Frequency",
      style_class: "system-status-icon",
    });
  }

  refresh() {
    let freq;
    if (
      GLib.file_test(
        `/sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq`,
        GLib.FileTest.EXISTS
      )
    ) {
      freq = this._getFrequencyFromScaling();
    } else {
      freq = this._getFrequencyFromCpuInfo();
    }

    const ave = roundFrequency(freq.sum / freq.cpus).toFixed(1);
    const max = roundFrequency(freq.max).toFixed(1);
    this.set_text(`${ave}/${max} GHz`);
  }

  private _getFrequencyFromScaling() {
    const cpus = GLib.get_num_processors();
    const decoder = new TextDecoder("utf-8");
    const freq = { sum: 0, max: 0, cpus };

    for (let i = 0; i < cpus; i++) {
      const [success, data] = GLib.file_get_contents(
        `/sys/devices/system/cpu/cpu${i}/cpufreq/scaling_cur_freq`
      )
      if (!success) continue;

      const val = parseInt(decoder.decode(data));
      freq.sum += val;
      if (val > freq.max) {
        freq.max = val;
      }
    }

    return freq;
  }

  /** More text to parse but better support across systems. */
  private _getFrequencyFromCpuInfo() {
    const cpuInfo = GLib.file_get_contents("/proc/cpuinfo").toString();
    const matches = cpuInfo.matchAll(/cpu MHz\s*:\s*(\d+)/g);

    const freq = { sum: 0, max: 0, cpus: 0 };
    for (const match of matches) {
      const val = parseFloat(match[1]) * 1000;
      freq.sum += val;
      freq.cpus++;
      if (val > freq.max) {
        freq.max = val;
      }
    }

    return freq;
  }
}

function roundFrequency(hz: number) {
  return Math.round(hz / 100000) / 10;
}

GObject.registerClass(FrequencyMonitor);
