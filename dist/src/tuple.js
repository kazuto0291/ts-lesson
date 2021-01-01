"use strict";
var person = {
    name: 'yota',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: [2, 'author'],
};
person.role.push('admin');
// person.role[1] = 10;
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby);
}
//# sourceMappingURL=tuple.js.map