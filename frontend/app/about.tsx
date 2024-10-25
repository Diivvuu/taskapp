// app/about.tsx
import { Text, View, Button } from "react-native";
import { useRouter } from "expo-router";

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>This is the About Page!</Text>
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
}
