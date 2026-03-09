import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import UserNavbar from '../../components/UserNavbar';
import { useRouter } from 'expo-router';

import shoula from '../../assets/images/shoula.jpg';
import agdede from '../../assets/images/racoo.jpeg';
import pasca from '../../assets/images/loveOfMyLife.jpg';
import sema from '../../assets/images/IMG-20250506-WA0007.jpg';
import community from '../../assets/images/racoo.jpeg';

const recentMessages = [
  { id: '1', name: 'Shoula', avatar: shoula, lastMessage: 'How are the new chicks ad...', time: '2m ago', unreadStatus: true, online: true },
  { id: '2', name: 'Agdede', avatar: agdede, lastMessage: "You: I'm coming to visit ur chicks", time: '10m ago', unreadStatus: false, online: true },
  { id: '3', name: 'Pasca', avatar: pasca, lastMessage: 'You: Do you have eggs?', time: '30m ago', unreadStatus: false, online: false },
  { id: '4', name: 'Sema', avatar: sema, lastMessage: 'When are you vaccinating...', time: '18:00', unreadStatus: false, online: false },
  { id: '5', name: 'Musanze Community', avatar: community, lastMessage: 'Great tips on the brooding!', time: '20:00', unreadStatus: false, online: true },
  { id: '6', name: 'Poultry Experts', avatar: community, lastMessage: 'The market price is rising...', time: 'Yesterday', unreadStatus: false, online: false },
];

const MessagesScreen = () => {
  const router = useRouter();

  const openChat = (item) => {
    router.push({
      pathname: '/chatScreen',
      params: { chatId: item.id, name: item.name },
    });
  };

  const renderAvatarItem = ({ item }) => (
    <TouchableOpacity style={styles.avatarWrapper} onPress={() => openChat(item)}>
      <View style={[styles.avatarBorder, { borderColor: item.online ? '#4ADE80' : '#E5E7EB' }]}>
        <Image source={item.avatar} style={styles.topAvatar} />
      </View>
      <Text style={styles.avatarName} numberOfLines={1}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity activeOpacity={0.7} style={styles.messageCard} onPress={() => openChat(item)}>
      <View style={styles.avatarContainer}>
        <Image source={item.avatar} style={styles.listAvatar} />
        {item.online && <View style={styles.onlineDot} />}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={[styles.name, item.unreadStatus && styles.unreadText]}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.messageFooter}>
          <Text style={[styles.lastMessage, item.unreadStatus && styles.unreadSubtext]} numberOfLines={1}>
            {item.lastMessage}
          </Text>
          {item.unreadStatus && <View style={styles.unreadBadge} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <UserNavbar title="Smart Poultry" showBell={true} />
      
      <View style={styles.headerArea}>
        <View style={styles.titleRow}>
           <Text style={styles.pageTitle}>Messages</Text>
           {/* <TouchableOpacity style={styles.searchIcon}>
              <Text>🔍</Text> 
           </TouchableOpacity> */}
        </View>
        <FlatList
          horizontal
          data={recentMessages.filter(m => m.id !== '5' && m.id !== '6')} 
          renderItem={renderAvatarItem}
          keyExtractor={(item) => `top-${item.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topAvatarsContent}
        />
      </View>

      <View style={styles.messageSheet}>
        <View style={styles.sheetHeader}>
          <Text style={styles.sectionTitle}>RECENT CONVERSATIONS</Text>
          <TouchableOpacity><Text style={styles.markRead}>Mark all as read</Text></TouchableOpacity>
        </View>
        
        <FlatList
          data={recentMessages}
          renderItem={renderMessageItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 20 },
  pageTitle: {
    fontSize: 32,
    fontWeight: '800',
    marginLeft: 20,
    marginVertical: 10,
    color: '#111827',
  },
  topAvatarsContent: { paddingHorizontal: 20, paddingVertical: 10 },
  avatarWrapper: { alignItems: 'center', marginRight: 20 },
  avatarBorder: {
    padding: 3,
    borderRadius: 24, // Modern Squircle-ish
    borderWidth: 2,
  },
  topAvatar: { width: 56, height: 56, borderRadius: 20 },
  avatarName: { fontSize: 12, fontWeight: '500', marginTop: 8, color: '#6B7280' },

  messageSheet: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Lighter grey background
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: 10,
  },
  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: '#9CA3AF', letterSpacing: 1.5 },
  markRead: { fontSize: 12, color: '#10B981', fontWeight: '600' },

  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 24,
    marginBottom: 12,
    // Soft Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarContainer: { position: 'relative' },
  listAvatar: { width: 50, height: 50, borderRadius: 18 },
  onlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  messageContent: { flex: 1, marginLeft: 15 },
  messageHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  messageFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  name: { fontSize: 16, fontWeight: '700', color: '#111827' },
  time: { fontSize: 12, color: '#9CA3AF' },
  lastMessage: { fontSize: 14, color: '#6B7280', flex: 1, marginRight: 10 },
  unreadBadge: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#10B981' },
  unreadText: { color: '#000' },
  unreadSubtext: { color: '#111827', fontWeight: '700' },
});

export default MessagesScreen;