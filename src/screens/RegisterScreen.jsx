import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import LinearGradient from "react-native-linear-gradient";
import { register } from "../services/auth"; // adjust path

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const onRegister = async () => {
    if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
      Alert.alert("Validation", "All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Validation", "Passwords do not match.");
      return;
    }

    setBusy(true);
    try {
      const response = await register({
        firstName,
        lastName,
        contactNumber: phone,
        email,
        password,
        confirmPassword,
      });
      Alert.alert("Success", "Account created successfully!");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Register failed", err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <LinearGradient
      colors={["#00bfa5", "#00e5ff"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.title}>Create your account</Text>

          <View style={styles.row}>
            <View style={[styles.flex, { marginRight: 8 }]}>
              <Text style={styles.label}>First Name *</Text>
              <TextInput
                placeholder="e.g. Kanu"
                placeholderTextColor="#94a3b8"
                value={firstName}
                onChangeText={setFirstName}
                style={styles.input}
              />
            </View>
            <View style={styles.flex}>
              <Text style={styles.label}>Last Name *</Text>
              <TextInput
                placeholder="e.g. Pal"
                placeholderTextColor="#94a3b8"
                value={lastName}
                onChangeText={setLastName}
                style={styles.input}
              />
            </View>
          </View>

          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            placeholder="9876543210"
            placeholderTextColor="#94a3b8"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />

          <Text style={styles.label}>Email *</Text>
          <TextInput
            placeholder="you@example.com"
            placeholderTextColor="#94a3b8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />

          <Text style={styles.label}>Password *</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Text style={styles.label}>Confirm Password *</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />

          <View style={styles.linkRow}>
            <Text style={styles.linkText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={onRegister} disabled={busy} activeOpacity={0.9}>
            <LinearGradient
              colors={["#0a84ff", "#00c853"]}
              style={styles.button}
            >
              {busy ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: "center", paddingHorizontal: 20 },
  card: { backgroundColor: "rgba(0,0,0,0.4)", padding: 20, borderRadius: 16 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 24 },
  label: { color: "#fff", marginBottom: 6 },
  input: { backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, marginBottom: 16 },
  row: { flexDirection: "row", marginBottom: 16 },
  flex: { flex: 1 },
  linkRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  linkText: { color: "rgba(255,255,255,0.8)" },
  loginText: { color: "#fff", fontWeight: "600" },
  button: { paddingVertical: 12, borderRadius: 12, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
});
