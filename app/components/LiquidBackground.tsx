import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';

export function LiquidBackground() {
  const driftA = useRef(new Animated.Value(0)).current;
  const driftB = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopA = Animated.loop(
      Animated.sequence([
        Animated.timing(driftA, { toValue: 1, duration: 7000, useNativeDriver: true }),
        Animated.timing(driftA, { toValue: 0, duration: 7000, useNativeDriver: true }),
      ])
    );
    const loopB = Animated.loop(
      Animated.sequence([
        Animated.timing(driftB, { toValue: 1, duration: 5500, useNativeDriver: true }),
        Animated.timing(driftB, { toValue: 0, duration: 5500, useNativeDriver: true }),
      ])
    );
    loopA.start();
    loopB.start();
    return () => {
      loopA.stop();
      loopB.stop();
    };
  }, [driftA, driftB]);

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <View style={styles.base} />
      <Animated.View
        style={[
          styles.blob,
          styles.blobA,
          {
            transform: [
              { translateX: driftA.interpolate({ inputRange: [0, 1], outputRange: [-30, 30] }) },
              { translateY: driftA.interpolate({ inputRange: [0, 1], outputRange: [10, -35] }) },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.blob,
          styles.blobB,
          {
            transform: [
              { translateX: driftB.interpolate({ inputRange: [0, 1], outputRange: [20, -30] }) },
              { translateY: driftB.interpolate({ inputRange: [0, 1], outputRange: [-15, 25] }) },
            ],
          },
        ]}
      />
      <BlurView style={StyleSheet.absoluteFill} intensity={52} tint="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#090f16',
  },
  blob: {
    position: 'absolute',
    borderRadius: 9999,
    opacity: 0.55,
  },
  blobA: {
    width: 280,
    height: 280,
    top: -40,
    right: -60,
    backgroundColor: '#33d2c0',
  },
  blobB: {
    width: 320,
    height: 320,
    bottom: 40,
    left: -90,
    backgroundColor: '#4ca3ff',
  },
});
