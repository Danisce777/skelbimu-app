// import { router } from "expo-router";
import { Link } from "expo-router";
import { Button, View } from "react-native";


export default function Index() {
  return (
    <View

      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Link href="/screens/RegisterScreen" asChild>
        <Button title ="Register" />
      </Link>

      <Link href="/screens/LoginScreen" asChild>
        <Button title="Login" />
      </Link>

      
    </View>
  );
}

