import { ClerkProvider } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'
import SafeScreen from '../components/SafeScreen'
import { StatusBar } from 'expo-status-bar'
import { tokenCache } from '@clerk/clerk-expo/token-cache'

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeScreen>
      <StatusBar style="auto" />
    </ClerkProvider>
  )
}
