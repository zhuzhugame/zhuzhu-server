import * as _ from 'lodash';

export function calcRefine(
  refineLv: number,
): { value: number; message: string } {
  const max = refineFunc(refineLv);
  const rate = _.random(0, 100);
  if (rate >= 0 && rate <= max) {
    return { value: refineLv + 1, message: 'success' };
  } else {
    return destory(refineLv);
  }
}

function refineFunc(x: number) {
  // 20,10
  // 15,10
  // 10,15
  // 5,45
  // 0,65
  return Math.round(
    -0.0036666666666666688 * x * x * x * x +
      0.1566666666666667 * x * x * x -
      1.908333333333335 * x * x +
      2.0833333333333357 * x +
      65,
  );
}

function destory(refineLv: number) {
  const rate = _.random(0, 100);
  // 30%
  if (rate >= 0 && rate <= 30) {
    return { value: sub(refineLv, 1), message: 'back' };
  } else if (rate >= 70 && rate <= 100) {
    // break
    return { value: refineLv, message: 'break' };
  } else {
    // break
    return { value: sub(refineLv, 1), message: 'backAndBreak' };
  }

  function sub(a: number, b: number) {
    return a - b < 0 ? 0 : a - b;
  }
}
