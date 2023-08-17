import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { colors, roboto } from '../../../libs/typography/typography'

type COMPONENT_TYPE = { children: JSX.Element, style?: Object, title?: string }

const ScreenContainer: FC<COMPONENT_TYPE> = ({ children, style, title }) => (
    <View style={[styles.container_global, style]}>
        {title ?
            <View style={styles.container}>
                <Text style={styles.screen_title}> {title} </Text>

                {children}
            </View> :
            children
        }
    </View>)

const styles = StyleSheet.create({
    container_global: { flex: 1, padding: 10 },
    container: { flex: 1, },
    screen_title: { color: colors.black, fontFamily: roboto.black, fontSize: 25, textAlign: 'center', textTransform: 'uppercase', marginBottom: 10, },
})

export default ScreenContainer