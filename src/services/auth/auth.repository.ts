import * as SecureStore from 'expo-secure-store'
import { User } from '../../models/user'

export class AuthRepository{
    private readonly logged_user_token = 'LOGGED_USER';

    public getLoggedUser(){
        return SecureStore.getItem(this.logged_user_token);
    }

    public setLoggedUser(user: User) {
        if (user && user.token){
            SecureStore.setItem(this.logged_user_token, user.token)
            return true;
        }else{
            return false;
        }
    }

    public removeLoggedUser(){
        SecureStore.deleteItemAsync(this.logged_user_token)
    }
}