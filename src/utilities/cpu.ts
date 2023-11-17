import GLib from "gi://GLib";

const decoder = new TextDecoder("utf-8");

export function getCpuFrequency() {
  let freq;
  if (
    GLib.file_test(
      `/sys/devices/system/cpu/cpu0/cpufreq/scaling_cur_freq`,
      GLib.FileTest.EXISTS
    )
  ) {
    freq = getCpuFrequencyFromScaling();
  } else {
    freq = getCpuFrequencyFromCpuInfo();
  }

  const average = roundFrequency(freq.sum / freq.cpus).toFixed(1);
  const max = roundFrequency(freq.max).toFixed(1);
  return { average, max };
}

function roundFrequency(hz: number) {
  return Math.round(hz / 100000) / 10;
}

function getCpuFrequencyFromScaling() {
  const cpus = GLib.get_num_processors();

  const freq = { sum: 0, max: 0, cpus };

  for (let i = 0; i < cpus; i++) {
    const [success, data] = GLib.file_get_contents(
      `/sys/devices/system/cpu/cpu${i}/cpufreq/scaling_cur_freq`
    );
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
function getCpuFrequencyFromCpuInfo() {
  const freq = { sum: 0, max: 0, cpus: 0 };

  const [success, data] = GLib.file_get_contents("/proc/cpuinfo");
  if (!success) return freq;

  const cpuInfo = decoder.decode(data);
  const matches = cpuInfo.matchAll(/cpu MHz\s*:\s*(\d+)/g);

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

type CpuStatistics = {
  user: number;
  nice: number;
  system: number;
  idle: number;
  iowait: number;
  irq: number;
  softirq: number;
  steal: number;
  guest: number;
  guest_nice: number;
  total: number;
  load: number;
};

let lastCpuStats: Record<string, CpuStatistics>;

/**
 * The CPUs are usually labeled _cpu_ for the aggregate and cpu[0-9] for the
 * individual vCPUs
 */
export function getCpuStatistics() {
  const [success, data] = GLib.file_get_contents("/proc/stat");
  if (!success) return {};

  const procStat = decoder.decode(data);
  const lines = procStat.split("\n");
  const cpuStats = lines
    .filter((line) => line.startsWith("cpu"))
    .reduce((a, line) => {
      const [name, ...rest] = line.split(/\s+/);
      const [
        user,
        nice,
        system,
        idle,
        iowait,
        irq,
        softirq,
        steal,
        guest,
        guest_nice,
      ] = rest.map((x) => parseInt(x));

      const total =
        user +
        nice +
        system +
        idle +
        iowait +
        irq +
        softirq +
        steal +
        guest +
        guest_nice;

      let load = 0;
      if (lastCpuStats) {
        const deltaTotal = total - lastCpuStats[name].total;
        const deltaIdle = idle - lastCpuStats[name].idle;
        const used = deltaTotal - deltaIdle;
        load = used / deltaTotal;
      }

      a[name] = {
        user,
        nice,
        system,
        idle,
        iowait,
        irq,
        softirq,
        steal,
        guest,
        guest_nice,
        total,
        load,
      };

      return a;
    }, {} as Record<string, CpuStatistics>);

  lastCpuStats = cpuStats;
  return cpuStats;
}
