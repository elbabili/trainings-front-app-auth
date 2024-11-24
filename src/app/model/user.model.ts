export class User {
    id : number;
    email : string;
    password : string;
    roles: string[];

    constructor(id : number, email:string, password : string, roles : string[]){
        this.id = id;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}