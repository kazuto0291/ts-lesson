// 交差型は２つのオブジェクトの型を一つの型にするのに便利（アンパサンドでつなぐ）
// 交差型はunion型の共通の型が適用される
type Admin = {
  name: string;
  privileges: string[];
}

type Employee = {
  name: string;
  startDate: Date;
}

type ElevatedEmploee = Admin & Employee;

const e1: ElevatedEmploee = {
  name: 'Mac',
  privileges: ['create-server'],
  startDate: new Date(),
}

// インターフェースvar
interface InterAdmin  {
  name: string;
  privileges: string[];
}

interface InterEmployee  {
  name: string;
  startDate: Date;
}

interface InterElevatedEmploee extends Admin ,Employee{}

const e2: ElevatedEmploee = {
  name: 'Mac',
  privileges: ['create-server'],
  startDate: new Date(),
}


// ===============================
type Combinable2 = string | number;
type Numeric = number | boolean;

type Universal = Combinable2 & Numeric;
