import React, { useState } from "react";
import {
  Text,
  View,
  Linking,
  Platform,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";

import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaskInput from "react-native-mask-input";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Colors from "@/constants/Colors";

const SYRIA_PHONE = [
  "(",
  "+",
  /\d/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
];

const Page = () => {
  const router = useRouter();
  const { bottom } = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 0;

  const openLink = () => {
    Linking.openURL("https://youtube.com");
  };

  const sendOTP = async () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      router.push(`/verify/${phoneNumber}`);
    }, 200);
  };

  const trySignIn = async () => {};

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ flex: 1 }}
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={{ padding: 10, fontSize: 20 }}>Sending Code...</Text>
          </View>
        )}

        <View style={styles.container}>
          <Text style={styles.description}>
            WhatsApp will need to verify your account. Carrier charges may
            apply.
          </Text>

          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>Syria</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.gray} />
            </View>

            <View style={styles.separator} />

            <MaskInput
              style={styles.input}
              value={phoneNumber}
              keyboardType="phone-pad"
              autoFocus
              placeholder="(+963) your phone number"
              onChangeText={(masked, unmasked) => {
                setPhoneNumber(masked);
                console.log(masked);
                console.log(unmasked);
              }}
              mask={SYRIA_PHONE}
            />
          </View>

          <Text style={styles.legal}>
            You must be{" "}
            <Text style={styles.link} onPress={openLink}>
              at least 16 years old{" "}
            </Text>
            to register. Learn how WhatsApp works with the{" "}
            <Text style={styles.link} onPress={openLink}>
              Meta Companies
            </Text>
            .
          </Text>

          <View style={{ flex: 1 }} />

          <TouchableOpacity
            style={[
              styles.button,
              phoneNumber !== "" ? styles.enabled : null,
              { marginBottom: bottom },
            ]}
            onPress={sendOTP}
            disabled={phoneNumber === ""}
          >
            <Text
              style={[
                styles.buttonText,
                phoneNumber !== "" ? { color: "#fff" } : null,
              ]}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.background,
    gap: 20,
  },

  description: {
    fontSize: 14,
    color: Colors.gray,
  },

  list: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 10,
    padding: 10,
  },

  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 6,
    marginBottom: 10,
  },

  listItemText: {
    fontSize: 18,
    color: Colors.primary,
  },

  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.gray,
    opacity: 0.2,
  },

  legal: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
  },

  link: {
    color: Colors.primary,
  },

  button: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.lightGray,
    padding: 10,
    borderRadius: 10,
  },

  enabled: {
    backgroundColor: Colors.primary,
    color: "#fff",
  },

  buttonText: {
    color: Colors.gray,
    fontSize: 22,
    fontWeight: "500",
  },

  input: {
    backgroundColor: "#fff",
    width: "100%",
    fontSize: 16,
    padding: 6,
    marginTop: 10,
  },

  loading: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
