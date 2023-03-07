type Admin = {
    name: string,
    work: string[]
}

type Employee = {
    name: string
    startDate: Date
}

type mergeType = Admin & Employee

const e1: mergeType = {
    name: 'Alberto',
    work: ['WEB DEVELOPER'],
    startDate: new Date()
}

console.log(e1)

type Combinable = string | number
type Numeric = number | boolean

type Universal = Combinable & Numeric

// GUARD -----> TYPE OF
function add(a: number, b: number): number // SE LE INDICA QUE SI A & B SON NUMBER SERA UN NUMBER
function add(a: string, b: string): string // SE LE INDICA QUE SI A & B SON STRING SERA UN STRING
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {  // Guardia de tipo: Flexible y Seguro
        return a.toString() + b.toString()
    } return a + b;
}

const result = add('Alberto','Naval') // FUNCIONA PORQUE PUEDE SER UN STRING O NUMBER PERO HAY QUE FILTRAR ==> OVERLOAD
console.log(result.length)

// GUARD ----> IN

type UnknownEmployee = Employee | Admin

function printEmployeeInfo(emp: UnknownEmployee) {
    console.log('Name: ', emp.name)
    if ('work' in emp) {
        console.log('WORK: ', emp.work)    //Error porque puede estar o no, necesito un condicional.
    }
    if ('startDate' in emp) {
        console.log('Date: ', emp.startDate)    //Error porque puede estar o no, necesito un condicional.
    }
}

printEmployeeInfo({ name: 'Manu', startDate: new Date() })

// GUARD ----> INSTANCE OF

class Car {
    drive() {
        console.log('Driving ... ')
    }
}

class Truck {
    drive() {
        console.log('Driving Truck ...')
    }

    loadCargo(amount: number) {
        console.log('Loading... ' + amount)
    }
}

type Vehicle = Car | Truck

const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
    vehicle.drive()
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000)
    }
}

useVehicle(v1)
useVehicle(v2)

// DISCRIMINATED UNION

interface Bird {
    type: 'bird'
    flyingSpeed: number
}

interface Horse {
    type: 'horse'
    runningSpedd: number
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
    let speed
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed
            break
        case 'horse':
            speed = animal.runningSpedd
    }
    console.log('Moving at ... ' + speed)
}

moveAnimal({ type: 'bird', flyingSpeed: 89 })

//Type Casting
const userInputElement = document.getElementById('user_input')! as HTMLInputElement //Permite definir a que equivale ID
userInputElement.value = 'Hiii!'


//Index properties.
interface ErrorContainer {
    [prop: string] : string
}

const errorBag: ErrorContainer = {
    email:'Not a valid email',
    username: 'Must be in uppercase'
}



const fetchedUserData = {
    id: 1,
    user: 'Alberto',
    job : {title: 'WD', rol: 'junior'}
}

console.log(fetchedUserData?.job?.rol) // Nos permite acceder con seguirdad si esta a las propiedades del objeto.

//Nullish Coalescing

const userInput = undefined

const storedData = userInput ?? 'DEFAULT' // Indica que si userinput es NULL || UNDEFINED se dispara DEFAULT

console.log(storedData)

