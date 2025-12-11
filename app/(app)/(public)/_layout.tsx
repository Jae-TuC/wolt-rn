import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function _layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, contentStyle: { backgroundColor: "white" } }} />
            <Stack.Screen name="other-options" options={{
                headerShown: false, title: "", headerShadowVisible: false, presentation: "formSheet",
                sheetAllowedDetents: [0.6],
                sheetCornerRadius: 16,
            }} />
        </Stack>
    )
}

const styles = StyleSheet.create({})