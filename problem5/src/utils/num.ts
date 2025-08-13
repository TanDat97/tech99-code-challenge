export class Num {
  constructor(private num?: number) {}

  static round(num: number, precision: number) {
    const result = num && precision > -1 ? +(Math.round(Number(num + `e+${precision}`)) + `e-${precision}`) : num;
    if (!isNaN(result)) return result;
    return num && precision > -1 ? Math.round((Number(num) + Number.EPSILON) * Math.pow(10, precision)) / Math.pow(10, precision) : num;
  }

  static floor(num: number, precision: number) {
    const result = num && precision > -1 ? +(Math.floor(Number(num + `e+${precision}`)) + `e-${precision}`) : num;
    if (!isNaN(result)) return result;
    return num && precision > -1 ? Math.floor((Number(num) + Number.EPSILON) * Math.pow(10, precision)) / Math.pow(10, precision) : num;
  }

  static isNumber(value) {
    return typeof value === 'number' && !Number.isNaN(value) && value !== Infinity && value !== -Infinity;
  }

  // Remove number exists in 2 arrays
  static uniqeTwoArrays(array1: number[], array2: number[]) {
    if (!array1 || array1.length < 1 || !array2 || array2.length < 1) {
      return {
        array1,
        array2,
      };
    }

    const map = {};

    array1.forEach((a) => {
      if (!map[a]) {
        map[a] = 0;
      }
      map[a] += 1;
    });

    array2.forEach((a) => {
      if (!map[a]) {
        map[a] = 0;
      }
      map[a] += 1;
    });
    return {
      array1: array1.filter((a) => map[a] === 1),
      array2: array2.filter((a) => map[a] === 1),
    };
  }
}
