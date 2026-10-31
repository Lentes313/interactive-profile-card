// TASK 2 — Interactive Profile Card (starter)
// Start point: the solution of Task 1 + the new data. Follow the steps in README.md.
// TODO: add the imports you need in each step (Pressable, Button, Alert, TextInput, useState...)
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  Pressable,
  Button,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';

const COLORS = {
  background: '#EEF1F6',
  card: '#FFFFFF',
  text: '#1B1F2A',
  muted: '#6B7280',
  primary: '#2F6FED',
  primaryLight: '#E6EEFF',
  border: '#E5E7EB',
  online: '#22C55E',
  offline: '#9CA3AF',
};

const NAME = 'Emmanuel Alejandro';
const ROLE = 'Estudiante de Ingeniería en Sistemas Computacionales';
const LOCATION = 'Guadalajara, Jalisco, México';
const BIO =
  'Soy estudiante del TSJ en mis últimos semestres de carrera, especializándome en el desarrollo web. He trabajado en una página web de asistencia vial, un sistema para una barbería con reconocimiento facial y un asistente virtual de primeros auxilios. Me gusta aprender nuevas tecnologías y trabajar en equipo.';

const SKILLS = [
  'Pensamiento crítico',
  'Trabajo en equipo',
  'Buena comunicación',
  'Bases de datos',
  'Desarrollo web',
];
const BASE_FOLLOWERS = 120;
const MAX_MESSAGE = 140;

