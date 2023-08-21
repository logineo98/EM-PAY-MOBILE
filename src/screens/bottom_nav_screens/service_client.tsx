import { Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { components } from '../../components'
import { colors, roboto } from '../../libs/typography/typography'

const ServiceClient = () => {

    const call = () => {
        let phoneNumber = ''

        if (Platform.OS === 'android') {
            phoneNumber = `tel:${73030732}`
        } else if (Platform.OS === 'ios') {
            phoneNumber = `telprompt:${73030732}`
        }

        Linking.openURL(phoneNumber)
    }

    return (
        <components.commons.screen_container title='Service client'>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
                <Text style={styles.info_message}>Veuillez cliquer sur le bouton 'CONTACTER' afin de contacter notre service client. </Text>

                <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={call}>
                    <Text style={styles.btn_name}>Contacter</Text>
                </TouchableOpacity>
            </ScrollView>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', },

    info_message: { color: colors.black, fontFamily: roboto.regular, textAlign: 'justify', marginBottom: 50, },

    btn: { backgroundColor: colors.fond1, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, },
    btn_name: { color: colors.white, fontFamily: roboto.black, textTransform: 'uppercase', },
})

export default ServiceClient