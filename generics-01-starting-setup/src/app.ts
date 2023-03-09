// const surnames: Array<string> = ['Hola', 'adios']
// surnames[0].split(' ')

// const promise: Promise <string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('It is Done')
//     }, 2000)
// })

// promise.then(data => {
//     data.split(' ')
// })


function merge<T extends object, U extends object>(objA: T, objB: U) { //T&U : cualquier objeto con cualquier estructura
    return Object.assign(objA, objB)
}

const mergeObj = merge({ name: 'Alberto', hobbies: ['Sports'] }, { age: 20 })
console.log(mergeObj.hobbies)

interface Lengthy {
    length: number
}

// function countAndDescribe<T extends string>(element: T) ==> Esta opción esta mas limitada a que solo sean String

function countAndDescribe<T extends Lengthy>(element: T) { // Cualquier dato con length
    let description = 'Got no value'
    if (element.length === 1) {
        description = 'Got 1 element'
    } else if (element.length > 1){
        description = 'Got ' + element.length + ' elements.'
    }
    return [element, description]
}

const item = countAndDescribe('Hello World!')
console.log(item)


function extractAndCovert<T extends object, U extends keyof T>(obj: T, key: U) { //T === {} &&  U === una key de T
    return 'Value ' + obj[key]
}

console.log(extractAndCovert({ name: 'Alberto' }, 'name'))

class DataStorage<T extends string | number | boolean>{ //Solo funciona correctamente con primitivos.
    private data: T[] = []

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1) // -1 siempre borra el ultimo valor porque no refenencia
    }

    getItems() {
        return [...this.data]
    }
}

const textStorage = new DataStorage<string | number>()
textStorage.addItem('78')
textStorage.addItem('Alberto')
textStorage.addItem('Manu')
textStorage.removeItem('Manu')
console.log(textStorage)


// const objStorage = new DataStorage<object>()
// const alObj = { name: 'Alberto' }
// objStorage.addItem(alObj)
// objStorage.addItem({name: 'Luis'})
// // Manera de arreglar que borre por referencia de objeto o array.
// objStorage.removeItem(alObj)
// console.log(objStorage.getItems())


interface CourseGoal {
    title: string,
    description: string,
    completeUntil: Date
}

function createCourseGoal(
    title: string,
    description: string,
    date: Date)
    : CourseGoal {
    let courseGoal: Partial <CourseGoal> = {} //Le indicamos que CourseGoal es un objeto opcionalmente estructurado
    courseGoal.title = title
    courseGoal.description = description
    courseGoal.completeUntil = date
    return courseGoal as CourseGoal // Desconvierto la variable de partial
}

// const names: Readonly <string[]> = ['Ana', 'Luis', 'Alberto'] // Propiedad que indica que ese [] READONLY y String.
// names.push('Rafa')
// names.pop()