import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { FC } from 'react'
import { colors } from '../../libs/typography/typography'



const SecondaryLoader: FC<any> = ({ children, text, op }) => {
    const { width, height } = useWindowDimensions()


    return (
        <View style={{ position: "absolute", alignItems: "center", justifyContent: "center", zIndex: 10, width, height, backgroundColor: `rgba(0,0,0,${op || 0.9})`, }}>
            <ActivityIndicator size="large" color={colors.white} style={{ zIndex: 10 }} />
            {text && <Text style={{ color: colors.white, textAlign: "center", width: "90%" }}>{text}</Text>}
            {children}
        </View>
    )
}

export default SecondaryLoader

const styles = StyleSheet.create({})
