// オブジェクト指向のアプローチですすめる

// autoBind decorator//バインドのデコレーターを作成
function autobind(
  _target: any,
  _methodName: string,
  desciptor: PropertyDescriptor,
) {
  const originalMethod = desciptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  }
  return adjDescriptor;
}

// ProjectInput Class
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  mandayInputElement: HTMLInputElement;
  constructor() {// constructorは、要素の参照を行う
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input'
    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.mandayInputElement = this.element.querySelector('#manday') as HTMLInputElement;
    this.configure();
    this.attach();
  }

  /**
   * inputバリデーション関数
   *
   */
  private gatherUserInput(): [string, string, number] | void {
    // 入力値を取得
    const enterdTitle = this.titleInputElement.value;
    const enterdDescription = this.descriptionInputElement.value;
    const enterdManday = this.mandayInputElement.value;
    // 取得した値をチェックする処理
    // 空白ではない
    if (enterdTitle.trim().length === 0 || enterdDescription.trim.length === 0 || enterdManday.trim.length === 0) {
      alert('入力値が正しくありません。再度お試しください。');
      return;
    } else {
      return [enterdTitle, enterdDescription, +enterdManday];//parseFloat(enterdManday)-numberにする
    }

  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value)
    this.titleInputElement.value = ''
    const userInput = this.gatherUserInput();
  }
  //  privateはclassの内側からしかアクセスできない
  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}


const prjInput = new ProjectInput();