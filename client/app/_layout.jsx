import React from 'react'
import { Stack } from 'expo-router'
// import Toast from 'react-native-toast-message';

const RootLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
            </Stack>
            {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
        </>

    )
}

export default RootLayout
