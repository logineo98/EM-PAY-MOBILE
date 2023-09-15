import { FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { components } from '../../components'
import { useSelector } from 'react-redux'
import { RootState } from '../../libs/services/store'

const Partenaire = () => {

    const { allPartners } = useSelector((state: RootState) => state?.partner)

    return (
        <components.commons.screen_container title='Partenaires'>
            <FlatList
                data={allPartners}
                renderItem={({ item }) => <components.cards.partenaire_card logo={item.logo} name={item.name} description={item.description} />}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
            />
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({})

export default Partenaire