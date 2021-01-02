"use strict";
// Descriminated Unions・・・判別されるunion型
// union型に含まれるすべてのオブジェクトまたはインターフェースが持つ共通のプロパティーを持っている場合、そのプロパティによってどのオブジェクトということを判別することができる
// ない場合はリテラル型で行う
// タイプミスも防ぐことができる--typescriptが予測してくれるから
// union型を使うときにtypegardを実装すること楽にする。
// オブジェクト型を扱うときに便利です。
function moveAnimal(animal) {
    // if ("flyingSpeed" in animal) {//inを使う場合
    //   console.log(animal.flyingSpeed)
    // }
    // Descriminated Unionsの場合
    // リテラル型でおいた方を使ってswich文のcaseで場合分けをする
    var speed;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('移動速度: ' + speed);
}
moveAnimal({ type: 'bird', flyingSpeed: 10 });
//# sourceMappingURL=app.js.map