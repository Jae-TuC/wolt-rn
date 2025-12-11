import { ScrollView, StyleSheet, Text } from 'react-native'

const Profile = () => {
    return (
        <ScrollView contentInsetAdjustmentBehavior='automatic' style={styles.container}>
            <Text>Profiles</Text>
        </ScrollView>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})