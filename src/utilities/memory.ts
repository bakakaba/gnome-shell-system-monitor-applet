import GLib from "gi://GLib";

const decoder = new TextDecoder("utf-8");

/** Values are in kB */
export function getMemoryStatistics() {
  const [success, data] = GLib.file_get_contents("/proc/meminfo");
  const stats = { total: 0, available: 0, free: 0 };
  if (!success) return stats;

  const memInfo = decoder.decode(data);
  const matches = memInfo.matchAll(/^([\w()_]+):\s*(\d+)(?: (\w+))?$/gm);

  for (const match of matches) {
    if (match[1] === "MemAvailable") {
      stats.available = parseInt(match[2]);
    } else if (match[1] === "MemFree") {
      stats.free = parseInt(match[2]);
    } else if (match[1] === "MemTotal") {
      stats.total = parseInt(match[2]);
    }
  }

  return stats;
}
