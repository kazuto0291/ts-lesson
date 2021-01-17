"use strict";
function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError('エラーが発生しました', 500);
// 値を返さないだけでなく、値を返すことは絶対にありえない,
// なぜならスクリプトをクラッシュさせるから
// void型でも問題ないがコードの品質の観点からneverを指定することで明確に表す事ができる。
// never型の使い所はエラーのthrow と無限ループの時
const result = generateError('エラーが発生しました', 500);
console.log(result);
//# sourceMappingURL=never.js.map