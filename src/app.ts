// nullish coalescing ooerate--null 合体演算子
// nullとundefind以外のfalsyな値を取得したいときに使う機能


const userInput2 = null;
const userInput3 = '';


const storedData = userInput2 || 'DEFAUT'; //論理or演算子
// userInput2がfalsy（null,undefind,''）な値のとき二番目の値を取得する書き方
console.log(storedData)//'DEFAUT'

const storedData3 = userInput3 || 'DEFAUT'; //論理or演算子
// userInput3が null/undeind な値のときのみ二番目の値を取得する書き方
console.log(storedData3)//DEFAUT'


const storedData2 = userInput3 ?? 'DEFAUT'; //nullish coalescing ooerate--null 合体演算子
// userInput3が null/undeind な値のときのみ二番目の値を取得する書き方
console.log(storedData2);//''

