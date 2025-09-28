import { Stack } from 'expo-router';

export default function MusicLayout() {
  
  return (
    <Stack>
      <Stack.Screen options={{ headerShown: false }} name="music" />
    </Stack>
  );
}
