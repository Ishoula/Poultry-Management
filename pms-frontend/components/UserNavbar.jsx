import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import logo from '../assets/images/logo.png';
import { SignOutButton } from './SignOutButton'; // Assuming this is your sign-out component
export default function Navbar() {
  return (
    <View style={{ backgroundColor: Colors.light.topBackground , width:'100%'}}>
      <View style={styles.topBar}>
        {/* Left: App Name */}
        <Text style={styles.title}>Smart Poultry</Text>

        {/* Right: Actions (Notification + Sign Out) */}
        <View style={styles.rightActions}>
          <TouchableOpacity style={styles.actionIcon}>
            <Ionicons
              name="notifications-outline"
              size={26}
              color={Colors.light.icon}
              // onPress={() => router.push('/notifications')} // ← optional: navigate to notifications
            />
          </TouchableOpacity>

          <SignOutButton /> {/* Your sign-out button/component */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.light.topBackground,
    height: 60,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
    width: '100%', // Android shadow
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.success,
    fontFamily: 'Roboto', // Ensure Roboto is loaded (or use system font)
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // Space between notification and sign-out
  },
  actionIcon: {
    padding: 8, // Larger touch area
  },
});