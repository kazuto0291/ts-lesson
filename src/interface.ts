// インターフェースには構造だけ設定できる
// インターフェースはオブジェクトの型を定義するため
// インターフェースは実際の実装内容や具体的な値を持つことできない、
// インターフェースを実装するクラスがそれがどういう機能持っているかという構造を定義できる。
// インターフェースを分ける理由
// インターフェースの拡張しやすくなる
// オブジェクト型の定義がしやすくなる
// クラスは複数継承できないがインターフェースは複数から継承できる
// インターフェースはオブジェクト型を定義するが、関数の構造定義に使える。

// type AddFn = (a:number, b:number) => number;


interface Named {
  readonly name?: string;
  outputName?: string;
}
interface Greetable extends Named {
  greet(phrase: string): void;
}

class Person implements Greetable {
  name?: string;
  age :number;
  constructor(n: string, age: number) {
    if(n) {
      this.name = n;
    }
    this.age = age
  }
  greet(phrase:string) {
    console.log(phrase + ' ' + this.name)
  }
}


let user1: Person;

user1 = {
  name: 'Max',
  age: 30,
  greet(phrase: string) {
    console.log(phrase + '' + this.name);
  },
};


interface Bread {
  calories: number
}

interface Bread {
  type: string
}

const francePan: Bread = {
  type:"hard",
  calories: 88
}