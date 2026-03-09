import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';

import community from '../../assets/images/racoo.jpeg';
import shoula from '../../assets/images/shoula.jpg';
import agdede from '../../assets/images/racoo.jpeg';
import pasca from '../../assets/images/loveOfMyLife.jpg';
import sema from '../../assets/images/IMG-20250506-WA0007.jpg';

const chatMessages = [
  { id: '1', sender: 'Shoula', avatar: shoula, message: 'Does any of you have eggs available for bulk purchase today?', time: '10:00 AM', isMe: false },
  { id: '2', sender: 'Agdede', avatar: agdede, message: 'No. Just sold my batch yesterday.', time: '10:05 AM', isMe: false },
  { id: '3', sender: 'Pasca', avatar: pasca, message: 'Me neither, still waiting for production to pick up.', time: '10:07 AM', isMe: false },
  { id: '4', sender: 'Sema', avatar: sema, message: "I have a few crates left if you're interested.", time: '10:15 AM', isMe: false },
];

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const flatListRef = useRef(null);

  const router = useRouter();
  const { name } = useLocalSearchParams();

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'You',
        message: message.trim(),
        time: 'Just now',
        isMe: true,
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      // Scroll to bottom after state update
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.isMe ? styles.myMessageContainer : styles.theirMessageContainer]}>
      {!item.isMe && <Image source={item.avatar} style={styles.avatar} />}
      
      <View style={styles.bubbleWrapper}>
        {!item.isMe && <Text style={styles.senderName}>{item.sender}</Text>}
        <View style={[styles.bubble, item.isMe ? styles.myBubble : styles.theirBubble]}>
          <Text style={[styles.messageText, item.isMe && styles.myMessageText]}>{item.message}</Text>
          <Text style={[styles.timestamp, item.isMe && styles.myTimestamp]}>{item.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color="#1A1A1A" />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <Image source={community} style={styles.groupAvatar} />
          <View style={styles.textContainer}>
            <Text style={styles.groupName}>{typeof name === 'string' && name.trim() ? name : 'Chat'}</Text>
            <View style={styles.statusRow}>
              <View style={styles.onlineDot} />
              <Text style={styles.members}>122 members • 12 online</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.infoBtn}>
          <Ionicons name="information-circle-outline" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.chatContent}
        ListHeaderComponent={<Text style={styles.timeHeader}>TODAY</Text>}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachBtn}>
            <Ionicons name="add" size={24} color="#6B7280" />
          </TouchableOpacity>
          
          <TextInput
            style={styles.input}
            placeholder="Write a message..."
            placeholderTextColor="#9CA3AF"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          
          <TouchableOpacity 
            style={[styles.sendButton, !message.trim() && styles.sendDisabled]} 
            onPress={sendMessage}
            disabled={!message.trim()}
          >
            <MaterialCommunityIcons name="send" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 10,
    paddingBottom: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  headerInfo: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  textContainer: { marginLeft: 10 },
  groupAvatar: { width: 42, height: 42, borderRadius: 14 },
  groupName: { fontSize: 16, fontWeight: '700', color: '#111827' },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981', marginRight: 4 },
  members: { fontSize: 11, color: '#6B7280' },

  chatContent: { padding: 16, paddingBottom: 30 },
  timeHeader: { textAlign: 'center', fontSize: 11, fontWeight: '700', color: '#9CA3AF', marginBottom: 20, letterSpacing: 1 },
  
  messageContainer: { flexDirection: 'row', marginBottom: 16, maxWidth: '85%' },
  myMessageContainer: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  theirMessageContainer: { alignSelf: 'flex-start' },
  
  avatar: { width: 32, height: 32, borderRadius: 10, alignSelf: 'flex-end' },
  bubbleWrapper: { marginLeft: 8, marginRight: 8 },
  senderName: { fontSize: 11, fontWeight: '700', color: '#6B7280', marginBottom: 4, marginLeft: 4 },
  
  bubble: { padding: 12, borderRadius: 18 },
  myBubble: { backgroundColor: Colors.light.success, borderBottomRightRadius: 2 },
  theirBubble: { backgroundColor: '#FFF', borderBottomLeftRadius: 2 },
  
  messageText: { fontSize: 15, lineHeight: 20, color: '#1F2937' },
  myMessageText: { color: '#FFF' },
  timestamp: { fontSize: 10, color: '#9CA3AF', alignSelf: 'flex-end', marginTop: 4 },
  myTimestamp: { color: 'rgba(255,255,255,0.7)' },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
  },
  input: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginHorizontal: 10,
    fontSize: 15,
    maxHeight: 100,
    color: '#1F2937',
  },
  sendButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.light.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: { backgroundColor: '#D1D5DB' },
});

export default ChatScreen;