import useUserStore from '@/hooks/use-userstore'
import { Stack } from 'expo-router'
import React from 'react'

const RootNav = () => {
    const { isGuest, user } = useUserStore()

    return (
        <Stack>
            {(isGuest || user) ? (
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            ) : null}
            {(!isGuest && !user) ? (
                <Stack.Screen name="(public)" options={{ headerShown: false }} />
            ) : null}
        </Stack>
    )
}

export default RootNav
