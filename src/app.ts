// ジェネリック型とは、他の特定の型と結合された型です。
// Array<string> 配列と文字列
// Array<number> 配列と数字
// ジェネリック型が利用されているのは、配列とpromise
// arrayはどんなデータが格納されているかわかる
// promiseはどんなデータを返すかわかる
// ジェネリック型の利用目的
// ・TypeScriptにおける型安全性を高める事ができる
// ・自動補完等の開発サポートを向上することができる。
// ・関数の引数を柔軟にするために使う

const namesPre: Array<string | number> = [];
const names: string[] = ['Max', 'Manuel'];


const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('終わりました。')
  }, 2000);
})

promise.then(data => {
  data.split('');
})

// 独自のジェネリック型を作る

function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

const mergedObj = merge({name: 'Max'}, {age: 30})

console.log(mergedObj)
console.log(mergedObj.age)



function mergeEx<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

const mergedObjEx = mergeEx({name: 'Max', hobbies: ['Sports']}, { age: 30 })

console.log(mergedObjEx)
console.log(mergedObjEx.age)


// もう一つのジェネリック

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] { //Tがlengthプロパティーを持っていることを保証する
  let descriptionText = '値がありません';
  if (element.length > 0 ){
    descriptionText = `値は${element.length}個です。`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("お疲れさまです"))


// key of の制約

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return `Value: ${obj[key]}`;  //keyがあると保証されていないのでエラーが出るのでジェネリック型を使いkeyof制約を利用する。
}

extractAndConvert({name: 'Max'}, "name");



