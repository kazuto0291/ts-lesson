// インターフェースには構造だけ設定できる
// インターフェースはオブジェクトの型を定義するため
// インターフェースは実際の実装内容や具体的な値を持つことできない、
// インターフェースを実装するクラスがそれがどういう機能持っているかという構造を定義できる。

interface Greetable {
  readonly name:string;
  greet(phrase: string): void;
}

class Person implements Greetable {
  name: string;
  age :number;
  constructor(n: string, age: number) {
    this.name = n;
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