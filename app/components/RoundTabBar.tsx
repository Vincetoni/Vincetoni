import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  index: 'home',
  focus: 'game-controller',
  chill: 'happy',
  lab: 'flask',
};

export function RoundTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.wrap}>
      <BlurView intensity={45} tint="dark" style={styles.bar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isHome = route.name === 'index';
          const label = descriptors[route.key].options.title ?? route.name;
          const iconName = iconMap[route.name] ?? 'ellipse';

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={[styles.item, isHome ? styles.homeItem : styles.smallItem, isFocused && styles.activeItem]}
            >
              <Ionicons name={iconName} size={isHome ? 26 : 18} color="#e9f8ff" />
              {!isHome ? <Text style={styles.label}>{label}</Text> : null}
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 22,
    alignItems: 'center',
  },
  bar: {
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(30, 42, 58, 0.5)',
  },
  item: {
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeItem: {
    width: 72,
    height: 72,
  },
  smallItem: {
    width: 58,
    height: 58,
  },
  activeItem: {
    backgroundColor: 'rgba(95, 214, 243, 0.32)',
    borderColor: 'rgba(214, 248, 255, 0.8)',
  },
  label: {
    fontSize: 10,
    color: '#e9f8ff',
    marginTop: 1,
  },
});
