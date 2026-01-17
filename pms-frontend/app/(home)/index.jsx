import { useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import { SignOutButton } from '../../components/SignOutButton'

export default function Page() {
  const { user } = useUser()

  return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <Text>Welcome, {user?.firstName || 'User'}!</Text>
     <SignOutButton />
   </View>
  )
}