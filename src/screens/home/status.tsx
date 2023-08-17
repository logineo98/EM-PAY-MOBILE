import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { components } from '../../components'
import { colors, roboto } from '../../libs/typography/typography'
import { Switch } from 'react-native-elements'

const Status = () => {

    const [checked, setChecked] = useState(false)

    return (
        <components.commons.screen_container title='Statuts'>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.visibility_container}>
                    <Text style={styles.visibility_name}>STATUT</Text>
                    <Switch value={checked} onValueChange={(value) => setChecked(value)} trackColor={{ false: '#767577', true: '#767577' }} thumbColor={checked ? colors.fond1 : '#f4f3f4'} />
                </View>

                <View style={styles.amount_container}>
                    <Text style={styles.amount_name}>Montant disponible</Text>
                    <TextInput style={[styles.amount_price, { backgroundColor: checked ? colors.divider : 'transparent' }]} keyboardType='numeric' editable={!checked} />
                </View>

                <Text style={styles.description_status}>
                    En activant votre statut vous émettez le souhait d’un retrait d’argent du
                    montant inscrit dans le champs ci-dessus.
                </Text>

            </ScrollView>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    visibility_container: { marginVertical: 10, flexDirection: 'row', alignItems: 'center', },
    visibility_name: { width: '50%', color: colors.black, fontFamily: roboto.black, },

    amount_container: { marginVertical: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    amount_name: { width: '50%', color: colors.black, fontFamily: roboto.black, },
    amount_price: { height: 40, width: '50%', color: colors.black, fontFamily: roboto.black, borderWidth: 1, padding: 10, borderRadius: 5, },

    description_status: { color: colors.black, fontFamily: roboto.black, marginTop: 20, textAlign: 'justify', },
})

export default Status