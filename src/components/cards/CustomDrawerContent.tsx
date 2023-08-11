import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { images } from '../../libs/constants/constants'
import { colors, height, roboto, width } from '../../libs/typography/typography'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import FontAwesome from "react-native-vector-icons/FontAwesome"

const CustomDrawerContent: FC<{ navigation: DrawerNavigationHelpers }> = ({ navigation }) => {
    console.log(height, width * 0.30)

    return (
        <ScrollView style={styles.container}>
            <View style={styles.logo_container}>
                <Image source={images.logo_png} style={styles.logo} />
            </View>

            <TouchableOpacity style={{ ...styles.item_container, marginTop: 20 }}>
                <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                <Text style={styles.item_text}>Acceuil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item_container}>
                <FontAwesome name='home' style={styles.item_icon} size={25} color={colors.black} />
                <Text style={styles.item_text}>Statut</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, },

    logo_container: { alignItems: 'center' },
    logo: { height: width * 0.30, width: width * 0.30, resizeMode: 'contain', },

    item_container: { backgroundColor: 'red', marginVertical: 5, padding: 5, flexDirection: 'row', alignItems: 'center' },
    item_icon: { backgroundColor: 'red' },
    item_text: { color: colors.black, marginLeft: 10, fontSize: 20, fontFamily: roboto.regular },
})

export default CustomDrawerContent