import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = "https://pghlipjnxhwsdgupessm.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnaGxpcGpueGh3c2RndXBlc3NtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyMjE2MjcsImV4cCI6MjA1ODc5NzYyN30.Qh__zEDtNJhQyNGktQMxHuMn8Dowf0vKmGeqVUZJKPo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: Platform.OS === "web" ? false : true,
    detectSessionInUrl: false,
  },
});
