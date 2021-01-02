// 型ガード||typegard（union型を使うときに役に立つ）
// どの型が変数や定数に入っているか知りたいときに使う
// 複数の方に対応した関数を作るときに便利
// 関数の引数がunion型
// 渡される引数の型をif文で判断して処理を変えることを型ガードという
// 渡される引きルウの型によって実行される処理を変える
// 型を調べる方法
// ・typeof はJavaScript上でのデータ型を調べるものオブジェクト型は調べられない
// ・in を使うとオブジェクトにプロパティーが存在するかどうか調べられる.クラスでも使える
// ・iinstanceofをつかう（プロパティー名前を書き間違えないメリット）そのクラスをもとにできたオブジェクトかどうか判断してそのクラスのメソッドを呼び出すことができる
// クラス場合はJSがコンストラクター関数またはクラスとしてサポートしているのでiinstanceofが使える
// ===============================
// 型ガードとは結局は用語である
// オブジェクトにメソッドやプロパティーがあることをチェックした上で特定の処理を実行するという概念を表す言葉
// 型ガードを使うことで、union型を使った型を限定しないコードを書くことができる、それと同時に特定の型の場合のみ実行できる処理を書くことができる。

type Combinable3 = string | number;
type Numeric2 = number | boolean;

type Universal2 = Combinable3 & Numeric2;

function add(a: Combinable3, b: Combinable3) {
  if (typeof a === 'string' || typeof b === 'string') {//このif文が型ガード
    return a.toString() + b.toString();
  }
  return a + b;
}

// オブジェクトの型ガード

/// typeof はJavaScript上でのデータ型を調べるものオブジェクト型は調べられない
// ・in を使うとオブジェクトにプロパティーが存在するかどうか調べられる
type UnknownEmployee = Employee | Admin;
function PrintEmloyeeInformation(emp :UnknownEmployee) {
  console.log(emp.name);
  if ('privileges' in emp) {
    console.log(emp.privileges)
  }
  if ('startDate' in emp) {
    console.log(emp.startDate)
  }
}

PrintEmloyeeInformation({name: 'Manu', startDate: new Date()});

// クラスの型ガード

class Car {
  drive() {
    console.log('運転中...');
  }
}

class Truck {
  drive() {
    console.log("トラックを運転中...")
  }

  loadCargo(amount: number) {
    console.log("荷物を載せています..." + amount)
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {//型ガード
    vehicle.loadCargo(1000)
  }
}

useVehicle(v1);
useVehicle(v2);
