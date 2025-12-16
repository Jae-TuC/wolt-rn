import { Colors } from '@/constants/theme';
import { Restaurant } from '@/data/restaurants';
import { useRestaurantMarkers, useRestaurants } from '@/hooks/useRestaurants';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Define marker type
interface RestaurantMarker {
    id: string;
    latitude: number;
    longitude: number;
    name: string;
}

const Page = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const mapRef = useRef<MapView>(null);
    const [userLocation, setUserLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);

    const { data: restaurants, isLoading: restaurantsLoading } = useRestaurants();
    const { data: restaurantMarkers, isLoading: markersLoading } = useRestaurantMarkers();

    const locateMe = async () => {
        try {
            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            const newLocation = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };

            setUserLocation(newLocation);

            mapRef.current?.animateToRegion({
                ...newLocation,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }, 1000);

        } catch (error) {
            console.error('Failed to get location:', error);
        }
    };

    const locateStore = (restaurant: Restaurant) => {
        mapRef.current?.animateToRegion({
            latitude: restaurant.location.latitude,
            longitude: restaurant.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }, 100);
    }

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                console.log('Permission was not granted');
                return;
            }

            locateMe();
        }

        getCurrentLocation();
    }, []);

    if (restaurantsLoading || markersLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size={'large'} color={Colors.secondary} />
            </View>
        );
    }

    const markerSelected = (marker: RestaurantMarker) => {
        console.log('Marker selected:', marker);
        // router.push(`/(modal)/(restaurant)/${marker.id}`);
    };

    const initialRegion: Region = {
        latitude: 37.78825, // Default to San Francisco
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    return (
        <View style={styles.container}>
            <View style={[styles.header, { paddingTop: insets.top }]}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.dismiss()}>
                    <Ionicons name="chevron-back" size={22} color={Colors.muted} />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <Link href={'/(app)/(auth)/(modal)/filter'} asChild>
                        <TouchableOpacity style={styles.backButton}>
                            <Ionicons name="filter" size={22} />
                        </TouchableOpacity>
                    </Link>
                    <TouchableOpacity style={styles.backButton} onPress={locateMe}>
                        <Ionicons name="locate-outline" size={22} />
                    </TouchableOpacity>
                </View>
            </View>
            <MapView
                ref={mapRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                showsMyLocationButton={false}
                showsCompass={true}
                showsScale={true}
                zoomEnabled={true}
                zoomControlEnabled={true}
                scrollEnabled={true}
            >
                {/* User Location Marker (if we want a custom one) */}
                {userLocation && (
                    <Marker
                        coordinate={userLocation}
                        title="You are here"
                        pinColor={Colors.primary}
                    />
                )}

                {/* Restaurant Markers */}
                {restaurantMarkers?.map((marker: RestaurantMarker) => (
                    <Marker
                        key={marker.id}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude,
                        }}
                        title={marker.name}
                        onPress={() => markerSelected(marker)}
                        pinColor={Colors.secondary}
                    />
                ))}
            </MapView>
            <View style={styles.footerScroll}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}>
                    {restaurants?.map((restaurant) => (
                        <TouchableOpacity
                            key={restaurant.id}
                            style={styles.card}
                            onPress={() => {
                                locateStore(restaurant)
                                // router.push(`/(modal)/(restaurant)/${restaurant.id}`)
                            }}
                        >
                            <Image source={restaurant.image!} style={styles.cardImage} />
                            <View style={styles.cardContent}>
                                <View style={styles.cardHeader}>
                                    <Text style={styles.cardTitle} numberOfLines={1}>
                                        {restaurant.name}
                                    </Text>
                                    {restaurant.tags.includes('Wolt+') && (
                                        <View style={styles.woltBadge}>
                                            <Text style={styles.woltBadgeText}>W+</Text>
                                        </View>
                                    )}
                                </View>
                                <Text style={styles.cardDescription} numberOfLines={1}>
                                    {restaurant.description}
                                </Text>
                                <View style={styles.cardFooter}>
                                    <Ionicons name="bicycle-outline" size={14} color="#666" />
                                    <Text style={styles.cardFooterText}>
                                        {restaurant.deliveryFee === 0
                                            ? 'Free delivery'
                                            : `${restaurant.deliveryFee.toFixed(2)} €`}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locateButton: {
        position: 'absolute',
        right: 20,
        backgroundColor: Colors.primary,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    locateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 16,
        right: 16,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    backButton: {
        width: 40,
        height: 40,
        backgroundColor: Colors.background,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 4px 2px -2px rgba(0, 0, 0, 0.1)',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    footerScroll: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        paddingBottom: 20,
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 12,
        marginVertical: 16,
    },
    card: {
        width: 280,
        backgroundColor: '#fff',
        borderRadius: 16,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        flexDirection: 'row',
    },
    cardImage: {
        width: 60,
        height: 60,
        borderRadius: 12,
        margin: 10,
    },
    cardContent: {
        flex: 1,
        padding: 12,
        paddingLeft: 0,
        justifyContent: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 4,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#000',
        flex: 1,
    },
    woltBadge: {
        backgroundColor: '#009de0',
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    woltBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#fff',
    },
    cardDescription: {
        fontSize: 13,
        color: '#666',
        marginBottom: 6,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    cardFooterText: {
        fontSize: 12,
        color: '#666',
    },
});