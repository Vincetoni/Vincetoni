import { useEffect, useMemo, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { gsap } from 'gsap';
import * as THREE from 'three';

export function ThreePulseBadge() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [hue, setHue] = useState(185);
  const tRef = useRef(0);
  const orbit = useMemo(() => new THREE.Vector3(1, 0, 0), []);
  const axis = useMemo(() => new THREE.Vector3(0.6, 1, 0.2).normalize(), []);

  useEffect(() => {
    const cleanup = gsap.ticker.add(() => {
      tRef.current += 0.018;
      orbit.applyAxisAngle(axis, 0.024).normalize();
      const wobble = new THREE.Vector3(Math.sin(tRef.current), Math.cos(tRef.current * 0.6), 0).multiplyScalar(9);
      setX(orbit.x * 16 + wobble.x);
      setY(orbit.y * 16 + wobble.y);
      setHue(185 + Math.sin(tRef.current) * 24);
    });

    return () => {
      gsap.ticker.remove(cleanup as never);
    };
  }, [axis, orbit]);

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
