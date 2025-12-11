import useUserStore from '@/hooks/use-userstore'
import React from 'react'
import { Button, Text, View } from 'react-native'

const Page = () => {
    const { setIsGuest } = useUserStore()
    return (
        <View>
            <Text>My Inside Page</Text>
            <Button title="Go login" onPress={() => setIsGuest(false)} />
        </View>
    )
}

export default Page 