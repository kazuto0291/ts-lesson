let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Max';

if (typeof userInput === 'string') {
    userName = userInput;
}

// unknow型を型の決まった変数に代入する場合はif文データ型をチェックする必要がある