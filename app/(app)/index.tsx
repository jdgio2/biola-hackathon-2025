import { Text, View, TouchableOpacity } from "react-native";
import { useAuth } from "../contexts/auth";
import { Redirect } from "expo-router";

export default function Index() {
  const { user, signOut, loading } = useAuth();

  console.log('App Index State:', { user: user?.email, loading });

  // Show loading state
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-xl">Loading...</Text>
      </View>
    );
  }

  // Redirect to sign in if not authenticated
  if (!user) {
    console.log('No user in app index, redirecting to sign-in');
    return <Redirect href="/sign-in" />;
  }

  return (
    <View className="flex-1 items-center justify-center p-4">
      <Text className="text-2xl font-bold mb-4">Welcome!</Text>
      <Text className="text-lg mb-2">Signed in as:</Text>
      <Text className="text-gray-600 mb-8">{user.email}</Text>

      <TouchableOpacity
        className="bg-red-500 px-6 py-3 rounded-lg"
        onPress={signOut}
      >
        <Text className="text-white font-semibold">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}