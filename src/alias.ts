type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine(input1:Combinable , input2: Combinable , resultConversion: ConversionDescriptor) {
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


// 型エイリアスは、アタナ自身の型を定義するのに使います。union型を入れるためだけではありません。複雑になりやすいobject型に対しても型エイリアスを使う事ができます。

// type User = {name :string; age: number};
// const u1: User = {name: 'Max', age: 30};

// 例）型エイリアスを使っていないコード
function greet(user: {name: string; age: number}) {
  console.log('HI, I am' + user.name)
}

function isOlder(user: {string; age: number}, checkAge:number) {
  return checkAge > user.age;
}

// 例）型エイリアスを使ったコード
type User = { name: string; age: number};

function greet(user: User) {
  console.log('HI, I am' + user.name)
}

function isOlder(user: User, checkAge: number) {
  return checkAge > user.age;
}