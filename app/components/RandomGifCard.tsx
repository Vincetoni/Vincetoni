import { useMemo } from 'react';
import { Image, ImageResolveAssetSource, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { APP_STRINGS, BUSY_JOKES } from '../config/appContent';
import { GIF_MANIFEST } from '../data/gifManifest';
import { seededNumber } from '../utils/random';

type Props = {
  seed: string;
  pageLabel: string;
};

function shapeForAsset(asset: ImageResolveAssetSource) {
  const ratio = asset.width / asset.height;
  if (ratio > 1.2) {
    return {
      borderRadius: 34,
      width: 330,
      height: 210,
      transform: [{ rotate: '-2deg' }],
    };
  }
  if (ratio < 0.8) {
    return {
      borderRadius: 120,
      width: 250,
      height: 340,
      transform: [{ rotate: '2deg' }],
    };
  }
  return {
    borderRadius: 54,
    width: 280,
    height: 280,
    transform: [{ rotate: '-1deg' }],
  };
}

export function RandomGifCard({ seed, pageLabel }: Props) {
  const gifIndex = useMemo(() => seededNumber(seed, GIF_MANIFEST.length), [seed]);
  const jokeIndex = useMemo(() => seededNumber(`${seed}-joke`, BUSY_JOKES.length), [seed]);
  const gif = GIF_MANIFEST[gifIndex];
  const source = gif.source as ImageSourcePropType;
  const asset = Image.resolveAssetSource(source);
  const shapeStyle = shapeForAsset(asset);

  return (
    <BlurView intensity={40} tint="dark" style={styles.card}>
      <Text style={styles.pageTag}>{pageLabel}</Text>
      <View style={[styles.gifWrap, shapeStyle]}>
        <Image source={source} style={styles.gif} resizeMode="cover" />
      </View>
      <Text style={styles.title}>{APP_STRINGS.busyLine}</Text>
      <Text style={styles.body}>{BUSY_JOKES[jokeIndex]}</Text>
      <Text style={styles.meta}>
        {gif.name} • {asset.width}x{asset.height}px
      </Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '92%',
    alignSelf: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 18,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
    backgroundColor: 'rgba(20, 38, 52, 0.38)',
  },
  pageTag: {
    color: '#bde9ff',
    fontSize: 12,
    marginBottom: 12,
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  gifWrap: {
    overflow: 'hidden',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.28)',
    marginBottom: 14,
  },
  gif: {
    width: '100%',
    height: '100%',
  },
  title: {
    color: '#f4fdff',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  body: {
    color: '#d6ecf7',
    fontSize: 15,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 8,
  },
  meta: {
    color: '#b6d5e3',
    textAlign: 'center',
    fontSize: 12,
  },
});
