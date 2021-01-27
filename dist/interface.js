"use strict";
// インターフェースには構造だけ設定できる
// インターフェースはオブジェクトの型を定義するため
// インターフェースは実際の実装内容や具体的な値を持つことできない、
// インターフェースを実装するクラスがそれがどういう機能持っているかという構造を定義できる。
// インターフェースを分ける理由
// インターフェースの拡張しやすくなる
// オブジェクト型の定義がしやすくなる
// クラスは複数継承できないがインターフェースは複数から継承できる
// インターフェースはオブジェクト型を定義するが、関数の構造定義に使える。
class Person {
    constructor(n, age) {
        if (n) {
            this.name = n;
        }
        this.age = age;
    }
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
}
let user1;
user1 = {
    name: 'Max',
    age: 30,
    greet(phrase) {
        console.log(phrase + '' + this.name);
    },
};
const francePan = {
    type: "hard",
    calories: 88
};
//# sourceMappingURL=interface.js.map