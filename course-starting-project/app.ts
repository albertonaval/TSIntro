let userInput: unknown
let userName: string

userInput = 5
userInput = 'Alberto'

//userInput = userName

if (typeof userInput === 'string') {
    userName = userInput
}

//typeof userInput === 'string' ? (userName = userInput) : (userInput)

// A pesar de que userInput en principio puede ser cualquier tipo de dato, me genera error porque no puede asegurar que el 100% de los casos userInput sea un String. por lo tanto tengo que añadir una comprobación extra con un condiciona.


function errorMessage(message: string, code: number): never{
    throw { message: message, errorCode: code }
    // while(true){}
}
const result = errorMessage('An error ocurred', 500)
console.log(result)

//Esta función devuelve NEVER como tipo de dato porque al lanzar un error paraliza el script, lo mismo pasa si utilizamos catch. Lo mas correcto es poner NEVER para dejar el codigo claro y limpio.
