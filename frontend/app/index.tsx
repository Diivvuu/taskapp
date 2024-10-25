// app/index.tsx
import { Text, View, Button } from "react-native";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome to the Home Screen!</Text>
      <Link href="/about">
        <Button title="Go to About Page" />
      </Link>
    </View>
  );
}
