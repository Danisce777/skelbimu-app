import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import InputField from '../components/InputField';
import { registerUser } from "../services/firebaseService";


export default function RegisterScreen() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState('');


    const handleRegister = async () => {
    if (!email || !password || !repeatPassword) {
      Alert.alert('Error', 'Fill All Fields');
      return;
    }
  

    if (password !== repeatPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }


    try {
      await registerUser(email, password);
      Alert.alert("Account has been created");

      /// 
      router.replace("/screens/LoginScreen")
    } catch (error) {
      Alert.alert("Error");
    } 

  };




    return(
        <View style={styles.container}>
            <Text style={styles.title}>Registration</Text>

            <InputField
                placeholder={"Email Address"}
                value = {email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <InputField
                placeholder={"Password"}
                value = {password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <InputField
                placeholder={"Repeat Pasword"}
                value = {repeatPassword}
                onChangeText={setRepeatPassword}
                secureTextEntry
            />


        <Button title="Create Account" onPress={handleRegister} />

        <TouchableOpacity onPress={() => router.push("/screens/LoginScreen")}>
          <Text style={styles.link}>Already a member? Sign In!</Text>
        </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
    color: '#007bff',
  },
});