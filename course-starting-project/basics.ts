
function add(num1: number, num2: number, showResult: boolean, phrase: string) {
    const result = num1 + num2
    if (showResult) {
        console.log(phrase + result)
    } else {
        return result
    }
}

let number1: number = 1
let number2 = 5.8
let printResult = true
let phraseResult = 'The result is ===> '


add(number1, number2, printResult,phraseResult )
