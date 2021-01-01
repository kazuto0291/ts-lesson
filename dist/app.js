function generateError(message, code) {
    throw { message: message, errorCode: code };
}
generateError('エラーが発生しました', 500);
// 値を返さないだけでなく、値を返すことは絶対にありえない
var result = generateError('エラーが発生しました', 500);
console.log(result);
