import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slice/AuthSlice';
import { RootState } from '../redux/store/store';

// export type RootStackParamList = {
//     Login: undefined;
//     CounterScreen: undefined;
//     MainTabs: undefined;
// };

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginPage = () => {
    // const navigation = useNavigation<LoginScreenNavigationProp>()

    const dispatch = useDispatch<any>();
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const params = {
            username: userName,
            password: password
        };
        console.log("Params: ", params);
        dispatch((login as any)(params))
        // navigation.navigate('MainTabs')

    }

    // if (isLoading) {

    // }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                value={userName}
                placeholder='Enter Username'
                onChangeText={setUserName}
                placeholderTextColor={'gray'}
                autoCapitalize='none'
                style={styles.input}
            />
            <TextInput
                value={password}
                placeholder='Enter Password'
                onChangeText={setPassword}
                placeholderTextColor={'gray'}
                autoCapitalize='none'
                style={styles.input}
            />

            <View>
                {!isLoading ? (
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.login}>Login</Text>
                    </TouchableOpacity>
                ) : <ActivityIndicator size='small' color={'blue'} />}
            </View>
        </View>
    )
}

export default LoginPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
        paddingTop: 150,
        paddingHorizontal: '5%'
    },
    title: {
        fontSize: 36,
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        height: 45,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: 'coral',
        paddingHorizontal: 12,

    },
    button: {
        height: 55,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'blue',
        borderRadius: 24,
        elevation: 8


    },
    login: {
        fontWeight: 'bold',
        color: 'white'
    }
})