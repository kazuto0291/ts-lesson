function combine(input1:number | string , input2: number | string, resultConversion: 'as-number' | 'as-text') {
  let result;
  // 型がわからないのを足すことをtypescriptはエラーを出すので
  // ランタイム上でデータ型をチェックすることで解消できる（typeofを使う）
  if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
    result = +input1 + +input2
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);