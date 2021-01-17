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
@Logger("ログ出力 - PERSON")
class Person1 {
  name = 'Max';
  
  constructor() {
    console.log("Personオブジェクトを作成中...");
  }
}

const pers = new Person1();

console.log(pers);