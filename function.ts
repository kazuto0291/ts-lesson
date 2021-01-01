function add(n1: number, n2: number): number {
  return n1 + n2
}

function printResult(num: number) {
  console.log('Result: ' + num);
}

let combinevalues: (a:number, b:number) => number;

combinevalues = add;
// combinevalues = printResult;
// combinevalues = 5;

console.log(combinevalues(8, 8));


printResult(add(5, 12));