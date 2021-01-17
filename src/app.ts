// function Logger(constructor: Function) {
//   console.log('ログ出力中')
//   console.log(constructor)
// }


// デコレータをカスタマイズする
function Logger(logString: string) {
  return function(constructor: Function) {
    console.log(logString)
    console.log(constructor)
  }
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

function WithTemplate(template: string, hookId: string) {
  // return function( _: Function) { //アンダースコアは引数を受け取るけど使わないことを示す
  return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
    return class extends originalConstructor {
      constructor(..._: any[]) { //アンダースコアは引数を受け取るけど使わないことを示す
      super();  //オリジナルのクラスの情報を引き継ぐ
      console.log('テンプレートを表示')
      const hookEl = document.getElementById(hookId);
      if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = this.name;
    }
      }
    }
  }
}
@Logger("ログ出力 - PERSON")
@WithTemplate("<h1>Personオブジェクト</h1>", "app")
class Person3 {
  name = "masaya"
  constructor() {
    console.log("Person３オブジェクトを作成中")
  }
}

const pers3 = new Person3();

console.log(pers3);

// ーーーーーーー
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property デコレーター");
  console.log(target, propertyName);
}

function Log2(target: any, name:string, descriptor: PropertyDescriptor) {
  console.log("Accessor デコレーター");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string| Symbol, descriptor: PropertyDescriptor) {
    console.log("Method デコレーター");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number ) {
  console.log("parameter デコレーター");
  console.log(target);
  console.log(name);
  console.log(position);
}
class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('不正な価格です。- 0以下は設定できません')
    }
  }

  constructor(t:string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * ( 1 + tax);
  }
}


const p1 = new Product("Book", 100);
const p2 = new Product("Book2", 200);

// デコレータの実行タイミングはクラスが定義されたときに実行される。
// methodがクラスに登録されたときに実行される。
// デコレータはクラスに機能を追加することができます。
// デコレータはイベントリスナーじゃない、プロパティーアクセスされたときにも実行されない

// クラスデコレータとメソッドデコレータは値を返すことができる。
// クラスデコレーターはconstructor関数(class)を返すことができる。


// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  return adjDescriptor;
}

class Printer {
  messge = 'クリックしました！'

  @Autobind
  showMessage() {
    console.log(this.messge);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
button.addEventListener('click', p.showMessage)


// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
// デコレータを使ったバリデーション
// ＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝＝
class Course {
  title: string;
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}