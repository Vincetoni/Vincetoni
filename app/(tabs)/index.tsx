import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { APP_STRINGS } from '../config/appContent';
import { HomeLoader } from '../components/HomeLoader';
import { ThreePulseBadge } from '../components/ThreePulseBadge';
import { TrollVideoModal } from '../components/TrollVideoModal';

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <View style={styles.screen}>
      {loading ? <HomeLoader onDone={() => setLoading(false)} /> : null}
      <View style={styles.content}>
        <Text style={styles.title}>{APP_STRINGS.brand}</Text>
        <Text style={styles.subtitle}>{APP_STRINGS.developmentTag}</Text>

        <BlurView intensity={40} tint="dark" style={styles.formCard}>
          <Text style={styles.formLabel}>Try sign in</Text>
          <TextInput placeholder="username" placeholderTextColor="#8cb2c5" style={styles.input} />
          <TextInput
            placeholder="password"
            placeholderTextColor="#8cb2c5"
            secureTextEntry
            style={styles.input}
          />
          <Pressable style={styles.signButton} onPress={() => setVideoOpen(true)}>
            <Text style={styles.signButtonText}>Sign in</Text>
          </Pressable>
        </BlurView>

        <ThreePulseBadge />
      </View>
      <TrollVideoModal visible={videoOpen} onClose={() => setVideoOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 72,
    paddingHorizontal: 14,
    paddingBottom: 130,
    justifyContent: 'flex-start',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    color: '#f1fdff',
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: '#b7dded',
    marginTop: 4,
    marginBottom: 18,
    fontSize: 15,
  },
  formCard: {
    width: '96%',
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(22, 40, 57, 0.35)',
    padding: 14,
  },
  formLabel: {
    color: '#e8fbff',
    fontSize: 17,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 45,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    marginBottom: 10,
    paddingHorizontal: 12,
    color: '#f4fdff',
    backgroundColor: 'rgba(5, 18, 28, 0.42)',
  },
  signButton: {
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6ce5fb',
    marginTop: 4,
  },
  signButtonText: {
    fontWeight: '800',
    color: '#0a2b39',
    fontSize: 16,
  },
});
