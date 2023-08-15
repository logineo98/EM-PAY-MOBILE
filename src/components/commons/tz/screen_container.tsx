import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

type COMPONENT_TYPE = { children: JSX.Element, style: Object }

const ScreenContainer: FC<COMPONENT_TYPE> = ({ children, style }) => (
    <View style={[styles.container, style]}>
        {children}
    </View>)

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
})

export default ScreenContainer