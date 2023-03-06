

// const add = (a: number, b: number = 2) => a + b
// console.log(add(2))

// const printOut: (a: number | string) => void = output => console.log(output)

// const button = document.querySelector('button')!

// button.addEventListener('click', event => console.log(event))

// printOut(add(5, 2))

const hobbies = ['Sport', 'Cooking']
const activeHobbies = ['Hiking']
activeHobbies.push(...hobbies)
console.log(activeHobbies)
//SPREAD OPERATOR WITH AN ARRAY

const [hobby1, hobby2, ...remainingHobbies] = hobbies


const person = {
    name: 'Alberto',
    age: 27
}
console.log('PRECOPY', person)

const copiedPerson = { ...person }
console.log('POSTCOPY', copiedPerson)


const add = (...numbers: number[]) => {
    return numbers.reduce((curResult, curValue) => {
        return curResult + curValue
    }, 0)
}

const addedNumbers = add(4, 5, 67, 9)
console.log(addedNumbers)