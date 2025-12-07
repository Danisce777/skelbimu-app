// import { router } from "expo-router";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useAuthContext } from "./context/AuthContext";

export default function Index() {

  const { user, loading, isGuest } = useAuthContext();

  useEffect( () => {
    if(!loading) {
      if(user || isGuest) {
        router.replace("/screens/MainScreen");
      } else {
        router.replace("/screens/LoginScreen");  
      }
    }
  }, [user, loading, isGuest]);

  return (
    
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" color="#007AFF" />      
    </View>
  );
}

