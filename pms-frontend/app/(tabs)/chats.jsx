import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { Colors } from '../../constants/colors'; // Assuming you have this for colors
import UserNavbar from '../../components/UserNavbar'; // Reuse if it fits the top bar
import shoula from '../../assets/images/shoula.jpg';
import agdede from '../../assets/images/racoo.jpeg';
import pasca from '../../assets/images/loveOfMyLife.jpg';
import sema from '../../assets/images/IMG-20250506-WA0007.jpg';
import community from '../../assets/images/racoo.jpeg';

// Mock data for recent messages (replace with real data from API/state)
const recentMessages = [
  {
    id: '1',
    name: 'Shoula',
    avatar: shoula, // Local import
    lastMessage: 'How are the new chicks ad...',
    time: '2m ago',
    unreadStatus: true, // Unread
  },
  {
    id: '2',
    name: 'Agdede',
    avatar: agdede,
    lastMessage: "You: I'm coming to visit ur chicks",
    time: '10m ago',
    unreadStatus: false, // Read
  },
  {
    id: '3',
    name: 'Pasca',
    avatar: pasca,
    lastMessage: 'You: Do you have eggs?',
    time: '30m ago',
    unreadStatus: false, // No dot in image
  },
  {
    id: '4',
    name: 'Sema',
    avatar: sema,
    lastMessage: 'When are you vaccinating...',
    time: '18:00',
    unreadStatus: false, // Read
  },
  {
    id: '5',
    name: 'Musanze Community',
    avatar: community, // Group avatar
    lastMessage: 'Depression be like',
    time: '20:00',
    unreadStatus: false, // Read
  },
  {
    id: '6',
    name: 'Musanze Community',
    avatar: community, // Group avatar
    lastMessage: 'Depression be like',
    time: '20:00',
    unreadStatus: false, // Read
  },
];

const MessagesScreen = () => {
  const [selectedId, setSelectedId] = useState(null); // For handling chat selection if needed

  const renderAvatarItem = ({ item }) => (
    <View style={styles.avatarContainer}>
      <Image source={item.avatar} style={styles.topAvatar} />
      <Text style={styles.avatarName}>{item.name}</Text>
    </View>
  );

  const renderMessageItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => {
        setSelectedId(item.id);
        // TODO: Navigate to chat details screen and mark as read
        console.log(`Opening chat with ${item.name}`);
      }}
    >
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.messageContent}>
        <Text style={[styles.name, item.unreadStatus && styles.unreadName]}>
          {item.name}
        </Text>
        <Text
          style={[styles.lastMessage, item.unreadStatus && styles.unreadMessage]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.lastMessage}
        </Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.time}>{item.time}</Text>
        {item.unreadStatus && (
          <View style={styles.unreadBadge} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Navbar – assuming UserNavbar includes bell and + */}
      <UserNavbar title="Smart Poultry" showBell={true} showSignOut={false} /> {/* Adjusted to match image; add + if needed */}
      <Text style={styles.pageTitle}>Messages</Text>
      <FlatList
        horizontal
        data={recentMessages.slice(0, 4)} // First 4 for top avatars
        renderItem={renderAvatarItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.topAvatarsList}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>RECENT</Text>
      </View>
      <FlatList
        data={recentMessages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      {/* Bottom Navigation – implement as a separate component or here if needed */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>🏠</Text> {/* Home icon – use real icons e.g. from @expo/vector-icons */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>≡</Text> {/* Menu or something */}
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNav]}>
          <Text style={styles.navIcon}>💬</Text> {/* Messages active */}
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>+</Text> {/* Add or profile */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background || '#f8f9fa',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 16,
    marginHorizontal: 20,
    color: Colors.light.text || '#000',
  },
  topAvatarsList: {
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  topAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  avatarName: {
    fontSize: 12,
    marginTop: 4,
    color: Colors.light.text || '#000',
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#888',
    textTransform: 'uppercase',
  },
  list: {
    // flex: 1,
    backgroundColor: Colors.light.topBackground, // Lighter gray to match image
    borderTopLeftRadius: 30, // Softer curve to match image
    borderTopRightRadius: 30,
  },
  messageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#d9d9d9',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  messageContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.light.text || '#000',
  },
  unreadName: {
    fontWeight: 'bold',
  },
  unreadMessage:{
    fontWeight:'bold',
    color:Colors.light.success,
  },
  lastMessage: {
    fontSize: 16,
    color: '#000000',
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 14,
    color: '#252525',
    marginBottom: 4,
  },
  unreadBadge: {
    backgroundColor: Colors.light.success, // Green to match image
    borderRadius: 6,
    width: 12,
    height: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  activeNav: {
    // Add active style if needed, e.g. backgroundColor: '#eee'
  },
  navIcon: {
    fontSize: 24,
  },
});
