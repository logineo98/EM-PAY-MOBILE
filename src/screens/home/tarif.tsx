import { FlatList, StyleSheet, Text, } from 'react-native'
import React from 'react'
import { components } from '../../components'
import { colors, roboto, } from '../../libs/typography/typography'
import { useSelector } from 'react-redux'
import { RootState } from '../../libs/services/store'

const Tarif = () => {

    const { loadingTarif, allTarifs } = useSelector((state: RootState) => state?.tarif)

    return (
        <components.commons.screen_container title='Tarifs'>
            <>
                <Text style={styles.tarif_presentation}>Présentation des frais globaux de la carte</Text>

                {loadingTarif ? <components.commons.loading title='Veuillez patienter pendant le chargement des données.' /> :
                    allTarifs?.length === 0 ? <components.commons.no_element message='Aucun tarif trouvé.' /> :
                        <FlatList
                            data={allTarifs}
                            renderItem={({ item }) => <components.cards.tarif_card tarif={item.tarif} description={item.description} />}
                            keyExtractor={item => item?.id as string}
                            showsVerticalScrollIndicator={false}
                        />
                }
            </>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    tarif_presentation: { color: colors.black, fontFamily: roboto.black, marginVertical: 10, fontSize: 13, textTransform: 'uppercase' },
})

export default Tarif