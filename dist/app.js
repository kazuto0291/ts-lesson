"use strict";
// ジェネリック型とは、他の特定の型と結合された型です。
// Array<string> 配列と文字列
// Array<number> 配列と数字
// ジェネリック型が利用されているのは、配列とpromise
// arrayはどんなデータが格納されているかわかる
// promiseはどんなデータを返すかわかる
// ジェネリック型の利用目的
// ・TypeScriptにおける型安全性を高める事ができる
// ・自動補完等の開発サポートを向上することができる。
var namesPre = [];
var names = ['Max', 'Manuel'];
var promise = new Promise(function (resolve, reject) {
    setTimeout(function () {
        resolve('終わりました。');
    }, 2000);
});
promise.then(function (data) {
    data.split('');
});
// 独自のジェネリック型を作る
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
var mergedObj = merge({ name: 'Max' }, { age: 30 });
console.log(mergedObj);
console.log(mergedObj.age);
function mergeEx(objA, objB) {
    return Object.assign(objA, objB);
}
var mergedObjEx = mergeEx({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObjEx);
console.log(mergedObjEx.age);
//# sourceMappingURL=app.js.map