import { Alert, Image, Linking, Platform, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { images } from '../../../libs/constants/constants'
import { colors, height, roboto, width } from '../../../libs/typography/typography'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'

type COMPONENT_TYPE = { navigation: DrawerNavigationHelpers, screenName: string }

const CustomDrawerContent: FC<COMPONENT_TYPE> = ({ navigation, screenName }) => {

    const call = () => {
        let phoneNumber = ''

        if (Platform.OS === 'android') {
            phoneNumber = `tel:${73030732}`
        } else if (Platform.OS === 'ios') {
            phoneNumber = `telprompt:${73030732}`
        }

        Linking.openURL(phoneNumber)
    }

    const onShare = async () => {
        try {
            const result = await Share.share({ message: 'Veuillez, télécharger l\'application EM-PAY', })
        } catch (error: any) {
            Alert.alert('Message d\'erreur', error?.message, [{ text: 'OK' }])
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.close_global_container}>
                <TouchableOpacity style={styles.close_container} activeOpacity={0.5} onPress={() => { navigation.closeDrawer() }}>
                    <MaterialCommunityIcons name='close' color={colors.white} size={30} style={styles.close} />
                </TouchableOpacity>
            </View>

            <View style={styles.logo_container}>
                <Image source={images.logo_png} style={styles.logo} />
            </View>

            <View style={styles.item_global_container}>
                <ScrollView contentContainerStyle={{}}>
                    <TouchableOpacity style={[styles.item_container, { marginTop: 10, backgroundColor: (!screenName || screenName === 'home' || screenName === 'ika_wari_taa' || screenName === 'facture' || screenName === 'recharge') ? colors.tz_blue : colors.white, }]} activeOpacity={0.5} onPress={() => navigation.navigate('home')}>
                        <View style={styles.item_icon_name_container} >
                            <FontAwesome name='home' style={styles.item_icon} size={25} color={(!screenName || screenName === 'home' || screenName === 'ika_wari_taa' || screenName === 'facture' || screenName === 'recharge') ? colors.white : colors.black} />
                            <Text style={[styles.item_name, { color: (!screenName || screenName === 'home' || screenName === 'ika_wari_taa' || screenName === 'facture' || screenName === 'recharge') ? colors.white : colors.black, }]}>Acceuil</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={(!screenName || screenName === 'home' || screenName === 'ika_wari_taa' || screenName === 'facture' || screenName === 'recharge') ? colors.white : colors.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.item_container, { backgroundColor: screenName === 'status' ? colors.tz_blue : colors.white, }]} activeOpacity={0.5} onPress={() => navigation.navigate('status')}>
                        <View style={styles.item_icon_name_container} >
                            <MaterialCommunityIcons name='map-marker-radius' style={styles.item_icon} size={25} color={screenName === 'status' ? colors.white : colors.black} />
                            <Text style={[styles.item_name, { color: screenName === 'status' ? colors.white : colors.black, }]}>Statut</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={screenName === 'status' ? colors.white : colors.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.item_container, { backgroundColor: screenName === 'tarif' ? colors.tz_blue : colors.white, }]} activeOpacity={0.5} onPress={() => navigation.navigate('tarif')}>
                        <View style={styles.item_icon_name_container} >
                            <FontAwesome5 name='money-check-alt' style={styles.item_icon} size={25} color={screenName === 'tarif' ? colors.white : colors.black} />
                            <Text style={[styles.item_name, { color: screenName === 'tarif' ? colors.white : colors.black, }]}>Tarif</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={screenName === 'tarif' ? colors.white : colors.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.item_container, { backgroundColor: screenName === 'partenaire' ? colors.tz_blue : colors.white, }]} activeOpacity={0.5} onPress={() => navigation.navigate('partenaire')}>
                        <View style={styles.item_icon_name_container} >
                            <FontAwesome name='users' style={styles.item_icon} size={25} color={screenName === 'partenaire' ? colors.white : colors.black} />
                            <Text style={[styles.item_name, { color: screenName === 'partenaire' ? colors.white : colors.black, }]}>Partenaire</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={screenName === 'partenaire' ? colors.white : colors.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.item_container, { backgroundColor: screenName === 'a_propos' ? colors.tz_blue : colors.white, }]} activeOpacity={0.5} onPress={() => navigation.navigate('a_propos')}>
                        <View style={styles.item_icon_name_container} >
                            <FontAwesome name='info-circle' style={styles.item_icon} size={25} color={screenName === 'a_propos' ? colors.white : colors.black} />
                            <Text style={[styles.item_name, { color: screenName === 'a_propos' ? colors.white : colors.black, }]}>A propos</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={screenName === 'a_propos' ? colors.white : colors.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...styles.item_container, marginBottom: 10 }} activeOpacity={0.5} onPress={call}>
                        <View style={styles.item_icon_name_container} >
                            <AntDesign name='customerservice' style={styles.item_icon} size={25} color={colors.black} />
                            <Text style={styles.item_name}>Service client</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={colors.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item_container} activeOpacity={0.5} onPress={onShare}>
                        <View style={styles.item_icon_name_container} >
                            <FontAwesome name='users' style={styles.item_icon} size={25} color={colors.black} />
                            <Text style={styles.item_name}>Parrainage</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={colors.black} />
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <TouchableOpacity style={{ ...styles.item_container, ...styles.item_container_deconnexion }} activeOpacity={0.5}>
                <View style={styles.item_icon_name_container} >
                    <MaterialCommunityIcons name='logout' style={styles.item_icon} size={25} color={colors.black} />
                    <Text style={styles.item_name}>Déconnexion</Text>
                </View>
                <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={colors.black} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    close_global_container: { alignItems: 'flex-end', },
    close_container: { backgroundColor: colors.fond1, borderRadius: 30, },
    close: {},

    container: { flex: 1, padding: 10, },

    logo_container: { alignItems: 'center', },
    logo: { height: width * 0.30, width: width * 0.30, resizeMode: 'contain', },

    item_global_container: { height: height * 0.66 },

    item_container: { marginVertical: 5, padding: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 5, },
    item_icon_name_container: { flexDirection: 'row', alignItems: 'center', },
    item_icon: {},
    item_name: { color: colors.black, marginLeft: 10, fontSize: 15, fontFamily: roboto.regular },
    item_fleche: {},

    item_container_deconnexion: { width: '100%', position: 'absolute', bottom: 0, left: 10, }
})

export default CustomDrawerContent