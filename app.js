function add(n1, n2) {
    return n1 + n2;
}
function printResult(num) {
    console.log('Result: ' + num);
}
var combinevalues;
combinevalues = add;
// combinevalues = printResult;
// combinevalues = 5;
console.log(combinevalues(8, 8));
printResult(add(5, 12));
