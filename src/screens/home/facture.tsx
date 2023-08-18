import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { components } from '../../components'
import { images } from '../../libs/constants/constants'

const Facture = () => {

    const factures = [
        { id: '1', logo: images.logo_png, name: 'Canal +', },
        { id: '2', logo: images.logo_png, name: 'Facture EDM', },
        { id: '3', logo: images.logo_png, name: 'ISAGO', },
        { id: '4', logo: images.logo_png, name: 'Somagep', },
        { id: '5', logo: images.logo_png, name: 'StarTimes', },
    ]

    return (
        <components.commons.screen_container title='Factures'>
            <FlatList
                data={factures}
                renderItem={({ item }) => <components.cards.facture_card logo={item.logo} name={item.name} />}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
            />
        </components.commons.screen_container>
    )
}

export default Facture

const styles = StyleSheet.create({})