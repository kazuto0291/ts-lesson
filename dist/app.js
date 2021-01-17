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
// デコレータをカスタマイズする
function Logger(logString) {
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
// デコレータ関数を実行する関数を返す
let Person1 = class Person1 {
    constructor() {
        this.name = 'Max';
        console.log("Personオブジェクトを作成中...");
    }
};
Person1 = __decorate([
    Logger("ログ出力 - PERSON")
], Person1);
const pers = new Person1();
console.log(pers);
//# sourceMappingURL=app.js.map