import { Colors } from '@/constants/theme'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface RestaurantDetailsHeaderProps {
    scrollOffset: SharedValue<number>
}

const SCROLL_THRESHOLD_START = 50
const SCROLL_THRESHOLD_END = 80

const RestaurantDetailsHeader = ({ scrollOffset }: RestaurantDetailsHeaderProps) => {
    const router = useRouter();
    const insets = useSafeAreaInsets()

    const headerStyle = useAnimatedStyle(() => {
        const backgroundOpacity = interpolate(scrollOffset.value, [SCROLL_THRESHOLD_START, SCROLL_THRESHOLD_END], [0, 1], Extrapolation.CLAMP)
        const shadowOpacity = interpolate(scrollOffset.value, [SCROLL_THRESHOLD_START, SCROLL_THRESHOLD_END], [0, 0.1], Extrapolation.CLAMP)
        return {
            backgroundColor: `rgba(255, 255, 255, ${backgroundOpacity})`,
            shadowOpacity
        }
    })

    const searchBarStyle = useAnimatedStyle(() => {
        const backgroundOpacity = interpolate(
            scrollOffset.value,
            [0, SCROLL_THRESHOLD_START],
            [0.9, 1],
            Extrapolation.CLAMP
        )
        return {
            backgroundColor: `rgba(230, 230, 230, ${backgroundOpacity})`,
        }
    })

    const buttonStyle = useAnimatedStyle(() => {
        const opacity = interpolate(scrollOffset.value, [0, SCROLL_THRESHOLD_END], [1, 0], Extrapolation.CLAMP)
        return {
            opacity
        }
    })

    const buttonStyle2 = useAnimatedStyle(() => {
        const opacity = interpolate(scrollOffset.value, [SCROLL_THRESHOLD_START * 0.3, SCROLL_THRESHOLD_END], [0, 1], Extrapolation.CLAMP)
        return {
            opacity
        }
    })

    return (
        <Animated.View style={[styles.headerContainer, headerStyle, { paddingTop: insets.top }]}>
            <View style={[styles.headerContent]}>
                <TouchableOpacity style={[styles.backButton]} onPress={() => router.back()}>
                    <Ionicons name='chevron-back' size={25} />
                </TouchableOpacity>

                <Animated.View style={[styles.searchBar, searchBarStyle]}>
                    <Ionicons name='search' size={20} color={Colors.muted} />
                    <TextInput style={{ fontSize: 15 }} placeholder='Search' placeholderTextColor={Colors.muted} />
                </Animated.View>

                <View style={styles.spacer} />

                <Animated.View style={[styles.iconButton, buttonStyle]}>
                    <Ionicons name='heart-outline' size={24} />
                </Animated.View>
                <Animated.View style={[styles.iconButton, buttonStyle2]}>
                    <Ionicons name='ellipsis-horizontal' size={24} />
                </Animated.View>
            </View>
        </Animated.View>
    )
}

export default RestaurantDetailsHeader

const styles = StyleSheet.create({
    headerContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: '0px 4px 2px -2px rgba(0, 0, 0, 0.05)',
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8
    },
    backButton: {
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: Colors.light,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: '0px 4px 2px -2px rgba(0, 0, 0, 0.1)',
    },
    searchBar: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        flex: 1,
        gap: 8,
        borderRadius: 20,
        paddingHorizontal: 12,
        backgroundColor: Colors.primary,
        height: 40
    },
    iconButton: {
        position: "absolute",
        top: 12,
        right: 16,
        height: 40,
        width: 40,
        borderRadius: 20,
        backgroundColor: Colors.light,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        boxShadow: '0px 4px 2px -2px rgba(0, 0, 0, 0.1)',
    },
    spacer: {
        width: 40,
        height: 40
    }
})