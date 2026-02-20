import { Ionicons } from '@expo/vector-icons'
import { Redirect, Tabs } from 'expo-router'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../constants/colors'
import { useAuth } from '../../context/AuthContext'

/** Screens that live inside (tabs)/ but should NOT appear in the tab bar */
const HIDDEN_SCREENS = [
  'dashboard',
  'addBatch',
  'addBreed',
  'addGrowthLog',
  'addOrder',
  'addTask',
  'chatScreen',
  'breeds',
  'growthLog',
]

const HIDDEN_OPTIONS = {
  tabBarButton: () => null,
}

// Custom tab bar label
function TabLabel({ label, focused }) {
  return (
    <Text
      style={[
        styles.tabLabel,
        focused ? styles.tabLabelActive : styles.tabLabelInactive,
      ]}
    >
      {label}
    </Text>
  )
}

// Custom tab bar icon wrapper that draws the pill behind the active icon
function TabIcon({ name, focused, color, size }) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Ionicons
        name={focused ? name.replace('-outline', '') : name}
        size={focused ? size - 1 : size - 2}
        color={color}
      />
    </View>
  )
}

export default function Layout() {
  const { initializing, isSignedIn } = useAuth()

  if (!initializing && !isSignedIn) {
    return <Redirect href={'/(auth)/login'} />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.success,
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* ── VISIBLE TABS ─────────────────────────────── */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Home" focused={focused} />,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="home-outline" focused={focused} color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="batch"
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Batches" focused={focused} />,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="egg-outline" focused={focused} color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Tasks" focused={focused} />,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="checkbox-outline" focused={focused} color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Orders" focused={focused} />,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="cart-outline" focused={focused} color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          tabBarLabel: ({ focused }) => <TabLabel label="Chats" focused={focused} />,
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="chatbubble-outline" focused={focused} color={color} size={size} />
          ),
        }}
      />

      {/* ── HIDDEN SCREENS (must be declared so Expo Router doesn't auto-add them) ── */}
      {HIDDEN_SCREENS.map((name) => (
        <Tabs.Screen key={name} name={name} options={HIDDEN_OPTIONS} />
      ))}
    </Tabs>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 0,
    elevation: 0,
    // Drop shadow above the bar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    height: Platform.OS === 'ios' ? 84 : 68,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
    paddingHorizontal: 4,
  },
  // Pill background behind the active icon
  iconWrap: {
    width: 44,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  iconWrapActive: {
    backgroundColor: `${Colors.light.success}18`, // subtle green tint pill
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    color: Colors.light.success,
  },
  tabLabelInactive: {
    color: '#9CA3AF',
  },
})