import { Stack } from 'expo-router'

const Layout = () => {
    return (
        <Stack screenOptions={{ contentStyle: { backgroundColor: "#fff" } }}>
            <Stack.Screen name="index" options={{ title: "Restuarants", headerShown: false }} />
        </Stack>
    )
}

export default Layout