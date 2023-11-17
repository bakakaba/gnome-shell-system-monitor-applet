import Clutter from "gi://Clutter";

export function getClutterColor(hex: string) {
  if (!Clutter.Color.from_string) {
    new Clutter.Color();
  }

  return Clutter.Color.from_string(hex)[1];
}

export const colors = {
  red: "#FFADAD",
  orange: "#FFD6A5",
  yellow: "#FDFFB6",
  green: "#CAFFBF",
  cyan: "#9BF6FF",
  blue: "#A0C4FF",
  purple: "#BDB2FF",
  pink: "#FFC6FF",
};
