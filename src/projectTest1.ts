// // オブジェクト指向のアプローチですすめる

// //Drag & Drop ドラック＆ドロップ
// interface Draggable {
//   dragStartHandler(event: DragEvent): void;
//   dragEndHndler(event: DragEvent):void;
// }
// interface DragTarget {
//   dragOverHandler(event: DragEvent): void;
//   dropHandler(event: DragEvent): void;
//   dragLeaveHandler(event: DragEvent): void;
// }

// // projectの型-インスタンスを作りたいのでclassとして実装する
// enum ProjectStatus {
//   Active, Finished
// }
// class Project {
//   constructor(
//     public id: string,
//     public title: string,
//     public description: string,
//     public manday: number,
//     public status:ProjectStatus,
//     ) {}
// }


// // Project State Management//プロジェクトの状態を管理する
// type Listener<T> = (items: T[]) => void; //カスタム型

// class State<T> {
//   protected listeners: Listener<T>[] = [];//関数を格納する
//   // イベントリスナーを管理に配列に追加する関数
//   addListener(listenerFn: Listener<T>) {
//     this.listeners.push(listenerFn);
//   }

// }

// // 状態管理するクラスを作成
// class ProjectState extends State<Project>{
//   private projects: Project[] = [];
//   private static instance: ProjectState;

//   private constructor() {
//     super();
//   }

//   static getInstance() {
//     if (this.instance) {
//       return this.instance
//     }
//     this.instance = new ProjectState();
//     return this.instance;
//   }

//   // プロジェクトの追加
//   addProject(title: string, description: string, manday: number) {
//     const newProject = new Project(
//       Math.random().toString(),
//       title,
//       description,
//       manday,
//       ProjectStatus.Active
//     );
//     this.projects.push(newProject);
//     this.updateListeners();
//   }

//   // drag&dropでProjectのステータスを変更する関数
//   moveProject(projectId: string, newStatus: ProjectStatus) {
//     const project = this.projects.find(project => project.id === projectId); //見つけたらtrueが還る。
//     if (project && project.status !== newStatus) { //projectがnullじゃなければ＆＆statusが本当に変わったかどうかのチェック
//       project.status = newStatus;
//       this.updateListeners();
//     }
//   }
//   // 一覧を再表示する関数
//   private updateListeners() {
//     for (const listenerFn of this.listeners) {
//       listenerFn(this.projects.slice());//コピーの配列を渡す。
//     }
//   }
// }

// const projectState = ProjectState.getInstance();

// // Validation:バリデーションのロジック
// // validatabaleのインターフェースを作成
// interface Validatable {
//   value: string | number;
//   // オプションのプロパティーなので？をつける
//   required?: boolean; //矢印？をつけるのと undefiandをつけるのは同じ → boolean | undifind;
//   minLength?: number;
//   maxLength?: number;
//   min?: number;
//   max?: number;
// }

// // validationの関数を作成
// function validate(validatableInput: Validatable) {
//   let isValid = true;
//   if (validatableInput.required) {
//     // 入力されいるかどうか
//     isValid = isValid && validatableInput.value.toString().trim().length !== 0;
//   }
//   // 最小文字数の制限
//   if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
//     isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
//   }
//   // 最大文字数の制限
//   if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
//     isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
//   }
//   // 最小値のチェック
//   if (validatableInput.min != null && typeof validatableInput.value === 'number') {
//     isValid = isValid && validatableInput.value >= validatableInput.min;
//   }
//   // 最大値のチェック
//   if (validatableInput.max != null && typeof validatableInput.value === 'number') {
//     isValid = isValid && validatableInput.value <= validatableInput.max;
//   }
//   return isValid;
// }

// // autoBind decorator//バインドのデコレーターを作成
// function autobind(
//   _target: any,
//   _methodName: string,
//   desciptor: PropertyDescriptor,
// ) {
//   const originalMethod = desciptor.value;
//   const adjDescriptor: PropertyDescriptor = {
//     configurable: true,
//     get() {
//       const boundFn = originalMethod.bind(this);
//       return boundFn;
//     }
//   }
//   return adjDescriptor;
// }

// // Component Class
//   abstract class Component<T extends HTMLElement, U extends HTMLElement> {
//     templateElement: HTMLTemplateElement;
//     hostElement: T;
//     element: U;

//     constructor(
//       templateId: string,
//       hostElementId: string,
//       insertAtStart: boolean,
//       newElementId?: string
//       ) {
//       this.templateElement = document.getElementById(
//         templateId,
//       )! as HTMLTemplateElement;
//       this.hostElement = document.getElementById(hostElementId)! as T;

//       const importedNode = document.importNode(
//         this.templateElement.content,
//         true,
//       );
//       this.element = importedNode.firstElementChild as U;
//       if (newElementId) {//任意のパラメーターなので存在チェっクが必要
//         this.element.id = newElementId;
//       }
//       this.attach(insertAtStart);
//     }

//     abstract configure(): void;
//     abstract renderContent(): void;

//     private attach(insertAtBeginning: boolean) {//画面描画する関数
//       this.hostElement.insertAdjacentElement(
//         insertAtBeginning ? 'afterbegin' : 'beforeend',
//         this.element
//       );
//     }
//   }


// // ProjectItem Class
// // 一つ一つのプロジェクトをリストの項目として表示する為のクラス
// class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
//   private project: Project;

//   get manday() {
//     if (this.project.manday < 20) {
//       return this.project.manday.toString() + '人日';
//     } else {
//       return (this.project.manday / 20).toString() + '人月';
//     }
//   }

