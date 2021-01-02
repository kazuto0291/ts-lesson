"use strict";
// インターフェースには構造だけ設定できる
// インターフェースはオブジェクトの型を定義するため
// インターフェースは実際の実装内容や具体的な値を持つことできない、
// インターフェースを実装するクラスがそれがどういう機能持っているかという構造を定義できる。
var Person = /** @class */ (function () {
    function Person(n, age) {
        this.name = n;
        this.age = age;
    }
    Person.prototype.greet = function (phrase) {
        console.log(phrase + ' ' + this.name);
    };
    return Person;
}());
var user1;
user1 = {
    name: 'Max',
    age: 30,
    greet: function (phrase) {
        console.log(phrase + '' + this.name);
    },
};
//# sourceMappingURL=app.js.map