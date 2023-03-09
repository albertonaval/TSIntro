//CLASS DECORATORS.

function Logger(logString: string) {
    console.log('LOGGER')
    return function (constructor: Function) {
        console.log(logString)
        console.log(constructor)
    }
}

//@Logger('LOGGING -- PERSON')

function WithTemplate(template: string, hookId: string) {
    return function (constructor: any) {
        const p = new constructor()
        const hookEL = document.getElementById(hookId)
        if (hookEL) {
            hookEL.innerHTML = template
            hookEL.querySelector('h1')!.textContent = p.name
        }

    }
}

@Logger('LOGGING')
@WithTemplate('<h1></h1>', 'app')
class Person {

    name: string
    age: number

    constructor() {
        console.log('Creating a person object...')
        this.name = 'Alberto'
        this.age = 27
    }

}

const person = new Person()
console.log(person)