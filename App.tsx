import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from "./src/pages/Home";
import UsersPage from './src/pages/Users';
import AddEditUser from './src/pages/AddEditUser';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={HomePage} options={{ title: 'Access' }} />
                <Stack.Screen name='Users' component={UsersPage} options={{ title: 'Users' }}/>
                <Stack.Screen name='AddUser' component={AddEditUser} options={{ title: 'New User' }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};