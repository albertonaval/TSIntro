//Validation
interface Validatable {
    value: string | number
    required?: boolean // ? === undefined
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
}

//SI ALGO ES FALSO TODO SERA FALSO
// != null [INDICA QUE ASI NO TENEMOS PROBLEMAS CON EL 0]

function validate(validatableInput: Validatable) {
    let isValid = true

    if (validatableInput.required) {
        isValid = isValid && validatableInput.value.toString().trim().length !== 0 //Doble true
    }
    if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length >= validatableInput.minLength
    }
    if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
        isValid = isValid && validatableInput.value.length <= validatableInput.maxLength
    }
    if (validatableInput.min != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value > validatableInput.min
    }
    if (validatableInput.max != null && typeof validatableInput.value === 'number') {
        isValid = isValid && validatableInput.value <= validatableInput.max
    }
    return isValid
}

// AUTOBIND DECORATORS
function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this)
            return boundFn
        },
    }
    return adjustedDescriptor
}

// PROJECT LIST CLASS

class ProjectList {

    templateElement: HTMLTemplateElement
    hostedElement: HTMLDivElement
    element: HTMLElement //Section class projects

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement
        this.hostedElement = document.getElementById('app')! as HTMLDivElement

        const importedNode = document.importNode(this.templateElement.content, true)
        this.element = importedNode.firstElementChild as HTMLElement
        this.element.id = `${this.type}-projects`
        this.attach()
        this.renderContent() //Llamamos al metodo de render despues de introducir el DOM
    }

    private renderContent() {
        const listId = `${this.type}-projects-lists`

        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'

    }

        private attach() {
        this.hostedElement.insertAdjacentElement('beforeend', this.element)
    }
}


//PROJECT INPUT CLASS
class ProjectInput {

    templateElement: HTMLTemplateElement
    hostedElement: HTMLDivElement
    element: HTMLFormElement
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement


    constructor() {
        this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement
        this.hostedElement = document.getElementById('app')! as HTMLDivElement

        const importedNode = document.importNode(this.templateElement.content, true)
        this.element = importedNode.firstElementChild as HTMLFormElement
        this.element.id = 'user-input'

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement


        this.configure()
        this.attach()

    }

    private clearInputs() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }


    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value
        const enteredDescription = this.descriptionInputElement.value
        const enteredPeople = this.peopleInputElement.value

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        }

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        }

        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        }

        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!')  //! indica si al menos una es falsa y lanza la alerta
            return
        } else {
            return[enteredTitle, enteredDescription, +enteredPeople]
        }
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault()
        const userInput = this.gatherUserInput()
        this.clearInputs()
        if (Array.isArray(userInput)) { //Metodo para confirmar que es un typeof[]
            const [title, description, people] = userInput
            console.log(title, description, people)
        }
    }

    private configure() {
    this.element.addEventListener('submit', this.submitHandler) //Añado bind para que apunte a la clase.
    }

    private attach() {
        this.hostedElement.insertAdjacentElement('afterbegin', this.element)
    }
}

const projectInput = new ProjectInput()
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')