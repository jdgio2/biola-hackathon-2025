import { Text, View } from "react-native";
import { supabase } from "../utils/supabase";
import { useEffect, useState } from "react";

export default function Index() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from('churches').select('count');
        if (error) throw error;
        setIsConnected(true);
      } catch (error) {
        console.error('Error:', error);
        setIsConnected(false);
      }
    }
    testConnection();
  }, []);

  return (
    <View className="flex items-center justify-center h-full">
      <Text className="text-2xl mb-4">Supabase Connection Test</Text>
      <Text className="text-lg">
        Status: {isConnected === null ? 'Checking...' : isConnected ? 'Connected! ✅' : 'Failed to connect ❌'}
      </Text>
    </View>
  );
}