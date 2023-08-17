import { FlatList, StyleSheet, Text, } from 'react-native'
import React from 'react'
import { components } from '../../components'
import { colors, roboto, } from '../../libs/typography/typography'

const Tarif = () => {

    const tarifs = [
        { id: '1', pourcentage: '0 FCFA', description: 'Sur les frais de rétrait.', },
        { id: '2', pourcentage: '1,5%', description: 'Sur le montant de la recharge.', },
        { id: '3', pourcentage: '2%', description: 'Sur le montant de la recharge VIA MOBILE MONEY (ORANGE MONEY, MOOV MONEY)', },
        { id: '4', pourcentage: '500 FCFA', description: 'Retrait dans tous les guichets GIM-UEMOA.', },
    ]

    return (
        <components.commons.screen_container title='Tarifs'>
            <>
                <Text style={styles.tarif_presentation}>Présentation des frais globaux de la carte</Text>

                <FlatList
                    data={tarifs}
                    renderItem={({ item }) => <components.cards.tarif_card pourcentage={item.pourcentage} description={item.description} />}
                    keyExtractor={item => item.id}
                    showsHorizontalScrollIndicator={false}
                />
            </>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    tarif_presentation: { color: colors.black, fontFamily: roboto.black, marginVertical: 10, fontSize: 13, textTransform: 'uppercase' },
})

export default Tarif