function Logger(constructor: Function) {
  console.log('ログ出力中')
  console.log(constructor)
}

@Logger
class Person1 {
  name = 'Max';
  
  constructor() {
    console.log("Personオブジェクトを作成中...");
  }
}

const pers = new Person1();

console.log(pers);