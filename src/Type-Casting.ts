// Type Casting（型キャスト）--typescriptがある特定の型であるということをはっきりと明確に推論できないときに使う
// typescriptに型を伝える方法
// typescriptはHTMLファイルの改正は行わない、なので詳しいタグがわからない
// 二通りある
// ＜＞の場合はReactのJSXとかぶるからasをつかう
// ！(エクスクラメーションマーク)はTypeScriptに対して前の式が返すものは絶対にnullではないと伝える
// ！(エクスクラメーションマーク)はを使わない場合はif文で行う
const paragraphP = document.querySelector('p');
const userOutputElement = document.getElementById("message-output")! as HTMLInputElement;
const userInputElement = <HTMLInputElement>document.getElementById("message-input")!;
const userInputElement2 = document.getElementById("message-input");

userInputElement.value = 'こんにちは';
userOutputElement.value = 'こんばんは'



if (userInputElement2) {
  (userInputElement2 as HTMLInputElement).value = 'こんばんは'
}