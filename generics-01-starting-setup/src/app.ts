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


function merge<U>(objA: {}, objB: U) {
    return Object.assign(objA, objB)
}

const mergeObj = merge({ name: 'Alberto' }, { age: 20 })
console.log(mergeObj.age)