class Department {
  // private id: string;
  // name: string;
  private employees: string[] = []

  constructor(private id: string, public name: string) {//上と下のコメントアウトの部分を省略した書き方
    // this.id = id;
    // this.name = n;
  }

  describe(this: Department) {
    console.log(`Department: (${this.id}: ${this.name}`)
  }

  addEmployee(employee: string) {
    this.employees.push(employee)
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees)
  }
}

const accounting = new Department('d1','Accounting');
console.log(accounting);

accounting.addEmployee('Max');
accounting.addEmployee('Aun');


accounting.printEmployeeInformation();

accounting.describe();
