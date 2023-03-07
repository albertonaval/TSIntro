
// type AddFn = (a: number, b: number) => number

interface AddFn {
    (a: number, b: number) : number
}

let add: AddFn

add = (n1: number, n2: number) => {
    return n1 + n2
}

console.log(add(3, 5))

interface Named {
    readonly name?: string
    outputName?: string
}

interface Greetable extends Named{
    greet(phrase: string): void
}


class Person implements Greetable {
    name?: string
    age = 27
    constructor(n?: string) {
        if (n) {
            this.name = n
        }
    }

    greet(phrase: string) {
        if (this.name) {
            console.log(phrase + ' ' + this.name)
        } else {
            console.log('Hi!')
        }
    }

    //La interrogación indica que esa propiedad es opcional puede estar presente o no. Al crear la clase se le puede pasar un nombre o no.
}

let user1: Greetable
user1 = new Person()


user1.greet('Hi there - I am')
console.error(user1)

// let user2: Greetable
// user2 = {
//     name: 'Alexis',
//     age: 27,
//     greet(phrase: string) {
//         alert(phrase + ' ' + this.name)
//     },
// }

// user2.greet('Hi there - I am')
