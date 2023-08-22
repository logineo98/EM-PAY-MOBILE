import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Container = ({ children, style }: any) => {
    return (
        <View style={[styles.container, style]}>
            {children}
        </View>
    )
}

export default Container

const styles = StyleSheet.create({
    container: {
        padding: 15,
    }
})