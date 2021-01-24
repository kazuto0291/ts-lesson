"use strict";
// オブジェクト指向のアプローチですすめる
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// projectの型-インスタンスを作りたいのでclassとして実装する
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, manday, status) {
        this.id = id;
        this.title = title;
        this.manday = manday;
        this.status = status;
    }
}
// 状態管理するクラスを作成
class ProjectState {
    constructor() {
        this.listeners = []; //関数を格納する
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }
    // イベントリスナーを管理に配列に追加する関数
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    // プロジェクトの追加
    addProject(title, description, manday) {
        const newProject = new Project(Math.random().toString(), title, manday, ProjectStatus.Active);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice()); //コピーの配列を渡す。
        }
    }
}
const projectState = ProjectState.getInstance();
// validationの関数を作成
function validate(validatableInput) {
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
function autobind(_target, _methodName, desciptor) {
    const originalMethod = desciptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
// Component Class
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) { //任意のパラメーターなので存在チェっクが必要
            this.element.id = newElementId;
        }
        this.attach(insertAtStart);
    }
    attach(insertAtBeginning) {
        this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
    }
}
// ProjectList Class //プロジェクトリストのクラス
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = []; //初期化する
        this.configure();
        this.renderContent();
    }
    ;
    configure() {
        projectState.addListener((projects) => {
            const relevantProject = projects.filter(prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active;
                }
                return prj.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProject;
            this.renderProjects();
        });
    }
    ;
    /** ul要素にidを付与*/
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type === 'active' ? '実行中プロジェクト' : '完了プロジェクト';
    }
    // プロジェクトの表示
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = ''; //リストをクリアにしてもう一度０から追加
        for (const prjItem of this.assignedProjects) {
            const listitem = document.createElement('li');
            listitem.textContent = prjItem.title;
            listEl.appendChild(listitem);
        }
    }
}
// ProjectInput Class
class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.mandayInputElement = this.element.querySelector('#manday');
        this.configure();
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    /**
     * inputバリデーション関数
     * 返り値タプル型またはundifind型
     */
    gatherUserInput() {
        const enterdTitle = this.titleInputElement.value;
        const enterdDescription = this.descriptionInputElement.value;
        const enterdManday = this.mandayInputElement.value;
        // 取得した値をチェックする処理
        const titleValidatable = {
            value: enterdTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enterdDescription,
            required: true,
            minLength: 5,
        };
        const mandayValidatable = {
            value: +enterdManday,
            required: true,
            min: 1,
            max: 1000,
        };
        if (!validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(mandayValidatable)) {
            alert('入力値が正しくありません。再度お試しください。');
            return;
        }
        else {
            return [enterdTitle, enterdDescription, +enterdManday]; //parseFloat(enterdManday)-numberにする
        }
    }
    clearInput() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.mandayInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) { //userInputがタプル型が確かめるために配列かどうか確かめる。
            const [title, desc, manday] = userInput;
            // 状態を管理するクラスのaddProject関数を使う（プロジェクトの追加）
            projectState.addProject(title, desc, manday);
            // console.log(title, desc, manday);
            this.clearInput();
        }
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedProjList = new ProjectList('finished');
//# sourceMappingURL=app.js.map