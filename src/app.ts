// Optional Chaining
// オプショナルチェーン
// ネストされたオブジェクト
const fetchedUserData = {
  id: 'u1',
  name: 'user1',
  job: {
    title: 'Developer',
    description: 'TypeScript',
  }
}

console.log(fetchedUserData.job.title);
