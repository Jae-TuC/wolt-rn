import { Stack } from '@/components/Stack'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import Transition from "react-native-screen-transitions"


const Layout = () => {
    const router = useRouter()
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(modal)/map" options={{
                // headerShown: false,
                enableTransitions: true,
                ...Transition.Presets.DraggableCard()
            }} />
            <Stack.Screen name="(modal)/(restuarant)/[id]" options={{
                // headerShown: false,
                enableTransitions: true,
                ...Transition.Presets.DraggableCard()
            }} />
            <Stack.Screen name="(modal)/location" options={{
                presentation: "formSheet",
                sheetAllowedDetents: [0.7],
                title: "",
                headerShadowVisible: false,
                headerShown: false,
                sheetCornerRadius: 16,
                sheetGrabberVisible: true,
                headerRight: () => (
                    <TouchableOpacity style={{ padding: 4, borderRadius: 20 }} onPress={() => router.dismiss()}>
                        <Ionicons name='close-sharp' size={28} color='#666' />
                    </TouchableOpacity>
                ),
            }} />
            <Stack.Screen name="(modal)/filter" options={{
                presentation: "formSheet",
                sheetAllowedDetents: [0.8],
                title: "",
                headerShown: true,
                headerShadowVisible: false,
                sheetCornerRadius: 16,
                contentStyle: {
                    backgroundColor: "#fff",
                    overflow: "hidden",
                },
                sheetGrabberVisible: true,
                headerRight: () => (
                    <TouchableOpacity style={{ padding: 4, borderRadius: 20 }} onPress={() => router.dismiss()}>
                        <Ionicons name='close-sharp' size={28} color='#666' />
                    </TouchableOpacity>
                ),
            }} />
        </Stack>
    )
}

export default Layout