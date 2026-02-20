import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { gsap } from 'gsap';
import { APP_STRINGS } from '../config/appContent';

type Props = {
  onDone: () => void;
};

export function HomeLoader({ onDone }: Props) {
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    const meter = { value: 0 };
    const tween = gsap.to(meter, {
      value: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.floor(meter.value)),
      onComplete: () => {
        if (doneRef.current) return;
        doneRef.current = true;
        onDone();
      },
    });
    return () => {
      tween.kill();
    };
  }, [onDone]);

  return (
    <BlurView intensity={55} tint="dark" style={styles.container}>
      <Text style={styles.title}>{APP_STRINGS.brand}</Text>
      <Text style={styles.subtitle}>{APP_STRINGS.developmentTag}</Text>
      <View style={styles.meter}>
        <View style={[styles.meterFill, { width: `${progress}%` }]} />
      </View>
      <Text style={styles.percent}>{progress}%</Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 20,
  },
  title: {
    color: '#e5fbff',
    fontSize: 38,
    fontWeight: '800',
    letterSpacing: 0.4,
  },
  subtitle: {
    color: '#b5d7e5',
    marginTop: 6,
    marginBottom: 18,
    fontSize: 15,
  },
  meter: {
    width: 260,
    height: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    backgroundColor: '#78ecff',
  },
  percent: {
    marginTop: 8,
    color: '#d8f4ff',
    fontWeight: '600',
  },
});
