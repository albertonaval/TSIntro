import { Project, ProjectStatus } from "../models/project";



        // Project State Management
    type Listener<T> = (items: T[]) => void; //Establezco el genérico y en la clase que extiendo el especifico


    class State<T> {
    protected listeners: Listener<T>[] = []; //Array de funciónes que se activan ante un cambio en projects

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
    }

    export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
        return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
        );
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
        }
    }
    }


//console.log('RUNNING.....') ==> COMPROBACIÖN
export const projectState = ProjectState.getInstance();

//Esta exportación se hace varias veces, pero solo se ejecuta la primera vez.