//   constructor(hostId: string, project: Project) {
//     super('single-project', hostId, false, project.id);
//     this.project = project;

//     this.configure();
//     this.renderContent();
//   }

//   @autobind
//   dragStartHandler(event: DragEvent) {
//     event.dataTransfer!.setData('text/plain', this.project.id);
//     event.dataTransfer!.effectAllowed = 'move';
//   }

//   dragEndHandler(_: DragEvent) {
//     console.log("Drag終了")
//   }

//   configure() {
//     this.element.addEventListener('dragstart', this.dragStartHandler);
//     this.element.addEventListener('dragend', this.dragEndHandler)
//   }
//   renderContent() {
//     this.element.querySelector('h2')!.textContent = this.project.title;
//     this.element.querySelector('h3')!.textContent = this.manday; //getter関数が実行される
//     this.element.querySelector('p')!.textContent = this.project.description;
//   }
// }

// // ProjectList Class //プロジェクトリストのクラス
// class ProjectList extends Component<HTMLDivElement,HTMLElement> implements DragTarget {
//   assignedProjects: Project[];

//   constructor(private type: 'active' | 'finished') { //constructorで必要な要素への参照を取得
//     super('project-list', 'app', false, `${type}-projects`)
//     this.assignedProjects = []; //初期化する

//     this.configure();
//     this.renderContent();
//   };

//   @autobind
//   dragOverHandler(event: DragEvent) {
//     if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
//       event.preventDefault();
//       const listEl = this.element.querySelector('ul')!;
//       listEl.classList.add('droppable');
//     }
//   }

//   @autobind
//   dropHandler(event: DragEvent) {
//     const projectId = event.dataTransfer!.getData('text/plain');
//     projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
//   }

//   @autobind
//   dragLeaveHandler(event: DragEvent) {
//     const listEl = this.element.querySelector('ul');
//     listEl!.classList.remove('droppable');
//   }

//   configure() {
//     this.element.addEventListener('dragover', this.dragOverHandler);
//     this.element.addEventListener('drop', this.dropHandler);
//     this.element.addEventListener('dragleave', this.dragLeaveHandler);

//     projectState.addListener((projects: Project[]) => {
//       const relevantProject = projects.filter(prj => {
//         if (this.type === 'active') {
//           return prj.status === ProjectStatus.Active;
//         }
//         return prj.status === ProjectStatus.Finished;
//       })
//       this.assignedProjects = relevantProject;
//       this.renderProjects();
//     });
//   };

//   /** ul要素にidを付与*/
//   renderContent() {
//     const listId = `${this.type}-projects-list`;
//     this.element.querySelector('ul')!.id = listId;
//     this.element.querySelector('h2')!.textContent = this.type === 'active' ? '実行中プロジェクト' : '完了プロジェクト'
//   }

//   // プロジェクトの表示
//   private renderProjects() {
//     const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
//     listEl.innerHTML = '';//リストをクリアにしてもう一度０から追加
//     for (const prjItem of this.assignedProjects) {
//       new ProjectItem(listEl.id, prjItem);
//     }
//   }
// }

// // ProjectInput Class
// class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
//   titleInputElement: HTMLInputElement;
//   descriptionInputElement: HTMLInputElement;
//   mandayInputElement: HTMLInputElement;

//   constructor() {// constructorは、要素の参照を行う
//     super('project-input', 'app', true ,'user-input')

//     this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
//     this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
//     this.mandayInputElement = this.element.querySelector('#manday') as HTMLInputElement;
//     this.configure();
//   }

//   public configure() {
//     this.element.addEventListener('submit', this.submitHandler);
//   }
//   renderContent() {}

//   /**
//    * inputバリデーション関数
//    * 返り値タプル型またはundifind型
//    */
//   private gatherUserInput(): [string, string, number] | void {
//     const enterdTitle = this.titleInputElement.value;
//     const enterdDescription = this.descriptionInputElement.value;
//     const enterdManday = this.mandayInputElement.value;
//     // 取得した値をチェックする処理
//     const titleValidatable: Validatable = {
//       value: enterdTitle,
//       required: true,
//     };
//     const descriptionValidatable: Validatable = {
//       value: enterdDescription,
//       required: true,
//       minLength: 5,
//     };
//     const mandayValidatable: Validatable = {
//       value: +enterdManday,
//       required: true,
//       min: 1,
//       max: 1000,
//     };
//     if (
//       !validate(titleValidatable) ||
//       !validate(descriptionValidatable) ||
//       !validate(mandayValidatable)
//     ) {
//       alert('入力値が正しくありません。再度お試しください。');
//       return;
//     } else {
//       return [enterdTitle, enterdDescription, +enterdManday];//parseFloat(enterdManday)-numberにする
//     }
//   }

//   private clearInput() {
//     this.titleInputElement.value = '';
//     this.descriptionInputElement.value = '';
//     this.mandayInputElement.value = '';
//   }

//   @autobind
//   private submitHandler(event: Event) {
//     event.preventDefault();
//     console.log(this.titleInputElement.value)
//     const userInput = this.gatherUserInput();
//     if (Array.isArray(userInput)) { //userInputがタプル型が確かめるために配列かどうか確かめる。
//       const [title, desc, manday] = userInput;
//       // 状態を管理するクラスのaddProject関数を使う（プロジェクトの追加）
//       projectState.addProject(title, desc, manday);
//       // console.log(title, desc, manday);
//       this.clearInput();
//     }
//   }
//   //  privateはclassの内側からしかアクセスできない

// }


// const prjInput = new ProjectInput();

// const activePrjList = new ProjectList('active');
// const finishedProjList = new ProjectList('finished');

