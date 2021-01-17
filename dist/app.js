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
// ・関数の引数を柔軟にするために使う
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
function countAndDescribe(element) {
    var descriptionText = '値がありません';
    if (element.length > 0) {
        descriptionText = "\u5024\u306F" + element.length + "\u500B\u3067\u3059\u3002";
    }
    return [element, descriptionText];
}
console.log(countAndDescribe("お疲れさまです"));
// key of の制約
function extractAndConvert(obj, key) {
    return "Value: " + obj[key]; //keyがあると保証されていないのでエラーが出るのでジェネリック型を使いkeyof制約を利用する。
}
extractAndConvert({ name: 'Max' }, "name");
//# sourceMappingURL=app.js.map