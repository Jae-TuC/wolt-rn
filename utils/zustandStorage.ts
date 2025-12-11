// import { createMMKV } from "react-native-mmkv"
// import { StateStorage } from "zustand/middleware"

// const storage = createMMKV()

// const zustandStorage: StateStorage = {
//     setItem: (name, value) => { return storage.set(name, value) },
//     getItem: (name) => {
//         const value = storage.getString(name);
//         return value ?? null
//     },
//     removeItem: (name) => {
//         storage.remove(name)
//     }
// }

// export default zustandStorage

// utils/zustandStorage.ts
import * as SecureStore from 'expo-secure-store';

const zustandStorage = {
    setItem: async (name: string, value: string) => {
        try {
            await SecureStore.setItemAsync(name, value);
        } catch (error) {
            console.error('Error saving to SecureStore:', error);
        }
    },
    getItem: async (name: string) => {
        try {
            return await SecureStore.getItemAsync(name);
        } catch (error) {
            console.error('Error reading from SecureStore:', error);
            return null;
        }
    },
    removeItem: async (name: string) => {
        try {
            await SecureStore.deleteItemAsync(name);
        } catch (error) {
            console.error('Error removing from SecureStore:', error);
        }
    },
};

export default zustandStorage;
