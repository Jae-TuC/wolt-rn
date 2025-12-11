import { Stack } from 'expo-router'

const Layout = () => {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
            <Stack.Screen name="index" options={{ title: "Restaurants", headerShown: false }} />
        </Stack>
    )
}

export default Layout