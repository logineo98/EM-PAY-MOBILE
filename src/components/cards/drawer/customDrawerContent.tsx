import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { images } from '../../../libs/constants/constants'
import { colors, height, roboto, width } from '../../../libs/typography/typography'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const CustomDrawerContent: FC<{ navigation: DrawerNavigationHelpers }> = ({ navigation }) => {

    return (
        <View style={styles.container}>
            <View style={styles.logo_container}>
                <Image source={images.logo_png} style={styles.logo} />
            </View>

            <View style={styles.item_global_container}>
                <ScrollView contentContainerStyle={{}}>
                    <TouchableOpacity style={{ ...styles.item_container, marginTop: 10 }} activeOpacity={0.5} onPress={() => navigation.navigate('home')}>
                        <View style={styles.item_icon_name_container} >
                            <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                            <Text style={styles.item_name}>Acceuil</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={colors.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item_container} activeOpacity={0.5} onPress={() => navigation.navigate('status')}>
                        <View style={styles.item_icon_name_container} >
                            <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                            <Text style={styles.item_name}>Statut</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={colors.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item_container} activeOpacity={0.5} onPress={() => navigation.navigate('tarif')}>
                        <View style={styles.item_icon_name_container} >
                            <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                            <Text style={styles.item_name}>Tarifs</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={colors.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item_container} activeOpacity={0.5} onPress={() => navigation.navigate('partenaire')}>
                        <View style={styles.item_icon_name_container} >
                            <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                            <Text style={styles.item_name}>Partenaires</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={colors.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item_container} activeOpacity={0.5} onPress={() => navigation.navigate('a_propos')}>
                        <View style={styles.item_icon_name_container} >
                            <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                            <Text style={styles.item_name}>A propos</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={colors.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item_container} activeOpacity={0.5}>
                        <View style={styles.item_icon_name_container} >
                            <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                            <Text style={styles.item_name}>Parrainages</Text>
                        </View>
                        <MaterialIcons name='arrow-right' style={styles.item_fleche} size={25} color={colors.black} />
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...styles.item_container, marginBottom: 10 }} activeOpacity={0.5}>
                        <View style={styles.item_icon_name_container} >
                            <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                            <Text style={styles.item_name}>Service client</Text>
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
    container: { flex: 1, padding: 10, position: 'relative', },

    logo_container: { alignItems: 'center' },
    logo: { height: width * 0.30, width: width * 0.30, resizeMode: 'contain', },

    item_global_container: { height: height - (width * 0.30 + 60) },

    item_container: { marginVertical: 5, padding: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    item_icon_name_container: { flexDirection: 'row', alignItems: 'center', },
    item_icon: {},
    item_name: { color: colors.black, marginLeft: 10, fontSize: 15, fontFamily: roboto.regular },
    item_fleche: {},

    item_container_deconnexion: { width: '100%', position: 'absolute', bottom: 0, left: 10, }
})

export default CustomDrawerContent