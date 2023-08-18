import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { components } from '../../components'
import { colors, roboto } from '../../libs/typography/typography'
import QRCode from 'react-native-qrcode-svg'

const IkaWariTaa = () => {

    const [showQrCode, setShowQrCode] = useState(false)

    return (
        <components.commons.screen_container title='Ika Wari Taa'>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
                <View style={styles.retirer_amount_container}>
                    <Text style={styles.retirer_text}>Inscrire le montant à retirer</Text>
                    <TextInput style={styles.retirer_amount} keyboardType='numeric' />
                </View>

                <View style={styles.qr_code_container}>
                    <Text style={styles.qr_texte}>QR CODE</Text>
                    <View style={styles.qr_code}>
                        {showQrCode && <QRCode value='Tz Nation 13' size={150} />}

                    </View>
                </View>

                <Text style={styles.treatment_message}>Retrait de (MONTANT) est en cours de Traitement.</Text>

                <View style={styles.btn_qr_code_container}>
                    <TouchableOpacity style={styles.btn_qr_code} activeOpacity={0.5} onPress={() => setShowQrCode(prev => !prev)}>
                        <Text style={styles.btn_qr_code_text}> {!showQrCode ? 'Montrer QR Code' : 'Masquer QR Code'} </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btn_qr_code} activeOpacity={0.5}>
                        <Text style={styles.btn_qr_code_text}>Scanner QR Code</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    retirer_amount_container: { marginVertical: 10, },
    retirer_text: { color: colors.black, fontFamily: roboto.regular, },
    retirer_amount: { height: 40, color: colors.black, fontFamily: roboto.regular, borderWidth: 1, padding: 10, borderRadius: 5, },

    qr_code_container: { marginVertical: 30, },
    qr_texte: { color: colors.black, fontFamily: roboto.regular, textTransform: 'uppercase', },
    qr_code: { height: 200, borderWidth: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center', },

    treatment_message: { color: colors.black, fontFamily: roboto.regular, },

    btn_qr_code_container: { marginTop: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    btn_qr_code: { width: '48%', backgroundColor: colors.fond1, padding: 10, borderRadius: 5, },
    btn_qr_code_text: { color: colors.white, fontFamily: roboto.regular, textAlign: 'center', },

})

export default IkaWariTaa