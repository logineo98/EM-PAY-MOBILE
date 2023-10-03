import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Toast from 'react-native-toast-message'

const ToastContainer = () => {
    return (
        <View style={{ zIndex: 100 }}><Toast /></View>
    )
}

export default ToastContainer

const styles = StyleSheet.create({})