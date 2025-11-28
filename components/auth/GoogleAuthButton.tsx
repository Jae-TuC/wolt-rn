import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const GoogleAuthButton = () => {
    return (
        <TouchableOpacity style={styles.googleButton}>
            <Ionicons name="logo-google" size={18} color="white" />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    googleButton: {
        backgroundColor: "#4285f4",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 17,
        borderRadius: 12,
        gap: 4
    },
    googleButtonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "600"
    }
})

export default GoogleAuthButton