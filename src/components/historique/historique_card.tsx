import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { colors, roboto } from '../../libs/typography/typography'

type COMPONENT_TYPE = { price: number }

const HistoriqueCard: FC<COMPONENT_TYPE> = ({ price }) => {

    return (
        <View style={styles.historique_container}>
            <FontAwesome5 name='money-check' size={25} color={colors.black} style={styles.historique_icon} />
            <Text style={styles.historique_price}> {price} FCFA</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    historique_container: { backgroundColor: colors.white, padding: 10, borderRadius: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', },
    historique_icon: {},
    historique_price: { color: colors.black, fontFamily: roboto.regular, marginLeft: 10, },
})

export default HistoriqueCard
