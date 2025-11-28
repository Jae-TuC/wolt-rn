import { Stack } from 'expo-router'
import React from 'react'
import { StyleSheet } from 'react-native'

export default function _layout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, contentStyle: { backgroundColor: "white" } }} />
        </Stack>
    )
}

const styles = StyleSheet.create({})