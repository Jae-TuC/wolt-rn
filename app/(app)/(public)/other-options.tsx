import AppleAuthButton from '@/components/auth/AppleAuthButton'
import GoogleAuthButton from '@/components/auth/GoogleAuthButton'
import { Colors, Fonts } from '@/constants/theme'
import useUserStore from '@/hooks/use-userstore'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

const OtherOption = () => {
    const router = useRouter()
    const { setIsGuest, isGuest } = useUserStore()

    const continueAsGuest = () => {
        setIsGuest(true)
    }

    console.log(isGuest)

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.closeButton} onPress={() => router.dismiss()}>
                <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Log in or create a Wolt account</Text>
            <View style={styles.buttonContainer}>
                <Animated.View entering={FadeInDown.delay(100)}>
                    <AppleAuthButton />
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(200)}>
                    <GoogleAuthButton />
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(300)}>
                    <TouchableOpacity style={styles.faceButton}>
                        <Ionicons name="logo-facebook" size={18} color="black" />
                        <Text style={styles.faceButtonText}>Continue with Facebook</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View entering={FadeInDown.delay(400)}>
                    <TouchableOpacity style={styles.otherButton} onPress={continueAsGuest}>
                        <Text style={styles.otherButtonText}>Continue as Guest</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 14
    },
    closeButton: {
        backgroundColor: Colors.light,
        padding: 8,
        borderRadius: 40,
        alignSelf: "flex-end"
    },
    title: {
        fontSize: 30,
        fontFamily: Fonts.brandBlack,
        marginVertical: 22
    },
    buttonContainer: {
        gap: 20,
        width: "100%"
    },
    faceButton: {
        backgroundColor: Colors.light,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 17,
        borderRadius: 12,
        gap: 4
    },
    faceButtonText: {
        color: Colors.dark,
        fontSize: 18,
        fontWeight: "600"
    },
    otherButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 17,
        borderRadius: 12,
        gap: 4
    },
    otherButtonText: {
        color: Colors.secondary,
        fontSize: 18,
        fontWeight: "600"
    },
})
export default OtherOption