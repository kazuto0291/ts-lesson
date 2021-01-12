"use strict";
// functionオーバロード
function add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
var result3 = add(1, 5);
var result2 = add('Hello', 'TypeScript');
result2.split('');
//# sourceMappingURL=app.js.map