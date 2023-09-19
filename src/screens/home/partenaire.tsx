import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { components } from '../../components'
import { useSelector } from 'react-redux'
import { RootState } from '../../libs/services/store'

const Partenaire = () => {

    const { loadingPartner, allPartners } = useSelector((state: RootState) => state?.partner)

    return (
        <components.commons.screen_container title='Partenaires'>
            {loadingPartner ? <components.commons.loading title='Veuillez patienter pendant le chargement des données.' /> :
                allPartners?.length === 0 ? <components.commons.no_element message='Aucun partenaire trouvé.' /> :
                    <FlatList
                        data={allPartners}
                        renderItem={({ item }) => <components.cards.partenaire_card logo={item.logo} name={item.name} description={item.description} />}
                        keyExtractor={item => item?.id as string}
                        showsVerticalScrollIndicator={false}
                    />
            }
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({})

export default Partenaire