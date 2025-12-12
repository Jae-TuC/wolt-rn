import { Colors } from '@/constants/theme'
import { useRestaurants } from '@/hooks/useRestaurants'
import Ionicons from '@expo/vector-icons/Ionicons'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const RestuarantList = () => {
    const { data: restaurants, isLoading, error } = useRestaurants()

    if (isLoading) {
        return <View>
            <ActivityIndicator size={"large"} color={Colors.secondary} />
        </View>
    }

    if (error) {
        return <View style={{ padding: 16 }}>
            <Text style={{ color: Colors.muted }}>Failed to load restaurants. Please try again.</Text>
        </View>
    }

    return (
        <>
            {restaurants?.map((item) => (
                <View key={item.id}>
                    <TouchableOpacity style={styles.card}>
                        <Image source={item.image!} style={styles.image} />
                        <View style={styles.info} >
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
                        </View>

                        <View style={styles.metaData}>
                            <Ionicons name="bicycle-outline" size={16} color={"#666"} />
                            <Text style={styles.metadataText}>€{item.deliveryFee.toFixed(2)}</Text>
                            <Text style={styles.dot}>•</Text>
                            <Text style={styles.metadataText}>€€€€</Text>
                            <Text style={styles.dot}>•</Text>
                            <Ionicons name="happy-outline" size={16} color={Colors.muted} />
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 16,
        boxShadow: '0px 4px 2px rgba(0, 0, 0, 0.1)',
        borderRadius: 12,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.light,
        overflow: "hidden",
    },
    image: {
        width: '100%',
        height: 180
    },
    info: {
        padding: 12
    },
    name: {
        fontSize: 16,
        fontWeight: 600,
        marginBottom: 4
    },
    description: {
        fontSize: 14,
        color: "#666"
    },
    metaData: {
        borderTopColor: Colors.light,
        borderTopWidth: StyleSheet.hairlineWidth,
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        padding: 10
    },
    metadataText: {
        fontSize: 13,
        color: "#666"
    },
    dot: {
        fontSize: 13,
        color: "#999"
    }
})

export default RestuarantList