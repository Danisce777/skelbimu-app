import { router } from "expo-router";
import { Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function LoginScreen() {


    return(
        <SafeAreaView>
            <TextInput
            style={styles.input}
            
            />
            <Button
            title = "Not a member yet? Register"
            onPress={ () => router.push("/screens/RegisterScreen")}
            
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
});

