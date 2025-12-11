import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

/**
 * Renders the app's navigation stack layout.
 *
 * The stack contains two screens:
 * - "index": header hidden and white background content style.
 * - "other-options": header hidden, empty title, header shadow hidden, presented as a form sheet with a single detent at 0.6 and a 16px corner radius.
 *
 * @returns A Stack navigator element containing the configured "index" and "other-options" screens.
 */
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