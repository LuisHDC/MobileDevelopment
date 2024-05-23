import { User } from "../../models/user";
import { AuthRepository } from "./auth.repository";

export class AuthService{
    constructor(private readonly authRepository: AuthRepository){
    }

    public async LoginUser(name: string, password: string) {
        const options: RequestInit = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username: name, password: password})
        };

        let response = false;

        await fetch('https://3a49-190-108-99-153.ngrok-free.app/auth/login', options)
                .then(res => res.json())
                .then(res => { 
                    response = this.authRepository.setLoggedUser(res as User)
                });

        
        return response;
    }
}