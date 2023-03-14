//Export default indica que de este archivo por defecto se exporta este unico componente.

// Component Base Class
    export default abstract class Component<T extends HTMLElement, U extends HTMLElement> { //Objetivo: Elegir los Element HTML no se puede instanciar siempre
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string //Parametros opcionales siempre en el ultimo lugar
    ) {
        this.templateElement = document.getElementById(
        templateId
        )! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(
        this.templateElement.content,
        true
        );
        this.element = importedNode.firstElementChild as U;
        if (newElementId) {
        this.element.id = newElementId;
        }

        this.attach(insertAtStart);
    }

    private attach(insertAtBeginning: boolean) {
        this.hostElement.insertAdjacentElement(
        insertAtBeginning ? 'afterbegin' : 'beforeend',
        this.element
        );
    }

    abstract configure(): void; //Queremos instanciar esta clase y forzar a que tenga estos metodos.
    abstract renderContent(): void;
    }
