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


// ジェネリッククラスを作る
// ジェネリッククラスを使う場面
// クラスがにとって受け取るもの（item）の型が統一されていることがわかればいい
// ジェネリック型に型情報を渡すだけで高い柔軟性を得ることができ、高い型安全性(typescriptの型のサポート)も得る
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  // dataにitemを追加する関数
  addItem(item: T) {
    this.data.push(item);
  }
  // dataからitemを削除する関数
  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1); //indexOfはプリミティブがたのみ参照型（配列、オブジェクト）は-1をかえす
  }
  // dataからitemを取得する関数
  getItem() {
    return [...this.data]
  }
}


const textStorage = new DataStorage<string>();
textStorage.addItem("data1");
textStorage.addItem("data2");
textStorage.addItem("data3");
textStorage.removeItem("data1");
console.log(textStorage.getItem());


const numberStorage = new DataStorage<number>();
numberStorage.addItem(12);


// 使用時の問題点ーオブジェクトは参照型
const objStorage = new DataStorage<object>();//union型で使いたいプリミティブ型指定することで参照型のオブジェクトを使用するとエラーが出るようにできる
objStorage.addItem({ name: 'Max'});
objStorage.addItem({ name: 'Tom'});
objStorage.addItem({ name: 'Aun'});

objStorage.removeItem({ name: 'Tom'}); //indexOfが参照型のときは-1を返すので最後の値を削除することになる。
console.log(objStorage.getItem());



// ジェネリック型のユーティリティのビルドイン

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date):CourseGoal {
  // return {
  //   title: title,
  //   description: description,
  //   completeUntil: date,
  // }

  // partial型−型を緩める
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

// 下記は文字列の配列ですが、読み取り専用の文字列の配列である
const namesss: Readonly<string[]> = ['Max', 'Anna'];
namesss.push('Tom'); //