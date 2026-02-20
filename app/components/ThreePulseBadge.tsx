import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gsap } from 'gsap';
import * as THREE from 'three';

export function ThreePulseBadge() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [hue, setHue] = useState(185);
  const angleRef = useRef({ value: 0 });

  useEffect(() => {
    const tween = gsap.to(angleRef.current, {
      value: Math.PI * 2,
      duration: 3.2,
      repeat: -1,
      ease: 'none',
      onUpdate: () => {
        const a = angleRef.current.value;
        const tx = Math.cos(a) * 16;
        const ty = Math.sin(a * 1.25) * 14;
        setX(tx);
        setY(ty);
        setHue(185 + Math.sin(a) * 24);
      },
      onRepeat: () => {
        angleRef.current.value = 0;
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.orb,
          {
            transform: [{ translateX: x }, { translateY: y }],
            backgroundColor: `hsl(${hue} 78% 62%)`,
          },
        ]}
      />
      <Text style={styles.label}>GSAP + Three.js motion</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 220,
    height: 130,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.24)',
    backgroundColor: 'rgba(20, 42, 58, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    alignSelf: 'center',
    overflow: 'hidden',
  },
  orb: {
    width: 78,
    height: 78,
    borderRadius: 999,
    shadowColor: '#4ecfff',
    shadowOpacity: 0.8,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 0 },
  },
  label: {
    position: 'absolute',
    bottom: 12,
    color: '#ecfdff',
    fontSize: 13,
    fontWeight: '600',
  },
});
