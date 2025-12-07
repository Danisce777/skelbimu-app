import { Stack } from "expo-router";
import { AdProvider } from "./context/AdsContext";
import { AuthProvider } from "./context/AuthContext";


export default function RootLayout() {
  return (
  <AuthProvider>
    <AdProvider>

        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      
    </AdProvider>
  </AuthProvider>
  )
}