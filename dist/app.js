"use strict";
// オブジェクト指向のアプローチですすめる
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
// ProjectInput Class
class ProjectInput {
    constructor() {
        this.templateElement = document.getElementById('project-input');
        this.hostElement = document.getElementById('app');
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.mandayInputElement = this.element.querySelector('#manday');
        this.configure();
        this.attach();
    }
    /**
     * inputバリデーション関数
     * 返り値タプル型またはundifind型
     */
    gatherUserInput() {
        const enterdTitle = this.titleInputElement.value;
        const enterdDescription = this.descriptionInputElement.value;
        const enterdManday = this.mandayInputElement.value;
        // 取得した値をチェックする処理
        // 空白ではない
        if (enterdTitle.trim().length === 0 || enterdDescription.trim().length === 0 || enterdManday.trim().length === 0) {
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
            console.log(title, desc, manday);
            this.clearInput();
        }
    }
    //  privateはclassの内側からしかアクセスできない
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const prjInput = new ProjectInput();
//# sourceMappingURL=app.js.map