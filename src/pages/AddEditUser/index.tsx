import React from 'react';
import { Button, Image, Text, TextInput, View } from 'react-native';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';

import styles from './styles';
import { User } from '../../models/user';
import { UserService } from '../../services/user/user.service';
import { AuthRepository } from '../../services/auth/auth.repository';

export default function AddEditUser() {
    const [nome, setNome] = React.useState('');
    const [login, setLogin] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [confirmaSenha, setConfirmaSenha] = React.useState('');
    const userService = new UserService(new AuthRepository);
    const navigation = useNavigation<NavigationProp<any>>();

    const route = useRoute();

    const { userId }:any = route.params as any;
    
    

    React.useEffect(() => {
        if (userId !== 0){
            navigation.setOptions({
                title:"Edit User"
            })

            userService.GetUser(userId)
                            .then(res => {
                                if (res){
                                    setNome(res.name);
                                    setLogin(res.username);
                                }
                            });
        }
    }, [])

    async function salvarUsuario(){
        if (senha != confirmaSenha){
            alert('As senhas devem ser iguais!!')
        }else{
            let user = new User(nome, login, senha);
            userService.AddUser(user)
                            .then(res => {
                                if (res == true){
                                    alert(`Usuário com login ${nome} foi criado com sucesso!`)
                                    navigation.navigate('Users');
                                }
                                else
                                    alert('Houve um erro na criação do usuário!');
                            })
        }
    }

    async function editarUsuario(){
        if (senha != confirmaSenha){
            alert('As senhas devem ser iguais!!')
        }else{
            userService.UpdateUser(userId, nome, senha)
                            .then(res => {
                                if (res == true){
                                    alert(`Usuário com login ${nome} foi editado com sucesso!`)
                                    navigation.navigate('Users');
                                }
                                else
                                    alert('Houve um erro na edição do usuário!');
                            })
        }
    }

    return (
        <View>
            <TextInput
                style={styles.input}
                onChangeText={setNome}
                value={nome}
                placeholder="Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={setLogin}
                value={login}
                placeholder="Login"
            />
            <TextInput
                style={styles.input}
                onChangeText={setSenha}
                value={senha}
                placeholder="Password"
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                onChangeText={setConfirmaSenha}
                value={confirmaSenha}
                placeholder="Confirm password"
                secureTextEntry
            />
            <Button
                title={userId !== 0 ? "Edit": "Save"}
                onPress={userId !== 0 ? editarUsuario : salvarUsuario}
            />
        </View>
    )
}