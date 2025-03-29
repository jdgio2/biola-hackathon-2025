import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/auth";
import "../../global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f5f5f5",
          },
          headerTintColor: "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </AuthProvider>
  );
}
