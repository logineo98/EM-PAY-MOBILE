import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { components } from '../../components'
import { images } from '../../libs/constants/constants'
import { colors, roboto } from '../../libs/typography/typography'

const Partenaire = () => {

    const partenaires = [
        { id: '1', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '2', logo: images.logo_png, name: 'Logineo', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '3', logo: images.logo_png, name: 'UMMTO', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '4', logo: images.logo_png, name: 'DJAZZER', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '5', logo: images.logo_png, name: 'FC BARCELONE', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '6', logo: images.logo_png, name: 'REAL', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '7', logo: images.logo_png, name: 'BETIS', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '8', logo: images.logo_png, name: 'OK', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '9', logo: images.logo_png, name: 'TZ NATION', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '10', logo: images.virtal_card, name: 'YES', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
    ]

    return (
        <components.commons.screen_container title='Partenaires'>
            <FlatList
                data={partenaires}
                renderItem={({ item }) => <components.cards.partenaire_card logo={item.logo} name={item.name} description={item.description} />}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
            />
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({})

export default Partenaire