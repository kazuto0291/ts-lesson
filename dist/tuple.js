"use strict";
const person = {
    name: 'yota',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author'],
};
person.role.push('admin');
// person.role[1] = 10;
console.log(person.name);
for (const hobby of person.hobbies) {
    console.log(hobby);
}
//# sourceMappingURL=tuple.js.map