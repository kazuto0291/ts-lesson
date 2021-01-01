enum Role {
  ADMIN , READ_ONLY, AUTHOR
}

const person = {
  name: 'yota',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN
};

// person.role.push('admin');
// person.role[1] = 10;

console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby)
}

if ( person.role === Role.ADMIN) {
  console.log('管理者ユーザー');
}