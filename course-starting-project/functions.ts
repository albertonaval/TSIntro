function add(num1: number, num2: number) {
    return num1 + num2
}

let combinedValues : (a: number, b: number) => number

combinedValues = add

console.log(combinedValues(2, 2))

function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2
    cb(result)
}

addAndHandle(2, 7, (result) => {
    console.log('AddAndHandle ', result)
})

// Se especifia claramente que el retorno de esta function es VOID y que no se hara nada con el por eso se puede hacer así, sin hacer uso del return.




function printResult(num: number) : void {
    console.log('Result ' + num)
}

printResult(add(7, 15))
