"use strict";
//1
function getFirstWord(a) {
    return a.split(/ +/)[0].length;
}
console.log(getFirstWord("abc +dc +e"));
//2
function getUserNamings(a) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}
console.log(getUserNamings({ name: "Тарас", surname: "Шевченко" }));
function getAllProductNames(a) {
    var _a;
    return ((_a = a === null || a === void 0 ? void 0 : a.products) === null || _a === void 0 ? void 0 : _a.map((prod) => prod === null || prod === void 0 ? void 0 : prod.name)) || [];
}
console.log(getAllProductNames({ products: [{ name: "Тарас" }, { name: "Макар" }] }));
//4.1
function hey(a) {
    return "hey! i'm " + a.name();
}
console.log(hey({ name: () => "roman", cuteness: 100 }));
console.log(hey({ name: () => "vasyl", coolness: 100 }));
//4.2
class Creature {
    constructor(title, two, coolness, cuteness) {
        this.name = () => {
            return this.title;
        };
        this.title = title;
        this.cuteness = cuteness;
        this.coolness = coolness;
        if (typeof two == "number") {
            this.id = two;
        }
        else {
            this.isBig = two;
        }
    }
}
class Cat extends Creature {
    constructor() {
        super(...arguments);
        this.type = "cat";
    }
}
class Dog extends Creature {
    constructor() {
        super(...arguments);
        this.type = "dog";
    }
}
let a = new Cat("snizhok", true);
let b = new Dog("sirko", 333);
console.log(hey(a));
console.log(hey(b));
// 4.3
function hey3(a) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? (" cuteness: " + a.cuteness) : (" coolness: " + a.coolness));
}
hey3({ name: () => "snizhok", type: "cat", cuteness: 100 });
hey3({ name: () => "sirko", type: "dog", coolness: 100 });
//5
function stringEntries(a) {
    return Array.isArray(a) ? a : Object.keys(a);
}
//6
async function world(a) {
    return "*".repeat(a);
}
const hello = async () => {
    return await world(10);
};
hello().then(r => console.log(r)).catch((e) => console.log("fail " + e.message));
let data = {
    a: undefined,
    b: { cvalue: 1 },
    c: undefined,
    d: { cvalue: { a: { cvalue: 2 } } },
    e: { cvalue: { a: { cvalue: "3" } } }
};
let zero = 0.1; //2021
function fun(obj) {
    let sum = 0;
    for (const elem in obj) {
        let key = elem;
        let field = obj[key];
        if (!field) {
            sum += zero;
            continue;
        }
        let type = typeof field;
        switch (type) {
            case "number":
                sum += +field;
                break;
            case "string":
                sum += +field;
                break;
            case "object":
                sum += fun(field);
                break;
            default: sum += zero;
        }
    }
    return sum;
}
console.log(`сумма = ${fun(data)} (власна ф-ція)`);
function summ(a) {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (!elem)
            return zero;
        if (typeof elem === "string")
            return +elem || zero;
        if (typeof elem === "number")
            return elem;
        return summ(elem);
    });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}
console.log(`сумма = ${summ(data)} (виправлена ф-ція)`);
