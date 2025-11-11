import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Fonts  } from '@/constants/theme';
export default function HomeScreen() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
             <ThemedText>Hello World</ThemedText>
            </SafeAreaView>
        </SafeAreaProvider>
    
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  }
});
