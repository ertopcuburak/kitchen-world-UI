import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import md5 from 'md5';
import { environment } from '../environment/environment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }: RootTabScreenProps<'Root'>) {
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    function login() {
        const apiUrl = environment();
        const url = apiUrl + "/users/login";
        const fetchData = async () => {
            try {
                const pwd = md5(password);
                console.log(pwd);
                const request = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ identifier: identifier, pwd: pwd })
                };
                console.log("::requesy::", request);
                const response = await fetch(url, request);
                console.log("::no prob fetch::", JSON.stringify(response));
                const json = await response.json();
                console.log(json);
                try {
                    await AsyncStorage.setItem('uname', json.uName);
                } catch (e) {
                    // saving error
                }
                try {
                    await AsyncStorage.setItem('sid', json.pwd);
                } catch (e) {
                    // saving error
                }
                try {
                    await AsyncStorage.setItem('userId', ''+json.id);
                } catch (e) {
                    // saving error
                }
                navigation.navigate('Home');
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email/Kullanıcı adı."
                    placeholderTextColor="#003f5c"
                    onChangeText={(identifier) => setIdentifier(identifier)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Şifre"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={login}>
                <Text>Giriş</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    inputView: {
        backgroundColor: "#ABD2F7",
        borderRadius: 30,
        width: "80%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    loginBtn:
    {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#72A2CF",
    }
});
