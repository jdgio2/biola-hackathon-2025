import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../utils/supabase";
import { Link, router } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      if (data.user) {
        console.log("Sign up successful:", data.user);
        // Automatically sign in after sign up
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          Alert.alert("Error", "Account created but couldn't sign in automatically. Please sign in manually.");
          router.replace("/sign-in");
        } else {
          router.replace("/(app)");
        }
      }
    } catch (error) {
      console.error("Sign up error:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View className="flex-1 justify-center p-4 bg-white">
      <Text className="text-3xl font-bold mb-8 text-center">Create Account</Text>
      
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
          onPress={signUpWithEmail}
          disabled={loading}
        >
          <Text className="text-white text-center font-semibold">
            {loading ? "Creating account..." : "Sign Up"}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-4">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/sign-in" className="text-blue-500 font-semibold">
            Sign In
          </Link>
        </View>
      </View>
    </View>
  );
}