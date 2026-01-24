import { useState } from 'react';
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
import { Colors } from '../../constants/colors'; // Assuming this exists
import community from '../../assets/images/racoo.jpeg'; // Reuse from previous

// Mock avatars (replace with actual imports)

import shoula from '../../assets/images/shoula.jpg';
import agdede from '../../assets/images/racoo.jpeg';
import pasca from '../../assets/images/loveOfMyLife.jpg';
import sema from '../../assets/images/IMG-20250506-WA0007.jpg';


// Mock chat messages (left-aligned for others)
const chatMessages = [
  {
    id: '1',
    sender: 'Shoula',
    avatar: shoula,
    message: 'Does any of you have eggs available for bulk purchase today?',
    time: 'TODAY',
    isMe: false,
  },
  {
    id: '2',
    sender: 'Agdede',
    avatar: agdede,
    message: 'No. Just sold my batch yesterday.',
    isMe: false,
  },
  {
    id: '3',
    sender: 'Pasca',
    avatar: pasca,
    message: 'Me neither, still waiting for production to pick up.',
    isMe: false,
  },
  {
    id: '4',
    sender: 'Sema',
    avatar: sema,
    message: "I have a few crates left if you're interested.",
    isMe: false,
  },
  // Add more or fetch from API
];

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(chatMessages);

  const sendMessage = () => {
    if (message.trim()) {
      setMessages([
        ...messages,
        {
          id: Date.now().toString(),
          sender: 'You',
          avatar: null, // Or your avatar
          message: message.trim(),
          isMe: true,
        },
      ]);
      setMessage('');
      // TODO: Send to backend
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.isMe && styles.myMessageContainer]}>
      {!item.isMe && (
        <Image source={item.avatar} style={styles.avatar} />
      )}
      <View style={[styles.bubble, item.isMe && styles.myBubble]}>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Image source={community} style={styles.groupAvatar} />
        <View style={styles.groupInfo}>
          <Text style={styles.groupName}>Musanze Community</Text>
          <Text style={styles.members}>122 members + online</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.infoIcon}>ⓘ</Text> {/* Info icon */}
        </TouchableOpacity>
      </View>

      {/* Chat List */}
      <FlatList
        inverted // New messages at bottom
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.chatList}
        contentContainerStyle={styles.chatContent}
        ListHeaderComponent={
          <Text style={styles.timeHeader}>TODAY</Text>
        }
      />

      {/* Input Bar */}
      <View style={styles.inputBar}>
        <TouchableOpacity style={styles.plusButton}>
          <Text style={styles.plusIcon}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendIcon}>▶</Text> {/* Send arrow */}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // Light blue-ish to match image
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    fontSize: 24,
    color: '#000',
    marginRight: 16,
  },
  groupAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50', // Green as in image
  },
  groupInfo: {
    flex: 1,
    marginLeft: 12,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  members: {
    fontSize: 12,
    color: '#666',
  },
  infoIcon: {
    fontSize: 18,
    color: '#666',
  },
  chatList: {
    flex: 1,
  },
  chatContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  timeHeader: {
    textAlign: 'center',
    fontSize: 12,
    color: '#888',
    marginVertical: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  myMessageContainer: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  bubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  myBubble: {
    backgroundColor: '#dcf8c6', // Light green for my messages (adjust if needed)
  },
  messageText: {
    fontSize: 14,
    color: '#000',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  plusButton: {
    padding: 8,
  },
  plusIcon: {
    fontSize: 24,
    color: '#666',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: Colors.light.lightSuccess,
    borderRadius: 20,
    fontSize: 14,
  },
  sendButton: {
    padding: 8,
    marginLeft: 8,
  },
  sendIcon: {
    fontSize: 24,
    color: '#4CAF50', // Green send button
  },
});

export default ChatScreen;