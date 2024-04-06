import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type Params = {
  phone: string;
  signin: string;
};

const Page = () => {
  const [code, setCode] = useState("");
  const { phone, signin } = useLocalSearchParams<Params>();

  return (
    <View>
      <Text>Page</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
