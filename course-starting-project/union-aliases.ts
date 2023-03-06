// It's a way to defined your own global type's variables
type Combinable = number | string
type CombinableDescriptor = 'as-number' | 'as-text'

function combine(
    input1: Combinable,
    input2: Combinable,
    resultConversion: CombinableDescriptor
) {
    let result
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2
    } else {
        result = input1.toString() + input2.toString()
    }
        return result
    }

const combinedAge = combine(26, 56, 'as-number')
console.log(combinedAge)

const combinedNumber = combine('24', '89', 'as-number')
console.log(combinedNumber)

const combinedName = combine('Rafael', 'Alberto', 'as-text')
console.log(combinedName)
