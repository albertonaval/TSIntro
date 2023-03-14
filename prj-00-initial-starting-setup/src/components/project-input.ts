import  Component  from "./base-component.js"; //Al exportar en base component el component por defecto puedo quitar {}
import * as Validation from '../utils/validation.js' //Indica que importe todo de ese archivo a modo object Validation. ...
//import { Validatable, validate } from "../utils/validation.js";
import { autobind as Autobind } from "../decorators/autobind.js"; //Cambiar el nombre de la importación similar to REACT
import { projectState } from "../state/project-state.js";




    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector(
        '#title'
        ) as HTMLInputElement;
        this.descriptionInputElement = this.element.querySelector(
        '#description'
        ) as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector(
        '#people'
        ) as HTMLInputElement;
        this.configure();
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validation.Validatable = {
        value: enteredTitle,
        required: true
        };
        const descriptionValidatable: Validation.Validatable = {
        value: enteredDescription,
        required: true,
        minLength: 5
        };
        const peopleValidatable: Validation.Validatable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 5
        };

        if (
        !Validation.validate(titleValidatable) ||
        !Validation.validate(descriptionValidatable) ||
        !Validation.validate(peopleValidatable)
        ) {
        alert('Invalid input, please try again!'); //! indica si al menos una es falsa y lanza la alerta
        return;
        } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) { //Metodo para confirmar que es un typeof[]
        const [title, desc, people] = userInput;
        projectState.addProject(title, desc, people);
        this.clearInputs();
        }
    }
    }
