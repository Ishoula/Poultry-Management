import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { authFetch } from '../../context/AuthContext';

import community from '../../assets/images/racoo.jpeg';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const flatListRef = useRef(null);

  const router = useRouter();
  const { name, chatId, me } = useLocalSearchParams();

  const myId = useMemo(() => (typeof me === 'string' ? me : null), [me]);

  const loadMessages = React.useCallback(async () => {
    if (!chatId || typeof chatId !== 'string') return;
    try {
      setError('');
      setLoading(true);
      const data = await authFetch(`/chats/${chatId}/messages?limit=50`, { method: 'GET' });
      setMessages(Array.isArray(data?.messages) ? data.messages : []);
    } catch (e) {
      setError(e?.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [chatId]);

  const markRead = React.useCallback(async () => {
    if (!chatId || typeof chatId !== 'string') return;
    try {
      await authFetch(`/chats/${chatId}/read`, { method: 'PUT' });
    } catch {
      // ignore
    }
  }, [chatId]);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  useEffect(() => {
    markRead();
  }, [markRead]);

  const sendMessage = async () => {
    if (!chatId || typeof chatId !== 'string') return;
    const content = message.trim();
    if (!content || sending) return;

    try {
      setSending(true);
      const res = await authFetch(`/chats/${chatId}/messages`, {
        method: 'POST',
        body: JSON.stringify({ content }),
      });
      const created = res?.message;
      if (created) {
        setMessages((prev) => [...prev, created]);
      } else {
        await loadMessages();
      }
      setMessage('');
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    } catch (e) {
      Alert.alert('Error', e?.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const uiMessages = useMemo(() => {
    return messages.map((m) => {
      const ts = m?.createdAt ? new Date(m.createdAt) : null;
      const time = ts && !Number.isNaN(ts.getTime())
        ? ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : '';

      const isMe = myId && (m?.sender?._id ? m.sender._id === myId : m?.sender === myId);
      const senderName = m?.sender?.username || (isMe ? 'You' : 'User');
      const avatar = m?.sender?.photo ? { uri: m.sender.photo } : community;

      return {
        id: m?._id || String(Math.random()),
        sender: senderName,
        avatar,
        message: m?.content || '',
        time,
        isMe: !!isMe,
      };
    });
  }, [messages, myId]);

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

      {loading ? (
        <View style={{ paddingTop: 30 }}>
          <ActivityIndicator size="small" color={Colors.light.success} />
        </View>
      ) : error ? (
        <View style={{ padding: 16 }}>
          <Text style={{ color: '#dc2626' }}>{error}</Text>
          <TouchableOpacity onPress={loadMessages} style={{ marginTop: 10 }}>
            <Text style={{ color: Colors.light.success, fontWeight: '700' }}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={uiMessages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.chatContent}
          ListHeaderComponent={<Text style={styles.timeHeader}>TODAY</Text>}
        />
      )}

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
            disabled={!message.trim() || sending}
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