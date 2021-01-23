// オブジェクト指向のアプローチですすめる

// Validation:バリデーションのロジック
// validatabaleのインターフェースを作成
interface Validatable {
  value: string | number;
  // オプションのプロパティーなので？をつける
  required?: boolean; //矢印？をつけるのと undefiandをつけるのは同じ → boolean | undifind;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

// validationの関数を作成
function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    // 入力されいるかどうか
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  // 最小文字数の制限
  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  // 最大文字数の制限
  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  // 最小値のチェック
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  // 最大値のチェック
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

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

// ProjectList Class //プロジェクトリストのクラス
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: 'active' | 'finished') { //constructorで必要な要素への参照を取得
    this.templateElement = document.getElementById(
      'project-list',
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`
    this.attach()
    this.renderContent();
  };

  private attach() {//画面描画する関数
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }

  /** ul要素にidを付与*/
  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type === 'active' ? '実行中プロジェクト' : '完了プロジェクト'
  }
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
   * 返り値タプル型またはundifind型
   */
  private gatherUserInput(): [string, string, number] | void {
    const enterdTitle = this.titleInputElement.value;
    const enterdDescription = this.descriptionInputElement.value;
    const enterdManday = this.mandayInputElement.value;
    // 取得した値をチェックする処理
    const titleValidatable: Validatable = {
      value: enterdTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enterdDescription,
      required: true,
      minLength: 5,
    };
    const mandayValidatable: Validatable = {
      value: +enterdManday,
      required: true,
      min: 1,
      max: 1000,
    };
    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(mandayValidatable)
      ) {
      alert('入力値が正しくありません。再度お試しください。');
      return;
    } else {
      return [enterdTitle, enterdDescription, +enterdManday];//parseFloat(enterdManday)-numberにする
    }
  }

  private clearInput() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.mandayInputElement.value= '';
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    console.log(this.titleInputElement.value)
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) { //userInputがタプル型が確かめるために配列かどうか確かめる。
      const [title, desc, manday] = userInput;
      console.log(title, desc, manday);
      this.clearInput();
    }
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

const activePrjList = new ProjectList('active');
const finishedProjList = new ProjectList('finished');

