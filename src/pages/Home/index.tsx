import React from 'react';
import { Button, TextInput, View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import styles from './styles';
import { AuthService } from '../../services/auth/auth.service';
import { AuthRepository } from '../../services/auth/auth.repository';

export default function HomePage() {
    const navigation = useNavigation<NavigationProp<any>>();
    const authService: AuthService = new AuthService(new AuthRepository());

    const [login, setLogin] = React.useState('');
    const [senha, setSenha] = React.useState('');
    
    async function autenticarUsuario(){
        authService.LoginUser(login, senha).then(res => res ? navigation.navigate("Users") : alert("Authentication Failed"))
    }

    return (
        <View>
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
            <Button
                title="Authenticate"
                onPress={autenticarUsuario}
            />
        </View>
    );
}
