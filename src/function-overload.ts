// functionオーバロード

type Combineable = string | number;
type Numericc = number | boolean;

type Universals = Combineable & Numericc;


// 関数の上に関数オーバーロードの記述する
// 意味−２つの引数が両方numberの場合numberを返し、両方ともstringの場合stringを返す。ことをTypeScriptに伝える
// すべての引数の組み合わせに対して定義できる


function add(a: number, b: number): number;//関数のオーバロードの記述
function add(a: string, b: string): string;//関数のオーバロードの記述
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: Combineable, b: Combineable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }

  return a + b;
}

const result3 = add(1, 5);
const result2 = add('Hello', 'TypeScript');

// result2.split('')

function dadd(a: number, b: number): number;
function dadd(a: string, b: string): string;
function dadd(a: string, b: number): string;
function dadd(a: number, b: string): string;
function dadd(a: Combinable, b:Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;

}
const result4 = dadd('Hello', 'Typesctipt') ;
result4.split('');