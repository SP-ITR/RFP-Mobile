import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { login } from "../services/auth"; // adjust path

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigation = useNavigation();

  const onSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Validation", "Email and password required.");
      return;
    }
    setBusy(true);
    try {
      const response = await login({ email, password });
      Alert.alert("Success", "Logged in successfully!");
      // TODO: save token & navigate to home/dashboard
    } catch (e) {
      Alert.alert("Login failed", e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <LinearGradient
      colors={["#00bfa5", "#00e5ff"]}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Sign in</Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••••"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <View style={styles.linkRow}>
          <TouchableOpacity onPress={() => Alert.alert("Forgot password?")}>
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={onSubmit} disabled={busy} activeOpacity={0.9}>
          <LinearGradient
            colors={["#0a84ff", "#00c853"]}
            style={styles.button}
          >
            {busy ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign in</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  card: { width: "100%", backgroundColor: "rgba(0,0,0,0.4)", padding: 20, borderRadius: 16 },
  title: { color: "#fff", fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
  label: { color: "#fff", marginBottom: 6 },
  input: { backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 16 },
  linkRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  linkText: { color: "rgba(255,255,255,0.8)" },
  registerText: { color: "#fff", fontWeight: "600" },
  button: { paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
