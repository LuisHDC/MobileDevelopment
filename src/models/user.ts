export class User {
    id?: number
    name: string
    username: string
    password?: string
    token?: string
    roles?: string[]

    constructor(name:string, username: string, password: string){
        this.name = name;
        this.username = username;
        this.password = password;
    }
}