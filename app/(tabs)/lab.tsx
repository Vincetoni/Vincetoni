import { StyleSheet, Text, View } from 'react-native';
import { PixelBackdrop } from '../components/PixelBackdrop';
import { RandomGifCard } from '../components/RandomGifCard';

export default function LabPage() {
  return (
    <View style={styles.screen}>
      <PixelBackdrop />
      <Text style={styles.heading}>Meme Lab</Text>
      <RandomGifCard pageLabel="lab tab" />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0d141b',
    paddingTop: 66,
    paddingBottom: 130,
  },
  heading: {
    color: '#effdff',
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
