import { Fonts } from '@/constants/theme'
import { StyleSheet, Text, View } from 'react-native'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { CategoryList } from '../CategoryList'
import RestaurantHeader from '../RestaurantHeader'
import RestuarantList from '../RestuarantList'

const RestuarantListPage = () => {
    const insets = useSafeAreaInsets()
    const scrollOffset = useSharedValue(0)

    const scrollHander = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollOffset.value = event.contentOffset.y
        }
    })

    return (
        <View style={styles.container}>
            <RestaurantHeader title="Restaurant" scrollOffset={scrollOffset} />
            <Animated.ScrollView
                onScroll={scrollHander}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingTop: insets.top + 60 }}
            >
                <Text style={styles.pageTitle}>Restuarant</Text>
                <CategoryList />

                <Text style={styles.allRestuarantsTitle}>All Restuarants</Text>
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

export default RestuarantListPage