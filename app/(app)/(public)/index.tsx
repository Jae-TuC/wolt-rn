import AppleAuthButton from '@/components/auth/AppleAuthButton'
import GoogleAuthButton from '@/components/auth/GoogleAuthButton'
import { Fonts } from '@/constants/theme'
import React from 'react'
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

const index = () => {
    const openWebLink = () => {
        Linking.openURL("https://google.com")
    }
    return (
        <View style={styles.container}>
            <View style={styles.infiniteScrollContainer}></View>

            <View style={styles.contentContainer}>
                <Image source={require("@/assets/images/wolt-logo.png")} style={styles.brandLogo} />
                <Animated.Text entering={FadeInDown} style={styles.tagline}>
                    Almost everything delivered
                </Animated.Text>

                {/* Login Buttons */}
                <View style={styles.buttonContainer}>
                    <Animated.View entering={FadeInDown.delay(100)}>
                        <AppleAuthButton />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(200)}>
                        <GoogleAuthButton />
                    </Animated.View>
                    <Animated.View entering={FadeInDown.delay(300)}>
                        <TouchableOpacity style={styles.otherButton}>
                            <Text style={styles.otherButtonText}>Other Login</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                <Animated.View entering={FadeInDown.delay(400)} style={styles.privacyContainer}>
                    <Text style={styles.privacyText} onPress={openWebLink}>
                        By signing up, you agree to our <Text style={styles.privacyLink}>Terms of Service</Text> and <Text style={styles.privacyLink}>Privacy Policy</Text>
                    </Text>
                </Animated.View>
            </View>
        </View>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 30,
        paddingVertical: 20,
    },
    brandLogo: {
        width: "100%",
        height: 48,
        resizeMode: "contain",
        marginBottom: 20
    },
    tagline: {
        fontSize: 30,
        fontFamily: Fonts.brandBlack,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 36
    },
    infiniteScrollContainer: {
        flex: .8
    },
    buttonContainer: {
        gap: 10,
        width: "100%"
    },
    otherButton: {
        backgroundColor: "#f0f0f0",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 17,
        borderRadius: 12,
        gap: 4
    },
    otherButtonText: {
        color: "#666",
        fontSize: 18,
        fontWeight: "600"
    },
    privacyContainer: {
        marginTop: 10,
        paddingHorizontal: 20
    },
    privacyText: {
        fontSize: 12,
        color: "#999",
        lineHeight: 18,
        textAlign: 'center'
    },
    privacyLink: {
        color: "#4285f4",
        textDecorationLine: "underline"
    }
})
