import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { components } from '../../components'

const Partenaire = () => {

    return (
        <components.commons.screen_container>
            <Text>Partenaires</Text>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    container: { backgroundColor: 'red' }
})

export default Partenaire