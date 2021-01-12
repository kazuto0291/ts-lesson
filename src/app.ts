// インデックス型
interface ErrorContainer {
  [prop: string]:string;
}

const errorBag: ErrorContainer = {
  email: '正しいメールアドレスではありません。',
  username: 'ユーザ名に記号を含めることはできません。'
};