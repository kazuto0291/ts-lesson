// Optional Chaining
// オプショナルチェーン
// ネストされたオブジェクトプロパティーに安全にアクセスする機能
const fetchedUserData = {
  id: 'u1',
  name: 'user1',
  job: {
    title: 'Developer',
    description: 'TypeScript',
  }
}

console.log(fetchedUserData?.job.title);
// もしこのfetchedUserDataのオブジェクトが存在する場合ならjobプロパティーにアクセスします
console.log(fetchedUserData?.job.title);
// もしこのfetchedUserDataのオブジェクトが存在する場合ならjobプロパティーにアクセスします
