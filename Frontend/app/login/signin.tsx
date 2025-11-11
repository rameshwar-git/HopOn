import { useNavigation } from "@react-navigation/native";

import { ThemedText } from "@/components/themed-text";


export default function SigninScreen() {
    const navigation = useNavigation();
    return (
        <ThemedText>Sign In Screen</ThemedText>
    );
}