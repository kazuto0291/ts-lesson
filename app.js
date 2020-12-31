function combine(input1, input2) {
    var result;
    // 型がわからないのを足すことをtypescriptはエラーを出すので
    // ランタイム上でデータ型をチェックすることで解消できる（typeofを使う）
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var combinedAges = combine(30, 26);
console.log(combinedAges);
var combinedNames = combine('Max', 'Anna');
console.log(combinedNames);
