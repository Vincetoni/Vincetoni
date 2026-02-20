import { StyleSheet, View } from 'react-native';

const COLS = 14;
const ROWS = 28;

export function PixelBackdrop() {
  const cells = [];
  for (let r = 0; r < ROWS; r += 1) {
    for (let c = 0; c < COLS; c += 1) {
      const light = (r + c) % 2 === 0;
      cells.push(
        <View
          key={`${r}-${c}`}
          style={[styles.cell, { backgroundColor: light ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.06)' }]}
        />
      );
    }
  }

  return <View pointerEvents="none" style={styles.grid}>{cells}</View>;
}

const styles = StyleSheet.create({
  grid: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    flexWrap: 'wrap',
    opacity: 0.45,
  },
  cell: {
    width: `${100 / COLS}%`,
    height: `${100 / ROWS}%`,
  },
});
