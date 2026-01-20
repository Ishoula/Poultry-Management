import { ClerkProvider } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'
import SafeScreen from '../components/SafeScreen'
import { StatusBar } from 'expo-status-bar'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto: Roboto_400Regular,
    RobotoBold: Roboto_700Bold,
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null // or a loader component
  }

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeScreen>
      <StatusBar style="auto" />
    </ClerkProvider>
  )
}