// Adds thousands separators: 1200 -> '1,200'
function formatCount(n) {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function App() {
  // STEP 3: follow / unfollow state
  const [isFollowing, setIsFollowing] = useState(false);

  // STEP 4: message composer state
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [message, setMessage] = useState('');
  const isSendDisabled = message.trim().length === 0;

  // When the keyboard opens, scroll down so the input stays visible above it.
  const scrollRef = useRef(null);
  useEffect(() => {
    const subscription = Keyboard.addListener('keyboardDidShow', () => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
    return () => subscription.remove();
  }, []);

  // STEP 3: followers is derived from the state, not a second useState
  const followers = BASE_FOLLOWERS + (isFollowing ? 1 : 0);
  const stats = [
    { label: 'Proyectos', value: '3' },
    { label: 'Seguidores', value: formatCount(followers) },
    { label: 'Siguiendo', value: '85' },
  ];

  // STEP 1: event handlers. We pass the function itself to onPress, we don't call it.
  // STEP 3: toggles the value instead of showing an alert
  function handleFollowPress() {
    setIsFollowing(!isFollowing);
  }

  // STEP 4: opens / closes the composer
  function handleMessagePress() {
    setIsComposerOpen(!isComposerOpen);
  }

  function handleSendPress() {
    Alert.alert('Mensaje enviado', message);
    setMessage('');
    setIsComposerOpen(false);
  }

  function handleSharePress() {
    Alert.alert('Compartir perfil', 'El enlace a tu perfil está listo para compartir.');
  }

  // TODO STEP 5: add the state for the bio, the online status and the selected skills

  return (
    // The screen shrinks while the keyboard is open, so the card can scroll above it.
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        ref={scrollRef}
        style={styles.screen}
        contentContainerStyle={styles.screenContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Image
            source={require('./assets/banner.png')}
            style={styles.banner}
            resizeMode="cover"
          />
          <View style={styles.body}>
            <View style={styles.headerRow}>
              {/* TODO STEP 5: make the avatar pressable to toggle the online status */}
              <View>
                <Image source={require('./assets/avatar.png')} style={styles.avatar} />
                <View style={styles.onlineBadge} />
              </View>
              <View style={styles.headerText}>
                <Text style={styles.name}>{NAME}</Text>
                <Text style={styles.role}>{ROLE}</Text>
                <Text style={styles.location}>{LOCATION}</Text>
              </View>
            </View>

            {/* TODO STEP 5: add a 'Read more' / 'Show less' link to expand the bio */}
            <Text style={styles.bio} numberOfLines={3}>
              {BIO}
            </Text>

            <View style={styles.statsRow}>
              {stats.map((item, index) => (
                <View
                  key={item.label}
                  style={[styles.stat, index < stats.length - 1 && styles.statDivider]}
                >
                  <Text style={styles.statValue}>{item.value}</Text>
                  <Text style={styles.statLabel}>{item.label}</Text>
                </View>
              ))}
            </View>

            {/* TODO STEP 5: make the skills selectable (Pressable + array state) */}
            <View style={styles.tags}>
              {SKILLS.map((skill) => (
                <View key={skill} style={styles.tag}>
                  <Text style={styles.tagText}>{skill}</Text>
                </View>
              ))}
            </View>

            {/* TODO STEP 1-3: turn these two Views into Pressable components with onPress.
                  STEP 2: give them visual feedback with the style function (pressed).
                  STEP 3: make the Follow button toggle between 'Follow' and 'Following'. */}
            <View style={styles.actions}>
              {/* STEP 2: style is a function that receives { pressed } and returns the styles. */}
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  isFollowing ? styles.buttonFollowing : styles.buttonPrimary,
                  pressed && styles.pressed,
                ]}
                onPress={handleFollowPress}
              >
                {/* STEP 3: label and text color depend on the state */}
                <Text style={[styles.buttonText, !isFollowing && styles.buttonTextPrimary]}>
                  {isFollowing ? 'Siguiendo' : 'Seguir'}
                </Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.pressed]}
                onPress={handleMessagePress}
              >
                <Text style={styles.buttonText}>{isComposerOpen ? 'Cerrar' : 'Mensaje'}</Text>
              </Pressable>
            </View>

            {/* STEP 4: conditional rendering, the composer only exists while it is open */}
            {isComposerOpen && (
              <View style={styles.composer}>
                {/* Controlled input: the text always comes from the state */}
                <TextInput
                  style={styles.input}
                  value={message}
                  onChangeText={(newText) => setMessage(newText)}
                  maxLength={MAX_MESSAGE}
                  placeholder="Escribe un mensaje..."
                  placeholderTextColor={COLORS.muted}
                />
                <View style={styles.composerFooter}>
                  <Text style={styles.counter}>
                    {message.length}/{MAX_MESSAGE} caracteres
                  </Text>
                  <Pressable
                    style={({ pressed }) => [
                      styles.sendButton,
                      isSendDisabled && styles.sendButtonDisabled,
                      pressed && styles.pressed,
                    ]}
                    onPress={handleSendPress}
                    disabled={isSendDisabled}
                  >
                    <Text style={styles.sendText}>Enviar</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {/* STEP 1: core Button. It has no style prop, so a View positions it. */}
            <View style={styles.shareWrapper}>
              <Button
                title="Compartir perfil"
                color={COLORS.primary}
                onPress={handleSharePress}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const cardShadow = Platform.select({
  ios: {
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
  },
  android: {
    elevation: 6,
  },
  default: {},
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    ...cardShadow,
  },
  banner: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  body: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: -44,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: COLORS.card,
  },
  onlineBadge: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: COLORS.online,
    borderWidth: 3,
    borderColor: COLORS.card,
  },
  headerText: {
    flex: 1,
    marginLeft: 14,
    marginTop: 52,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  role: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
    marginTop: 2,
  },
  location: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 2,
  },
  bio: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 21,
    color: COLORS.text,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 18,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  statDivider: {
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.text,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 2,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 16,
  },
  tag: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primary,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  buttonPrimary: {
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  buttonTextPrimary: {
    color: '#FFFFFF',
  },
  buttonFollowing: {
    backgroundColor: COLORS.primaryLight,
  },
  composer: {
    marginTop: 16,
  },
  composerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  counter: {
    fontSize: 12,
    color: COLORS.muted,
  },
  hint: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.muted,
  },
  input: {
    height: 44,
    paddingHorizontal: 12,
    fontSize: 15,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
  },
  link: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  offlineBadge: {
    backgroundColor: COLORS.offline,
  },
  pressed: {
    opacity: 0.6,
  },
  sendButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  sendButtonDisabled: {
    backgroundColor: COLORS.offline,
  },
  sendText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  shareWrapper: {
    marginTop: 12,
    alignItems: 'center',
  },
  tagSelected: {
    backgroundColor: COLORS.primary,
  },
  tagTextSelected: {
    color: '#FFFFFF',
  },
});
