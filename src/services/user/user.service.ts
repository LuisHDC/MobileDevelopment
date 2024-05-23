import { User } from "../../models/user";
import { AuthRepository } from "../auth/auth.repository";

export class UserService{
    private readonly url: string = 'https://3a49-190-108-99-153.ngrok-free.app';

    constructor(private readonly authRepository: AuthRepository){}

    public async GetUsers(){
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.authRepository.getLoggedUser()
            }
        };

        const response = (await fetch(`${this.url}/users`, options));
        if (response.status == 200)
            return await response.json() as User[]
        else{
            alert('Houve um erro para carregar a lista de usuários.')
            return;
        }
    }

    public async AddUser(user: User) {
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authRepository.getLoggedUser()
            },
            body: JSON.stringify( user )
        };

        const response = await fetch(`${this.url}/users`, options);

        if (response.status == 201)
            return true
        else
            return false
    }

    public async GetUser(userId: Number){
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.authRepository.getLoggedUser()
            }
        };

        const response = await fetch(`${this.url}/users/${userId}`, options);
        if (response.status === 200){
            return await response.json() as User
        }

        alert('Houve um erro para carregar o Usuário selecionado!');
        return;
    }

    public async UpdateUser(userId: number, name: string, password: string){
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authRepository.getLoggedUser()
            },
            body: JSON.stringify( {name, password} )
        };

        const response = await fetch(`${this.url}/users/${userId}`, options);

        if (response.status === 200)
            return true
        else
            return false
    }
}