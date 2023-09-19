import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import { TARIF_TYPE } from '../../../libs/services/tarif/tarif.model'

type COMPONENT_TYPE = TARIF_TYPE

const TarifCard: FC<COMPONENT_TYPE> = ({ tarif, description }) => {

    return (
        <View style={styles.tarif_container}>
            <Text style={styles.tarif_pourcentage}> {tarif} </Text>
            <Text style={styles.tarif_description}> {description} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tarif_container: { backgroundColor: colors.white, padding: 10, marginBottom: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderRadius: 10, borderWidth: 1, borderColor: colors.fond1 },
    tarif_pourcentage: { width: '20%', color: colors.black, fontFamily: roboto.black, textAlign: 'center', },
    tarif_description: { width: '80%', color: colors.black, fontFamily: roboto.regular, textAlign: 'left', marginLeft: 5 },

})

export default TarifCard
