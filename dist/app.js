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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
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
// ジェネリッククラスを作る
// ジェネリッククラスを使う場面
// クラスがにとって受け取るもの（item）の型が統一されていることがわかればいい
// ジェネリック型に型情報を渡すだけで高い柔軟性を得ることができ、高い型安全性(typescriptの型のサポート)も得る
var DataStorage = /** @class */ (function () {
    function DataStorage() {
        this.data = [];
    }
    // dataにitemを追加する関数
    DataStorage.prototype.addItem = function (item) {
        this.data.push(item);
    };
    // dataからitemを削除する関数
    DataStorage.prototype.removeItem = function (item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); //indexOfはプリミティブがたのみ参照型（配列、オブジェクト）は-1をかえす
    };
    // dataからitemを取得する関数
    DataStorage.prototype.getItem = function () {
        return __spreadArrays(this.data);
    };
    return DataStorage;
}());
var textStorage = new DataStorage();
textStorage.addItem("data1");
textStorage.addItem("data2");
textStorage.addItem("data3");
textStorage.removeItem("data1");
console.log(textStorage.getItem());
var numberStorage = new DataStorage();
numberStorage.addItem(12);
// 使用時の問題点ーオブジェクトは参照型
var objStorage = new DataStorage(); //union型で使いたいプリミティブ型指定することで参照型のオブジェクトを使用するとエラーが出るようにできる
objStorage.addItem({ name: 'Max' });
objStorage.addItem({ name: 'Tom' });
objStorage.addItem({ name: 'Aun' });
objStorage.removeItem({ name: 'Tom' }); //indexOfが参照型のときは-1を返すので最後の値を削除することになる。
console.log(objStorage.getItem());
//# sourceMappingURL=app.js.map