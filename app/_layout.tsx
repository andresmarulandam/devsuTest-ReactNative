import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="product/[id]" />
      <Stack.Screen name="product/add" />
      <Stack.Screen name="product/edit/[id]" />
    </Stack>
  );
}
