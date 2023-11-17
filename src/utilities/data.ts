export function updateScrollingData(
  size: number,
  value: number,
  data?: number[]
) {
  data = data ?? new Array<number>(size).fill(0);

  if (data.length !== size) {
    const delta = data.length - size;
    if (delta > 0) {
      data.splice(0, delta);
    } else {
      data.concat(new Array<number>(-delta).fill(0));
    }
  }

  data.push(value);
  data.shift();

  return data;
}
