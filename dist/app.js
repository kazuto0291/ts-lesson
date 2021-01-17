"use strict";
// function Logger(constructor: Function) {
//   console.log('ログ出力中')
//   console.log(constructor)
// }
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// デコレータをカスタマイズする
function Logger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
// デコレータ関数を実行する関数を返す
// @Logger("ログ出力 - PERSON")
// class Person1 {
//   name = 'Max';
//   constructor() {
//     console.log("Personオブジェクトを作成中...");
//   }
// }
// const pers = new Person1();
// console.log(pers);
// ======================
function WithTemplate(template, hookId) {
    // return function( _: Function) { //アンダースコアは引数を受け取るけど使わないことを示す
    return function (originalConstructor) {
        return class extends originalConstructor {
            constructor(..._) {
                super(); //オリジナルのクラスの情報を引き継ぐ
                console.log('テンプレートを表示');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1').textContent = this.name;
                }
            }
        };
    };
}
let Person3 = class Person3 {
    constructor() {
        this.name = "masaya";
        console.log("Person３オブジェクトを作成中");
    }
};
Person3 = __decorate([
    Logger("ログ出力 - PERSON"),
    WithTemplate("<h1>Personオブジェクト</h1>", "app")
], Person3);
const pers3 = new Person3();
console.log(pers3);
// ーーーーーーー
function Log(target, propertyName) {
    console.log("Property デコレーター");
    console.log(target, propertyName);
}
function Log2(target, name, descriptor) {
    console.log("Accessor デコレーター");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log3(target, name, descriptor) {
    console.log("Method デコレーター");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
function Log4(target, name, position) {
    console.log("parameter デコレーター");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error('不正な価格です。- 0以下は設定できません');
        }
    }
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const p1 = new Product("Book", 100);
const p2 = new Product("Book2", 200);
// デコレータの実行タイミングはクラスが定義されたときに実行される。
// methodがクラスに登録されたときに実行される。
// デコレータはクラスに機能を追加することができます。
// デコレータはイベントリスナーじゃない、プロパティーアクセスされたときにも実行されない
// クラスデコレータとメソッドデコレータは値を返すことができる。
// クラスデコレーターはconstructor関数(class)を返すことができる。
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.messge = 'クリックしました！';
    }
    showMessage() {
        console.log(this.messge);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector("button");
button.addEventListener('click', p.showMessage);
//# sourceMappingURL=app.js.map