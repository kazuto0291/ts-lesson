function add(n1: number, n2: number): number {
  return n1 + n2
}

function printResult(num: number) {
  console.log('Result: ' + num);
}

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, (result) => {
  console.log(result)
})

let combinevalues: (a:number, b:number) => number;

combinevalues = add;
// combinevalues = printResult;
// combinevalues = 5;

console.log(combinevalues(8, 8));


printResult(add(5, 12));


function sendRequest(data: string, cb: (response: any) => void) {
  // ... sending a request with "data"
  return cb({data: 'Hi there!'});
}
 
sendRequest('Send this!', (response) => {
  console.log(response);
  return true;
});