//DRAG AND DROP INTERFACES
interface Draggable {
    dragStartHandler(event: DragEvent): void
    dragEndhandler(event: DragEvent):void
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void
    dropHandler(event: DragEvent): void
    dragLeaveHandle(event: DragEvent): void
}

// Project Type
enum ProjectStatus{Active, Finisihed}

class Project {

    constructor(
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus
    ) {}
}

//Project State Management
type Listener<T> = (items: T[]) => void //Establezco el genérico y en la clase que extiendo el especifico

class State<T>{
    protected listeners: Listener<T>[] = [] //Array de funciónes que se activan ante un cambio en projects
    addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn)
    }
}

class ProjectState extends State<Project> {
    private projects: Project[] = []
    private static instance: ProjectState

    private constructor() {
        super()
    }

    static getInstance() {
        if (this.instance) {
            return this.instance
        }
        this.instance = new ProjectState()
        return this.instance
    }

    addProjects(title: string, description: string, numberOfPeople: number) {
        const newProject = new Project(
            Math.random.toString(),
            title,
            description,
            numberOfPeople,
            ProjectStatus.Active
        )
        this.projects.push(newProject)

        this.updateListeners()
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId)
        if (project && project.status !== newStatus) {
            project.status = newStatus
            this.updateListeners()
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice())
        }
    }
}

const projectState = ProjectState.getInstance()

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
        isValid = isValid && validatableInput.value >= validatableInput.min
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

//Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> { //Objetivo: Elegir los Element HTML no se puede instanciar siempre
    templateElement: HTMLTemplateElement
    hostedElement: T
    element: U

    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStar: boolean,
        newElementId?: string, //Parametros opcionales siempre en el ultimo lugar
    ) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement
        this.hostedElement = document.getElementById(hostElementId)! as T

        const importedNode = document.importNode(this.templateElement.content, true)
        this.element = importedNode.firstElementChild as U

        if (newElementId) {
            this.element.id = newElementId
        }
        this.attach(insertAtStar)
    }

    private attach(insertAtBeginning: boolean) {
        this.hostedElement.insertAdjacentElement(
            insertAtBeginning ? 'afterbegin' : 'beforeend',
            this.element)
    }

    abstract configure(): void //Queremos instanciar esta clase y forzar a que tenga estos metodos.
    abstract renderContent():void
}

//PROJECT ITEM CLASS
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{ //EQUIVALEN AL HOSTED Y AL ELEMENT ESPECIFICOS
    private project: Project

    get persons() {
        if (this.project.people === 1) {
            return '1 person'
        } else {
            return `${this.project.people} persons`
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id)
        this.project = project

        this.configure()
        this.renderContent()
    }

    @Autobind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id)
        event.dataTransfer!.effectAllowed = 'move'
    }

    dragEndhandler(_event: DragEvent) {
        console.log('Draggabled')
    }

    configure(){
        this.element.addEventListener('dragstart', this.dragStartHandler)
        this.element.addEventListener('dragend', this.dragEndhandler)
    }

    renderContent(){
        this.element.querySelector('h2')!.textContent = this.project.title
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned'
        this.element.querySelector('p')!.textContent = this.project.description
    }

}

// PROJECT LIST CLASS
class ProjectList extends Component <HTMLDivElement, HTMLElement> implements DragTarget{
    assignedProjects: Project[]

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`)
        this.assignedProjects = [] //Lo asigno al constructor vació porque se ejecuta con interacción.

        this.configure()
        this.renderContent() //Llamamos al metodo de render despues de introducir el DOM
    }

    @Autobind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault() //Para que funcione el drop hay que poner e.preventDefault ya js no permite el drop default
        const listElement = this.element.querySelector('ul')!
        listElement.classList.add('droppable')

        }

    }

    @Autobind
    dragLeaveHandle(_event: DragEvent) {
        const listElement = this.element.querySelector('ul')!
        listElement.classList.remove('droppable')
    }

    @Autobind
    dropHandler(event: DragEvent) {
        const prjId = event.dataTransfer!.getData('text/plain')
        projectState.moveProject(prjId,
            this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finisihed)
        //console.log(event.dataTransfer!.getData('text/plain'))
    }

    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler)
        this.element.addEventListener('dragleave', this.dragLeaveHandle)
        this.element.addEventListener('drop', this.dropHandler)

        projectState.addListener((projects: Project[]) => {
            const filteredProjects = projects.filter( prj => {
                if (this.type === 'active') {
                    return prj.status === ProjectStatus.Active
                }
                return prj.status === ProjectStatus.Finisihed
            })

            this.assignedProjects = filteredProjects
            this.renderProjects()
        })

    }

    renderContent() {
        const listId = `${this.type}-projects-lists`

        this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS'
        this.element.querySelector('ul')!.id = listId
    }

    private renderProjects() {
        const listElement = document.getElementById(`${this.type}-projects-lists`)! as HTMLUListElement
        listElement.innerHTML = ''
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem)
        }
    }
}

//PROJECT INPUT CLASS
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{

    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
        super('project-input', 'app', true, 'user-input')

        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement

        this.configure()
    }

    configure() {
    this.element.addEventListener('submit', this.submitHandler)
    }

    renderContent(): void {}

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
            projectState.addProjects(title, description, people)
        }
    }
}

const projectInput = new ProjectInput()
const activePrjList = new ProjectList('active')
const finishedPrjList = new ProjectList('finished')