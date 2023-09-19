import React, { FC } from 'react'
import { StyleSheet, Text } from 'react-native'
import { colors, roboto } from '../../libs/typography/typography'

type COMPONENT_TYPE = {
    message?: string
    size?: number
}

const NoElementFind: FC<COMPONENT_TYPE> = ({ message, size }) => {

    const styles = StyleSheet.create({
        message: { color: colors.black, fontFamily: roboto.black }
    })

    return <Text style={[styles.message]}> {message} </Text>
}

export default NoElementFind