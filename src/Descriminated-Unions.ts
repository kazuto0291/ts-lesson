// Descriminated Unions・・・判別されるunion型
// union型に含まれるすべてのオブジェクトまたはインターフェースが持つ共通のプロパティーを持っている場合、そのプロパティによってどのオブジェクトということを判別することができる
// ない場合はリテラル型で行う
// タイプミスも防ぐことができる--typescriptが予測してくれるから
// union型を使うときにtypegardを実装すること楽にする。
// オブジェクト型を扱うときに便利です。

// インターフェースのときはinstanceofが使えない
// 理由はインターフェースはjsにコンパイルされないからJsのコードがない（コンストラクター関数・クラスとして存在しない）ので判断できない

// // Descriminated Unions・・・判別されるunion型
// インターフェースにリテラル型を定義する
interface Bird {
  type: 'bird',//リテラル型
  flyingSpeed: number;
}

interface Horse {
  type: 'horse'//リテラル型
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  // if ("flyingSpeed" in animal) {//inを使う場合
  //   console.log(animal.flyingSpeed)
  // }
// Descriminated Unionsの場合
// リテラル型でおいた方を使ってswich文のcaseで場合分けをする
let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }
  console.log('移動速度: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});