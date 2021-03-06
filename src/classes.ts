// クラスのプロパティとはクラスの変数です。
class Department {
  static fiscalYear = 2020;
  // private readonly id: string;//readonlyは値を変更できない
  // name: string;
  protected employees: string[] = [];

  static createEmployee(name: string) {
    return {name: name};
  }

  constructor(private readonly id: string, public name: string) {//上と下のコメントアウトの部分を省略した書き方
    // this.id = id;
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Department: (${this.id}): ${this.name}`)
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees)
  }
}

// 継承
class ITDepartment extends Department {
  admins: string[];//コンストラクターに定義しているので省略できる
  constructor(id: string,  admins: string[]) {
    super(id, 'IT');//コンストラクターの情報を継承元のクラスのコンストラクターに値を渡すためにsuperを使う
    this.admins = admins;//コンストラクターに定義しているので省略できる
  }
}

const it = new ITDepartment('d1',['Max']);
console.log(it);

it.addEmployee('Max');
it.addEmployee('Aun');

console.log(it, 'it')

it.printEmployeeInformation();

it.describe();

//継承
class AccountingDepartment extends Department {
  private lastReport:string;

  get mostRecnetReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("レポートが見つかりません。")
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('正しい値を入れてください')
    }
    this.addReport(value)
  }

  constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  printReports() {
    console.log(this.reports)
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }

}

const accounting = new AccountingDepartment('d2',[]);

accounting.mostRecentReport = '通気会計レポート';
accounting.addReport('Something');
console.log(accounting.mostRecnetReport);
accounting.printReports();

accounting.addEmployee('Max');
accounting.addEmployee('Manu');

accounting.printEmployeeInformation();


const employee1 = Department.createEmployee('Tom');
console.log(employee1, Department.fiscalYear)