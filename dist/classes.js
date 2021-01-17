"use strict";
// クラスのプロパティとはクラスの変数です。
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // private readonly id: string;//readonlyは値を変更できない
        // name: string;
        this.employees = [];
        // this.id = id;
        // this.name = n;
    }
    static createEmployee(name) {
        return { name: name };
    }
    describe() {
        console.log(`Department: (${this.id}): ${this.name}`);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2020;
// 継承
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'IT'); //コンストラクターの情報を継承元のクラスのコンストラクターに値を渡すためにsuperを使う
        this.admins = admins; //コンストラクターに定義しているので省略できる
    }
}
const it = new ITDepartment('d1', ['Max']);
console.log(it);
it.addEmployee('Max');
it.addEmployee('Aun');
console.log(it, 'it');
it.printEmployeeInformation();
it.describe();
//継承
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, 'Accounting');
        this.reports = reports;
        this.lastReport = reports[0];
    }
    get mostRecnetReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("レポートが見つかりません。");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error('正しい値を入れてください');
        }
        this.addReport(value);
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReports() {
        console.log(this.reports);
    }
    addEmployee(name) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }
}
const accounting = new AccountingDepartment('d2', []);
accounting.mostRecentReport = '通気会計レポート';
accounting.addReport('Something');
console.log(accounting.mostRecnetReport);
accounting.printReports();
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.printEmployeeInformation();
const employee1 = Department.createEmployee('Tom');
console.log(employee1, Department.fiscalYear);
//# sourceMappingURL=classes.js.map