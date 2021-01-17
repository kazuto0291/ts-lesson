// ジェネリック型とは、他の特定の型と結合された型です。
// Array<string> 配列と文字列
// Array<number> 配列と数字
// ジェネリック型が利用されているのは、配列とpromise
// arrayはどんなデータが格納されているかわかる
// promiseはどんなデータを返すかわかる
// ジェネリック型の利用目的
// ・TypeScriptにおける型安全性を高める事ができる
// ・自動補完等の開発サポートを向上することができる。


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