import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { images } from '../../libs/constants/constants'
import { colors, roboto, width } from '../../libs/typography/typography'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types'
import { components } from '../../components'
import Entypo from 'react-native-vector-icons/Entypo'
import { useSelector } from 'react-redux'
import { RootState } from '../../libs/services/store'
import { PARTNER_TYPE } from '../../libs/services/partner/partner.model'
import { _end_point } from '../../libs/services/endpoints'

const Item = (item: PARTNER_TYPE) => (
    <View style={styles.partenaire_logo_container}>
        <Image source={{ uri: `${_end_point.api_img}/${item.logo}` }} style={styles.partenaire_logo} />
    </View>
)

type COMPONENT_TYPE = {
    navigation: StackNavigationHelpers,
    displayCard: boolean,
}

const Home: FC<COMPONENT_TYPE> = ({ navigation, displayCard }) => {

    const [displayCardVerso, setDisplayCardVerso] = useState(false)
    const [show, setShow] = useState(false)

    const { allPartners, loadingPartner } = useSelector((state: RootState) => state?.partner)

    return (
        <components.commons.screen_container style={{ paddingBottom: !show ? 50 : 100, }}>
            <>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.virtual_card_global_container} onPress={() => setDisplayCardVerso(prev => !prev)}>
                        {displayCard &&
                            <View style={styles.virtual_card_container}>
                                {!displayCardVerso ?
                                    <Image source={images.virtal_card} style={styles.virtual_card} /> :
                                    <Image source={images.passport} style={styles.virtual_card} />
                                }
                            </View>}
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

                    {loadingPartner ? <components.commons.loading /> :
                        <View style={styles.partenaire_container}>
                            {allPartners?.length === 0 ?
                                <components.commons.no_element message='Aucun partenaire trouvé.' /> :
                                <FlatList
                                    data={allPartners}
                                    renderItem={({ item }) => <Item logo={item.logo} name={item.name} description={item.description} />}
                                    keyExtractor={item => item.id as string}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                />
                            }
                        </View>
                    }
                </ScrollView>

                <View style={styles.bottom_tab_global_container}>
                    <TouchableOpacity activeOpacity={0.5} style={styles.plus_minus_icon_container} onPress={() => setShow(!show)}>
                        <Entypo name={!show ? 'plus' : 'minus'} size={25} color={colors.white} />
                    </TouchableOpacity>

                    {show &&
                        <View style={styles.bottom_tab_container}>
                            <TouchableOpacity activeOpacity={0.5} style={styles.bottom_tab} onPress={() => navigation.navigate('geolocalisation')}>
                                <MaterialCommunityIcons name='map-marker-radius-outline' size={25} color={colors.black} />
                                <Text style={styles.bottom_tab_name}>Carte géolocalisation</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.5} style={styles.bottom_tab} onPress={() => navigation.navigate('historique')}>
                                <MaterialCommunityIcons name='history' size={25} color={colors.black} />
                                <Text style={styles.bottom_tab_name}>Historique</Text>
                            </TouchableOpacity>

                            <TouchableOpacity activeOpacity={0.5} style={styles.bottom_tab} onPress={() => navigation.navigate('service_client')}>
                                <MaterialCommunityIcons name='phone-outgoing' size={25} color={colors.black} />
                                <Text style={styles.bottom_tab_name}>Service client</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    home_container: { flex: 1, padding: 10, },

    virtual_card_global_container: { alignItems: 'center' },
    virtual_card_container: { height: 200, width: width * 0.85, borderWidth: 1, borderColor: colors.fond1, borderRadius: 5, padding: 2 },
    virtual_card: { height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 5 },

    solde_container: { backgroundColor: colors.fond1, marginVertical: 20, flexDirection: 'row', justifyContent: 'center', borderRadius: 5, padding: 5 },
    solde_name: { color: colors.black, fontFamily: roboto.black },
    solde_price: { color: colors.black, fontFamily: roboto.black },

    menu_home_container: { flexDirection: 'row', alignContent: 'center', justifyContent: 'space-around', marginBottom: 10 },
    menu_home: { alignItems: 'center' },
    menu_icon_container: { height: 60, width: 60, },
    menu_icon: { height: '100%', width: '100%', borderRadius: 60, borderWidth: 1, borderColor: colors.fond1, textAlign: 'center', verticalAlign: 'middle' },
    menu_name: { color: colors.black, fontFamily: roboto.regular, fontSize: 10 },

    historique_container: { marginTop: 10, marginBottom: 20, },
    historique_title: { color: colors.black, fontFamily: roboto.black, },
    historique_content_container: { marginVertical: 10 },
    historique_content: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 5 },
    historique_name: { width: '30%', color: colors.black, fontFamily: roboto.regular, textAlign: 'right', },
    historique_separator: { height: 1, width: '35%', color: colors.black, borderWidth: 1, borderStyle: 'dashed' },
    historique_price: { width: '30%', color: colors.black, fontFamily: roboto.regular, },

    partenaire_container: { justifyContent: 'center', alignItems: 'center', marginBottom: 10, },
    partenaire_logo_container: { alignItems: 'center', justifyContent: 'center', height: 60, width: 60, borderRadius: 60, marginRight: 10, borderWidth: 1, borderColor: colors.fond1, },
    partenaire_logo: { height: '100%', width: '100%', resizeMode: 'contain', borderRadius: 60 },

    bottom_tab_global_container: { width: width, paddingVertical: 5, position: 'absolute', bottom: 0, alignItems: 'center', justifyContent: 'center', },
    plus_minus_icon_container: { backgroundColor: colors.tz_blue, height: 40, width: 40, borderRadius: 40, alignItems: 'center', justifyContent: 'center', },
    bottom_tab_container: { backgroundColor: colors.white, width: '95%', flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 5, borderRadius: 10, },
    bottom_tab: { alignItems: 'center', justifyContent: 'center', },
    bottom_tab_name: { color: colors.black, fontSize: 8, fontFamily: roboto.regular },

})

export default Home