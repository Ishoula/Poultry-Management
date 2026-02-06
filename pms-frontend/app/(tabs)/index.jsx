import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Link, router } from 'expo-router'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import UserNavbar from '../../components/UserNavbar'
import { Colors } from '../../constants/colors'

export default function Page() {
  const { user } = useUser()
  
  // Auto-redirect to dashboard after loading
  setTimeout(() => {
    router.replace('/(tabs)/dashboard')
  }, 100)

  const quickActions = [
    {
      title: 'View Dashboard',
      icon: 'grid-outline',
      href: '/(tabs)/dashboard',
      color: Colors.light.success,
    },
    {
      title: 'Manage Batches',
      icon: 'egg-outline',
      href: '/(tabs)/batch',
      color: '#FBAC4F',
    },
    {
      title: 'View Tasks',
      icon: 'checkbox-outline',
      href: '/(tabs)/tasks',
      color: '#4CAF50',
    },
    {
      title: 'Manage Orders',
      icon: 'cart-outline',
      href: '/(tabs)/orders',
      color: '#2196F3',
    },
  ]

  return (
   <SafeAreaView style={{ flex: 1 }}>
     <UserNavbar/>
     <ScrollView style={styles.container}>
       <View style={styles.welcomeSection}>
         <Text style={styles.welcomeText}>Welcome back!</Text>
         <Text style={styles.subtitle}>What would you like to do today?</Text>
       </View>
       
       <View style={styles.actionsGrid}>
         {quickActions.map((action, index) => (
           <Link key={index} href={action.href} asChild>
             <TouchableOpacity style={[styles.actionCard, { borderLeftColor: action.color }]}>
               <Ionicons name={action.icon} size={32} color={action.color} />
               <Text style={styles.actionTitle}>{action.title}</Text>
             </TouchableOpacity>
           </Link>
         ))}
       </View>
     </ScrollView>
   </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeSection: {
    padding: 20,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 15,
  },
  actionCard: {
    width: '45%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
  },
  actionTitle: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
})