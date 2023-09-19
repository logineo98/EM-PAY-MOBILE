import { Image, ImageProps, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { colors, roboto, width } from '../../../libs/typography/typography'

type COMPONENT_TYPE = { logo: ImageProps, name: string, }

const FactureCard: FC<COMPONENT_TYPE> = ({ logo, name }) => {

    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.facture_container}>
            <View style={styles.facture_logo_container}>
                <Image source={logo} style={styles.facture_logo} />
            </View>
            <Text style={styles.facture_name} numberOfLines={1}> {name} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    facture_container: { backgroundColor: colors.white, marginBottom: 10, flexDirection: 'row', alignItems: 'center', padding: 10, borderWidth: 1, borderColor: colors.fond1, borderRadius: 10 },
    facture_logo_container: { height: 60, width: 60, },
    facture_logo: { height: '100%', width: '100%', resizeMode: 'cover', },
    facture_name: { color: colors.black, fontFamily: roboto.black, marginLeft: 10, },
})

export default FactureCard