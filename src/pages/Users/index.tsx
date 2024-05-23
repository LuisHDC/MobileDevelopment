import React from 'react';
import { FlatList, Button, TextInput, View } from "react-native";
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import ListItem from '../../components/ListItem';
import { AuthRepository } from '../../services/auth/auth.repository';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';
import styles from './styles';

export default function UsersPage() {
    const navigator = useNavigation<NavigationProp<any>>()
    const authRepository = new AuthRepository();
    const userService = new UserService(authRepository);

    const navigation = useNavigation();

    const [users, setUsers] = React.useState<User[]>([]);

    React.useEffect(() => {
        navigation.setOptions({
            titles: "Users",
            headerRight: () => {
                return (
                    <View style={styles.header}>
                        <View style={styles.headerAddButton}>
                            <Button
                                title="Add" 
                                onPress={() => {
                                    navigator.navigate("AddUser", {userId: 0});
                                }}
                            />
                        </View>
                            <View style={styles.headerLogoutButton}>
                            <Button
                                title="Logout"
                                onPress={() => {
                                    authRepository.removeLoggedUser();
                                    navigator.navigate("Home");
                                }}
                            />
                        </View>
                    </View>)
            }
        }
    )
    }, []);

    fetchUsers();

    async function fetchUsers() {
        await userService.GetUsers()
                .then(res => setUsers(res as User[]));
    }
    
    return (
        <View>
            <FlatList
                data={users}
                renderItem={({ item }) => (
                    <ListItem
                    title={item.name}
                    subTitle={item.username}
                    onPress={() => { navigator.navigate("AddUser", {userId: item.id!})}}
                    ></ListItem>
                )}
            />
        </View>
    )
}