import { FlatList, Image, ImageProps, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { images } from '../../libs/constants/constants'
import { colors, roboto, width } from '../../libs/typography/typography'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types'
import { components } from '../../components'

const Item = (item: { logo: ImageProps, name: string, description: string }) => (
    <View style={styles.partenaire_logo_container}>
        <Image source={item.logo} style={styles.partenaire_logo} />
    </View>
)

const Home: FC<{ navigation: StackNavigationHelpers, }> = ({ navigation }) => {

    const partenaires = [
        { id: '1', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '2', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '3', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '4', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '5', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '6', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '7', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '8', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '9', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '10', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
    ]

    return (
        <components.commons.screen_container>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <TouchableOpacity activeOpacity={0.5} style={styles.virtual_card_global_container}>
                    <View style={styles.virtual_card_container}>
                        <Image source={images.virtal_card} style={styles.virtual_card} />
                    </View>
                </TouchableOpacity>

                <View style={styles.solde_container}>
                    <Text style={styles.solde_name}>Mon solde : </Text>
                    <Text style={styles.solde_price}> 100 000 FCFA </Text>
                </View>

                <View style={styles.menu_home_container}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.menu_home} onPress={() => navigation.navigate('ika_wari_taa')}>
                        <View style={styles.menu_icon_container}>
                            <MaterialCommunityIcons name='bank-minus' color={'#000'} size={30} style={styles.menu_icon} />
                        </View>
                        <Text style={styles.menu_name}>Ika Wari Taa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.menu_home}>
                        <View style={styles.menu_icon_container}>
                            <FontAwesome5 name='file-invoice' color={'#000'} size={30} style={styles.menu_icon} onPress={() => navigation.navigate('facture')} />
                        </View>
                        <Text style={styles.menu_name}>Facture</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.5} style={styles.menu_home}>
                        <View style={styles.menu_icon_container}>
                            <MaterialCommunityIcons name='bank-plus' color={'#000'} size={30} style={styles.menu_icon} onPress={() => navigation.navigate('recharge')} />
                        </View>
                        <Text style={styles.menu_name}>Recharge</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.historique_container}>
                    <Text style={styles.historique_title}>Historique des dépenses</Text>

                    <View style={styles.historique_content_container}>
                        <View style={styles.historique_content}>
                            <Text style={styles.historique_name}>Ika Wari Taa</Text>
                            <View style={styles.historique_separator} />
                            <Text style={styles.historique_price}>2 000 FCFA</Text>
                        </View>

                        <View style={styles.historique_content}>
                            <Text style={styles.historique_name}>Facture</Text>
                            <View style={styles.historique_separator} />
                            <Text style={styles.historique_price}>2 000 FCFA</Text>
                        </View>

                        <View style={styles.historique_content}>
                            <Text style={styles.historique_name}>Recharge</Text>
                            <View style={styles.historique_separator} />
                            <Text style={styles.historique_price}>2 000 FCFA</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.partenaire_container}>
                    <FlatList
                        data={partenaires}
                        renderItem={({ item }) => <Item logo={item.logo} name={item.name} description={item.description} />}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    home_container: { flex: 1, padding: 10 },

    virtual_card_global_container: { alignItems: 'center' },
    virtual_card_container: { height: 200, width: width * 0.85, borderWidth: 1, borderColor: colors.fond1, borderRadius: 5, padding: 2 },
    virtual_card: { height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 5 },

    solde_container: { backgroundColor: colors.fond1, marginVertical: 20, flexDirection: 'row', justifyContent: 'center', borderRadius: 5, padding: 5 },
    solde_name: { color: colors.black, fontFamily: roboto.black },
    solde_price: { color: colors.black, fontFamily: roboto.black },

    menu_home_container: { flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around', marginBottom: 10 },
    menu_home: { alignItems: 'center' },
    menu_icon_container: { height: width * 0.17, width: width * 0.17, },
    menu_icon: { height: '100%', width: '100%', borderRadius: width * 0.17, borderWidth: 1, borderColor: colors.fond1, textAlign: 'center', verticalAlign: 'middle' },
    menu_name: { color: colors.black, fontFamily: roboto.regular, fontSize: 10 },

    historique_container: { marginTop: 10, marginBottom: 20, },
    historique_title: { color: colors.black, fontFamily: roboto.black, },
    historique_content_container: { marginVertical: 10 },
    historique_content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 },
    historique_name: { width: '30%', color: colors.black, fontFamily: roboto.regular, textAlign: 'right', },
    historique_separator: { height: 1, width: '35%', color: colors.black, borderWidth: 1, borderStyle: 'dashed' },
    historique_price: { width: '30%', color: colors.black, fontFamily: roboto.regular, },

    partenaire_container: { justifyContent: 'center', marginBottom: 10 },
    partenaire_logo_container: { alignItems: 'center', justifyContent: 'center', height: width * 0.17, width: width * 0.17, borderRadius: width * 0.17, marginRight: 2, borderWidth: 1, borderColor: colors.fond1, },
    partenaire_logo: { height: '100%', width: '100%', resizeMode: 'cover', borderRadius: width * 0.17 },


})

export default Home