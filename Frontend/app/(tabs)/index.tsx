import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import '../login/signin';
import { Fonts  } from '@/constants/theme';
import SigninScreen from '../login/signin';
export default function HomeScreen() {
  
    return (
        <SafeAreaProvider>
          <ScrollView >
            <SafeAreaView >
              <SigninScreen/>
            </SafeAreaView>
            </ScrollView>
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
