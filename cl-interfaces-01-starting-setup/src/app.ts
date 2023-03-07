abstract class Department {

    static fiscalYear = 2020

    constructor(protected readonly id: string, protected name: string, protected people : string[] = []) { }
    //Se pasan los argumentos directamente junto con el tipo de dato y la caracteristica.

    abstract describe(this: Department): void
    //pasarle el This con el tipo de dato como parametro aumenta la seguridad e indica que el metodo describe solo puede ser referido a la clase a la que pertenece

    addEmployees(employe: string) {
        this.people.push(employe)
    }

    printEmployeeInfo() {
        console.log(this.people.length)
        console.log(this.people)
    }
}

class ITDepartment extends Department {
    admins: string[]
    constructor(id: string, admins: string[]) {
        super(id, 'IT')
        this.admins = admins

    }

    describe(this: Department): void {
        console.log(ItDepartment)

    }
}


const ItDepartment = new ITDepartment('2', ['Max'])
ItDepartment.describe()
ItDepartment.printEmployeeInfo()
ItDepartment.addEmployees('Max')
ItDepartment.addEmployees('Alberto')
console.log(ItDepartment)


class accountingDepartment extends Department {

    private lastReport: string
    //SINGLETON PATRON
    private static instance: accountingDepartment

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport
        }
        throw new Error('Report not found...')
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Valid value...')
        }
        this.addReports(value)
    }

    private constructor(id: string, private reports: string[],) {
        super(id, 'Account')
        this.lastReport = reports[0]
    }

    static getInstance() {
        if (accountingDepartment.instance) {
            this.instance
        }
        this.instance = new accountingDepartment('2', [])
        return this.instance
    }

    addEmployees(name: string) {
        if (name === 'Alberto') {
            return
        }
        this.people.push(name)
    }

    static createEmployee(name: string) {
        return {name: name}
    }

    addReports(text: string) {
        this.reports.push(text)
        this.lastReport = text
    }

    printReports() {
        console.log(this.reports)
    }

    describe(this: Department): void {
        console.log(accountingDepartment)
    }
}

//Singleton Patron
const accountingD = accountingDepartment.getInstance()
console.log(accountingD)

const employee1 = accountingDepartment.createEmployee('Max')
console.log('E1', employee1, Department.fiscalYear)


accountingD.describe()
accountingD.addReports('Semana 1')
accountingD.addEmployees('Maximilian')
accountingD.printEmployeeInfo()
accountingD.mostRecentReport = ''
//console.log(accountingD)







