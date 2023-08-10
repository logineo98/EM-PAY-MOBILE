import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const CustomDrawerContent = () => {

    return (
        <ScrollView style={styles.container}>
            <Text>CustomDrawerContent</Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
})

export default CustomDrawerContent