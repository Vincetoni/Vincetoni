import { Tabs } from 'expo-router';
import { RoundTabBar } from '../components/RoundTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: '#0d141b',
        },
      }}
      tabBar={(props) => <RoundTabBar {...props} />}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="focus" options={{ title: 'Focus' }} />
      <Tabs.Screen name="chill" options={{ title: 'Chill' }} />
      <Tabs.Screen name="lab" options={{ title: 'Lab' }} />
    </Tabs>
  );
}
