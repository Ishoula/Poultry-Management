import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import {logo} from '../../assets/images/logo.png'
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError('');

    try {
      const signInAttempt = await signIn.create({
        identifier: phone.trim(),
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(tabs)'); // ← adjust to your app structure
      } else {
        setError('Please complete additional steps');
      }
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        {/* Header - App Name */}
        <Text style={styles.appName}>Smart Poultry</Text>

        {/* Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={styles.activeToggle}>
            <Text style={styles.activeToggleText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.inactiveToggle}>
            <Text style={styles.inactiveToggleText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Card-like container */}
        <View style={styles.card}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={logo} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Welcome Text */}
          <Text style={styles.welcomeTitle}>Welcome Back!</Text>
          <Text style={styles.welcomeSubtitle}>
            Login to your poultry account
          </Text>

          {/* Phone Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>
              <Ionicons name='call-outline' size={20} color={Colors.light.icon} />
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>
              <Ionicons name='lock-closed-outline' size={20} color={Colors.light.icon} />
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              autoCorrect={false}
              editable={!loading}
            />
            <TouchableOpacity style={styles.eyeIcon}>
              <Text style={styles.inputIcon}>
                <Ionicons name='eye-off-outline' size={20} color={Colors.light.icon}/>
              </Text>
            </TouchableOpacity>
          </View>

          {/* Error */}
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          {/* Login Button */}
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading || !phone || !password}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a472a', // dark green
    marginTop: 40,
    marginBottom: 28,
  },

  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#e8f5e9',
    borderRadius: 50,
    padding: 4,
    marginBottom: 32,
    width: '85%',
    maxWidth: 320,
  },
  activeToggle: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activeToggleText: {
    color: '#2e7d32',
    fontWeight: '700',
    fontSize: 16,
  },
  inactiveToggle: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  inactiveToggleText: {
    color: '#2e7d32',
    fontWeight: '600',
    fontSize: 16,
    opacity: 0.75,
  },

  card: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: 'white',
    borderRadius: 28,
    padding: 32,
    paddingTop: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },

  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#1a472a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  logo: {
    width: 80,
    height: 80,
  },

  welcomeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: '#666',
    marginBottom: 36,
    textAlign: 'center',
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 18,
    height: 58,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  inputIcon: {
    fontSize: 22,
    marginRight: 12,
    color: '#64748b',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111',
  },
  eyeIcon: {
    padding: 4,
  },

  errorText: {
    color: '#dc2626',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },

  loginButton: {
    backgroundColor: '#1a472a', // dark green
    width: '100%',
    height: 58,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});