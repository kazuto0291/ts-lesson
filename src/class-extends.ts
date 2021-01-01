// // クラスのプロパティとはクラスの変数です。
// class Department {
//   // private readonly id: string;//readonlyは値を変更できない
//   // name: string;
//   private employees: string[] = []

//   constructor(private readonly id: string, public name: string) {//上と下のコメントアウトの部分を省略した書き方
//     // this.id = id;
//     // this.name = n;
//   }

//   describe(this: Department) {
//     console.log(`Department: (${this.id}): ${this.name}`)
//   }

//   addEmployee(employee: string) {
//     this.employees.push(employee)
//   }

//   printEmployeeInformation() {
//     console.log(this.employees.length);
//     console.log(this.employees)
//   }
// }

// // 継承
// class ITDepartment extends Department {
//   admins: string[];//コンストラクターに定義しているので省略できる
//   constructor(id: string,  admins: string[]) {
//     super(id, 'IT');//コンストラクターの情報を継承元のクラスのコンストラクターに値を渡すためにsuperを使う
//     this.admins = admins;//コンストラクターに定義しているので省略できる
//   }
// }

// const it = new ITDepartment('d1',['Max']);
// console.log(it);

// it.addEmployee('Max');
// it.addEmployee('Aun');

// console.log(it, 'it')

// it.printEmployeeInformation();

// it.describe();

// //継承
// class AccountingDepartment extends Department {
//   constructor(id: string, private reports: string[]) {
//     super(id, 'Accounting');
//   }
//   addReport(text: string) {
//     this.reports.push(text);
//   }

//   printReports() {
//     console.log(this.reports)
//   }

// }

// const accounting = new AccountingDepartment('d2',[]);
// accounting.addReport('Something');
// accounting.printReports();