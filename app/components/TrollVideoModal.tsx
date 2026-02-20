import { useMemo } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { Asset } from 'expo-asset';
import { WebView } from 'react-native-webview';
import { APP_STRINGS } from '../config/appContent';

type Props = {
  visible: boolean;
  onClose: () => void;
};

export function TrollVideoModal({ visible, onClose }: Props) {
  const uri = useMemo(
    () => Asset.fromModule(require('../../assets/Troll Song - JwHDify (360p, h264).mp4')).uri,
    []
  );

  const html = useMemo(
    () => `
      <html>
        <body style="margin:0;background:#000;display:flex;justify-content:center;align-items:center;">
          <video src="${uri}" autoplay controls loop playsinline style="width:100%;height:100%;object-fit:cover;"></video>
        </body>
      </html>
    `,
    [uri]
  );

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <BlurView intensity={62} tint="dark" style={styles.overlay}>
        <View style={styles.panel}>
          <Text style={styles.caption}>{APP_STRINGS.signInCaption}</Text>
          <WebView source={{ html }} mediaPlaybackRequiresUserAction={false} style={styles.video} />
          <Pressable style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>ok, close</Text>
          </Pressable>
        </View>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  panel: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.26)',
    backgroundColor: 'rgba(20, 38, 54, 0.74)',
    padding: 12,
  },
  caption: {
    color: '#f2fbff',
    textAlign: 'center',
    marginBottom: 12,
    fontSize: 16,
    fontWeight: '700',
  },
  video: {
    width: '100%',
    height: 230,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  button: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#6ac9eb',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#09212f',
  },
});
