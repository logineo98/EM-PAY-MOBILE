import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { images } from '../../../libs/constants/constants'
import { colors, height, roboto, width } from '../../../libs/typography/typography'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const CustomDrawerContent: FC<{ navigation: DrawerNavigationHelpers }> = ({ navigation }) => {

    console.log(height, width / 2)

    return (
        <View style={styles.container}>
            <View style={styles.logo_container}>
                <Image source={images.logo_png} style={styles.logo} />
            </View>

            <View style={styles.item_global_container}>
                <ScrollView contentContainerStyle={{}}>
                    <TouchableOpacity style={{ ...styles.item_container, marginTop: 10 }} activeOpacity={0.5} onPress={() => navigation.navigate('home')}>
                        <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                        <Text style={styles.item_text}>Acceuil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item_container} activeOpacity={0.5}>
                        <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                        <Text style={styles.item_text}>Statut</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item_container} activeOpacity={0.5}>
                        <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                        <Text style={styles.item_text}>Tarifs</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item_container} activeOpacity={0.5}>
                        <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                        <Text style={styles.item_text}>Parrainages</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.item_container} activeOpacity={0.5}>
                        <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                        <Text style={styles.item_text}>A propos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ ...styles.item_container, marginBottom: 10 }} activeOpacity={0.5}>
                        <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                        <Text style={styles.item_text}>Service client</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <TouchableOpacity style={{ ...styles.item_container, ...styles.item_container_deconnexion }} activeOpacity={0.5}>
                <MaterialCommunityIcons name='logout' style={styles.item_icon} size={25} color={colors.black} />
                <Text style={styles.item_text}>Déconnexion</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, position: 'relative', },

    logo_container: { alignItems: 'center' },
    logo: { height: width * 0.30, width: width * 0.30, resizeMode: 'contain', },

    item_global_container: { height: height - (width * 0.30 + 60) },

    item_container: { marginVertical: 5, padding: 5, flexDirection: 'row', alignItems: 'center' },
    item_icon: {},
    item_text: { color: colors.black, marginLeft: 10, fontSize: 15, fontFamily: roboto.regular },

    item_container_deconnexion: { width: '100%', position: 'absolute', bottom: 0, left: 10, }
})

export default CustomDrawerContent