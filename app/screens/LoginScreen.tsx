import { router } from "expo-router";
import { useState } from "react";
import { Alert, Button, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../components/InputField";
import { useAuthContext } from "../context/AuthContext";
import { loginUser } from "../services/firebaseService";


export default function LoginScreen() {

  const[password, setPassword]=useState("")
  const[email, setEmail]=useState("")
  const { setAsGuest } = useAuthContext();

  const handleLogin = async () => {

    if(!email || !password){
      Alert.alert("Please fill all fields")
      return;
    }

    if(!email.includes("@")){
      Alert.alert("Invalid email address format")
    }

    if(password.length < 7 ){
      Alert.alert("Password should be at least 8 characters long")
    }

     try {
          await loginUser(email, password);

          router.replace("/screens/MainScreen")

        } catch (error) {
          Alert.alert("Error");
        } 
  }
  
  const handleContinueAsGuest = () => {
    setAsGuest();
    router.replace("/screens/MainScreen");
  };


    return(
        <SafeAreaView>

            <Text style={styles.title}>Login</Text>

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

            <Button title="Login" onPress={handleLogin} />

            <Button
            title = "Not a member yet? Register"
            onPress={ () => router.push("/screens/RegisterScreen")}
            
            />
            <Button
              title="Continue as Guest"
              onPress={handleContinueAsGuest}
              color="gray"
            />
        </SafeAreaView>
    )
} 

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
    title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
});

