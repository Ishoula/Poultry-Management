import { useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'
import UserNavbar from '../../components/UserNavbar'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {66
  const { user } = useUser()

  return (
   <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <UserNavbar/>
     
   </SafeAreaView>
  )
}