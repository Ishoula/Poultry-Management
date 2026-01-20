import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { ScrollView } from 'react-native-web';
import { Link, useRouter } from 'expo-router';
import logo from '../../assets/images/logo.png';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded || loading) return;

    setError('');
    setLoading(true);

    try {
      const signUpResponse = await signUp.create({
        username: username.trim(),
        emailAddress: emailAddress.trim(),
        password,
      });

      // If we get here → creation succeeded
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true);
    } catch (err) {
      let errorMessage = 'Failed to create account. Please try again.';

      if (err?.errors?.[0]) {
        const clerkError = err.errors[0];
        errorMessage = clerkError.longMessage || clerkError.message || errorMessage;

        // Very common Clerk errors - make them user-friendly
        if (clerkError.code === 'form_password_length_too_short') {
          errorMessage = 'Password must be at least 8 characters';
        } else if (clerkError.code === 'form_identifier_exists') {
          errorMessage = 'This email is already registered';
        } else if (clerkError.code === 'form_username_invalid') {
          errorMessage = 'Username can only contain letters, numbers, and underscores';
        }
      }

      setError(errorMessage);
      console.log('Sign-up error:', err);
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded || loading) return;

    setLoading(true);
    setError('');

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.replace('/(tabs)'); // ← adjust according to your navigation
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (err) {
      setError(err?.errors?.[0]?.longMessage || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <ScrollView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <Text style={styles.appName}>Smart Poultry</Text>

          <View style={styles.card}>
            <Text style={styles.welcomeTitle}>Verify Email</Text>
            <Text style={styles.welcomeSubtitle}>
              Enter the code sent to {emailAddress}
            </Text>

            <View style={styles.inputWrapper}>
              <Text style={styles.inputIcon}>
                <Ionicons name='mail-outline' size={20} color={Colors.light.icon} />
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Verification code"
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
                maxLength={6}
                autoFocus
              />
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.buttonDisabled]}
              onPress={onVerifyPress}
              disabled={loading || code.length < 4}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Verifying...' : 'Verify & Continue'}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.appName}>Smart Poultry</Text>

        {/* Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={styles.inactiveToggle}>
            <Link href="/sign-in" asChild>
              <Text style={styles.inactiveToggleText}>Login</Text>
            </Link>
          </TouchableOpacity>

          <TouchableOpacity style={styles.activeToggle}>
            <Text style={styles.activeToggleText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={logo}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.welcomeTitle}>Create Account</Text>
          <Text style={styles.welcomeSubtitle}>
            Manage your poultry farm with ease
          </Text>

          {/* Username Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>
              <Ionicons name='person-circle-outline' size={20} color={Colors.light.icon} />
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#aaa"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <Text style={styles.inputIcon}>
              <Ionicons name='mail-outline' size={20} color={Colors.light.icon} />
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={emailAddress}
              onChangeText={setEmailAddress}
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
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              editable={!loading}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={20}
                color={Colors.light.icon}
              />
            </TouchableOpacity>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.buttonDisabled]}
            onPress={onSignUpPress}
            disabled={
              loading ||
              !username.trim() ||
              !emailAddress.trim() ||
              password.length < 6
            }
          >
            <Text style={styles.buttonText}>
              {loading ? 'Creating...' : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <Link href="/login" asChild>
              <Text style={styles.link}>Sign in</Text>
            </Link>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
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
    color: '#1a472a',
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    overflow: 'hidden',
  },
  logo: {
    width: 200,
    height: 200,
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
    backgroundColor: '#1a472a',
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

  footer: {
    flexDirection: 'row',
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 15,
  },
  link: {
    color: '#2e7d32',
    fontWeight: '700',
    fontSize: 15,
  },
});