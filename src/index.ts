//1
function getFirstWord(a: string) {
    return a.split(/ +/)[0].length;
}
console.log(getFirstWord("abc +dc +e"));

//2
function getUserNamings(a: { name: string, surname: string }) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}
console.log(getUserNamings({ name: "Тарас", surname: "Шевченко" }));

//3
type List = {
    products: Array<{ name: string }>
}
function getAllProductNames(a: List) {
    return a?.products?.map((prod: { name: string }) => prod?.name) || [];
}
console.log(getAllProductNames({ products: [{ name: "Тарас" }, { name: "Макар" }] }))

//4.1
function hey(a: Creature) {
    return "hey! i'm " + a.name();
}

console.log(hey({ name: () => "roman", cuteness: 100 }));
console.log(hey({ name: () => "vasyl", coolness: 100 }));

//4.2
class Creature {
    title?: string;
    id?: number;
    isBig?: boolean;
    cuteness?: number;
    coolness?: number;
    type?: string;

    constructor(title: string, two: number | boolean, coolness?: number, cuteness?: number) {
        this.title = title;
        this.cuteness = cuteness;
        this.coolness = coolness;

        if (typeof two == "number") {
            this.id = two;
        } else {
            this.isBig = two;
        }
    }

    name: Function = () => {
        return this.title;
    };
}

class Cat extends Creature {
    type = "cat";
}
class Dog extends Creature {
    type = "dog";
}

let a = new Cat("snizhok", true);
let b = new Dog("sirko", 333)

console.log(hey(a))
console.log(hey(b))

// 4.3
function hey3(a: Creature) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? (" cuteness: " + a.cuteness) : (" coolness: " + a.coolness))
}

hey3({ name: () => "snizhok", type: "cat", cuteness: 100 });
hey3({ name: () => "sirko", type: "dog", coolness: 100 })

//5
function stringEntries(a: {}) {
    return Array.isArray(a) ? a : Object.keys(a)
}

//6
async function world(a: number) {
    return "*".repeat(a)
}
const hello = async () => {
    return await world(10)
}
hello().then(r => console.log(r)).catch((e: Error) => console.log("fail " as string + e.message))

// task 3
interface Types {
    [a: string]: { cvalue: number | string | undefined | Types } | undefined;
}

let data = {
    a: undefined,
    b: { cvalue: 1 },
    c: undefined,
    d: { cvalue: { a: { cvalue: 2 } } },
    e: { cvalue: { a: { cvalue: "3" } } }
};

let zero = 0.1; //2021
function fun<Types>(obj: Types) {
    let sum = 0;

    for (const elem in obj) {
        let key = elem as keyof typeof obj;
        let field = obj[key];

        if (!field) {
            sum += zero;
            continue;
        }

        let type = typeof field;
        switch (type) {
            case "number": sum += +field; break;
            case "string": sum += +field; break;
            case "object": sum += fun(field); break;
            default: sum += zero;
        }
    }
    return sum;
}
console.log(`сумма = ${fun(data)} (власна ф-ція)`);

function summ<Types>(a: Types) {
    const x = Object.keys(a as keyof Types).map((k) => {
        const elem = a[k as keyof Types];
        if (!elem) return zero;
        if (typeof elem === "string") return +elem || zero;
        if (typeof elem === "number") return elem;
        return summ(elem);
    });

    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}
console.log(`сумма = ${summ(data)} (виправлена ф-ція)`);