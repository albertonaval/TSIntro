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
    return function<T extends { new (...args: any[]): {name: string}}> (originalConstructor:
        T) {
        return class extends originalConstructor {
            constructor(..._: any[]) { //_se añade cuando hay algo que se que esta pero no lo uso.
                super()     //si añado un constructor de una clase extendida debo llamar a super()
                const hookEL = document.getElementById(hookId)
                if (hookEL) {
                    hookEL.innerHTML = template
                    hookEL.querySelector('h1')!.textContent = this.name
                }
            }
        }
    }
}


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


function Log(target: any, propertyName: string | Symbol) {
    console.log('Poperty -...')
    console.log(target, propertyName)
}

//ADD Decorators to an accesor
function Log2(target: any, name: string, description: PropertyDescriptor) {
    console.log('Accesor Decorator')
    console.log(target)
    console.log(name)
    console.log(description)
}

function Log3(
    target: any,
    name: string | Symbol,
    description: PropertyDescriptor) {   //name == del metodo,
    console.log('Method Decorator')
    console.log(target)
    console.log(name)
    console.log(description)
}


function Log4(target: any, name: string | Symbol, position: number) { //position del argumento.
    console.log('Parameter Decorator')
    console.log(target)
    console.log(name)
    console.log(position)
}


class Product {
    @Log
    title: string
    private _price: number

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val
        } else {
            throw new Error('Its must be positive')
        }
    }

    constructor(t: string, p: number) {
        this.title = t
        this._price = p
    }

    @Log3
    getPriceWithTax(@Log4 tax:number) {
        return this._price * (1 + tax)
    }
}




function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false, //Permite que no forme parte de loop externos.
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        },
    }
    return adjDescriptor
}
//GET => Sera lanzado por el objeto concreto al que pertenece.


class Printer {

    message: string

    constructor() {
        this.message = 'Done'
    }

    @Autobind
    showMessage() {
        console.log(this.message)
    }
}

const p = new Printer()

p.showMessage()

const button = document.querySelector('button')!
button.addEventListener('click', p.showMessage)


interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {  //Constructor key que apunta a la constructor de la clase
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []),'required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {  //constructor.name ==> name es por defecto en JS
    ...registeredValidators[target.constructor.name],
    [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []),'positive']
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]; //Propiedad del constructor del prototype
  if (!objValidatorConfig) { //Esto indica que no hay nada que validar entonces dame true
    return true;
  }

  let isValid = true;
  for (const prop in objValidatorConfig) { //Acceso a todas las propiedades del obj. PROP = Property
    for (const validator of objValidatorConfig[prop]) { //Recorrer el [] para obtener el validador concreto.
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop];
          break; //!! convierte eso en truthy
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid //EN CASO DE QUE SE PASE ALGO VACIO O SIN VALIDATOR
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value; //Se le añade el + porque el input me recoge string y lo quiero en number

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createdCourse);
});




