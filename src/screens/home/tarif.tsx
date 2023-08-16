import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { components } from '../../components'
import { colors } from 'react-native-elements'
import { roboto } from '../../libs/typography/typography'

const Tarif = () => {

    return (
        <components.commons.screen_container title='Tarifs'>
            <></>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    screen_title: { color: colors.black, fontFamily: roboto.black, fontSize: 25, textAlign: 'center', marginBottom: 10, },
})

export default Tarif