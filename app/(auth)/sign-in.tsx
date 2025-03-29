import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../utils/supabase";
import { Link, router } from "expo-router";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    console.log('Attempting to sign in with:', email);
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('Sign in response:', { 
        user: data?.user?.email,
        error: error?.message
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      if (data.user) {
        console.log('Sign in successful, redirecting...');
        // Try both navigation methods
        try {
          await router.replace('/(app)');
        } catch (navError) {
          console.error('Navigation error:', navError);
          // Fallback navigation
          router.push('/(app)');
        }
      }
    } catch (error) {
      console.error("Sign in error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 justify-center p-4 bg-white">
      <Text className="text-3xl font-bold mb-8 text-center">Welcome Back</Text>
      
      <View className="space-y-4">
        <TextInput
          className="p-4 border border-gray-300 rounded-lg"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TextInput
          className="p-4 border border-gray-300 rounded-lg"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg"
          onPress={signInWithEmail}
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold">
            {loading ? "Signing in..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Don't have an account? </Text>
          <Link href="/sign-up" className="text-blue-500 font-semibold">
            Sign Up
          </Link>
        </View>
      </View>
    </View>
  );
}