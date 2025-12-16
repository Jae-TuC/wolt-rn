import { CategoryList } from '@/components/CategoryList'
import RestaurantHeader from '@/components/RestaurantHeader'
import RestuarantList from '@/components/RestuarantList'
import { Fonts } from '@/constants/theme'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const Store = () => {
    const insets = useSafeAreaInsets()
    const scrollOffset = useSharedValue(0)

    const scrollHander = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollOffset.value = event.contentOffset.y
        }
    })

    return (
        <View style={styles.container}>
            <RestaurantHeader title="Stores" scrollOffset={scrollOffset} />
            <Animated.ScrollView
                onScroll={scrollHander}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: insets.top + 60 }}
            >
                <Text style={styles.pageTitle}>Stores</Text>
                <CategoryList />

                <Text style={styles.allRestuarantsTitle}>All Stores</Text>
                <RestuarantList />
            </Animated.ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    pageTitle: {
        fontFamily: Fonts.brandBlack,
        fontSize: 30,
        marginBottom: 16,
        padding: 16
    },
    allRestuarantsTitle: {
        fontFamily: Fonts.brandBold,
        fontSize: 20,
        marginBottom: 16,
        padding: 16
    }
})

export default Store