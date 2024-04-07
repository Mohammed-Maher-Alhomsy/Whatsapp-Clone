import { useEffect, useState } from "react";
import {
  Text,
  View,
  Alert,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { Stack, useLocalSearchParams } from "expo-router";
import {
  Cursor,
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

import Colors from "@/constants/Colors";
import {
  isClerkAPIResponseError,
  useSignIn,
  useSignUp,
} from "@clerk/clerk-expo";

type Params = {
  phone: string;
  signin: string;
};

const Page = () => {
  const [code, setCode] = useState("");
  const { phone, signin } = useLocalSearchParams<Params>();

  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  const ref = useBlurOnFulfill({ value: code, cellCount: 6 });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  });

  useEffect(() => {
    if (code.length === 6) {
      if (signin === "true") {
        verifySignIn();
      } else {
        verifyCode();
      }
    }
  }, [code]);

  const verifyCode = async () => {
    try {
      await signUp?.attemptPhoneNumberVerification({ code });
      await setActive!({ session: signUp?.createdSessionId });
    } catch (error) {
      console.log("error", JSON.stringify(error, null, 2));

      if (isClerkAPIResponseError(error)) {
        Alert.alert("Error", error.errors[0].message);
      }
    }
  };

  const resendCode = async () => {
    try {
      if (signin === "true") {
        const { supportedFirstFactors } = await signIn!.create({
          identifier: phone,
        });

        const firstPhoneFactory: any = supportedFirstFactors.find(
          ({ strategy }) => strategy === "phone_code"
        );

        const { phoneNumberId } = firstPhoneFactory;

        await signIn!.prepareFirstFactor({
          strategy: "phone_code",
          phoneNumberId,
        });
      } else {
        await signUp?.create({
          phoneNumber: phone,
        });
        signUp!.preparePhoneNumberVerification();
      }
    } catch (err) {
      console.log("Error", JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  const verifySignIn = async () => {
    try {
      await signIn!.attemptFirstFactor({
        strategy: "phone_code",
        code,
      });

      await setActive!({ session: signIn?.createdSessionId });
    } catch (err) {
      console.log("Error", JSON.stringify(err, null, 2));

      if (isClerkAPIResponseError(err)) {
        Alert.alert("Error", err.errors[0].message);
      }
    }
  };

  return (
    <View style={styles.constainer}>
      <Stack.Screen options={{ title: phone }} />

      <Text style={styles.legal}>
        We have sent you an SMS with a code to the number above.
      </Text>

      {/* @ts-ignore */}
      <CodeField
        ref={ref}
        {...props}
        value={code}
        onChangeText={setCode}
        cellCount={6}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        autoComplete={Platform.select({
          android: "sms-otp",
          default: "one-time-code",
        })}
        testID="my-code-input"
        renderCell={({ index, symbol, isFocused }) => (
          <View
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />

      <Text style={styles.legal}>
        To complete your phone number verification, please enter the 6-digit
        activation code.
      </Text>

      <TouchableOpacity style={styles.button} onPress={resendCode}>
        <Text style={styles.buttonText}>
          Didn't recive a verification code?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    gap: 20,
    padding: 20,
    alignItems: "center",
    backgroundColor: Colors.background,
  },

  legal: {
    fontSize: 14,
    textAlign: "center",
    color: "#000",
  },

  button: {
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: Colors.primary,
    fontSize: 18,
  },

  cellRoot: {
    width: 40,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },

  cellText: {
    color: "#000",
    fontSize: 36,
    textAlign: "center",
  },

  focusCell: {
    borderColor: "#000",
    paddingBottom: 4,
    borderBottomWidth: 2,
  },

  codeFieldRoot: {
    marginTop: 20,
    width: 260,
    marginLeft: "auto",
    marginRight: "auto",
    gap: 8,
  },
});
