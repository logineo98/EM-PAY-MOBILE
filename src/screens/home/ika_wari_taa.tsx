import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { components } from '../../components'
import { colors, roboto } from '../../libs/typography/typography'
import QRCode from 'react-native-qrcode-svg'
import QRCodeScanner from 'react-native-qrcode-scanner'
import Toast from 'react-native-toast-message'
import { useDispatch, useSelector } from 'react-redux'
import { _scanQrCode, getQrCode } from '../../libs/services/user/user.action'
import { RootState } from '../../libs/services/store'

const IkaWariTaa = () => {

    const [showQrCode, setShowQrCode] = useState(false)
    const [scanQrCode, setScanQrCode] = useState(false)
    const [qrCodeData, setQrCodeData] = useState('')
    const [montant, setMontant] = useState('')

    const { host, qr_code, scan_response } = useSelector((state: RootState) => state?.user)
    const dispatch = useDispatch<any>()

    const handleShowQrCode = () => {
        if (host?.montant && host?.coordinates?.la && host?.coordinates?.lo) {
            setShowQrCode(true)
            setScanQrCode(false)
            dispatch(getQrCode(host?.id as string))
        } else {
            Toast.show({ type: 'info', text1: 'Informations', text2: 'Veuillez d\'abord activer votre statut et renseigner un montant.', })
        }
    }

    console.log('qrCodeData', qrCodeData)
    console.log('scan_response', scan_response)

    return (
        <>
            <View style={{ zIndex: 100 }}><Toast /></View>
            <components.commons.screen_container title='Ika Wari Taa'>
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
                    {scanQrCode &&
                        <View style={styles.retirer_amount_container}>
                            <Text style={styles.retirer_text}>Inscrire le montant à retirer</Text>
                            <TextInput style={styles.retirer_amount} keyboardType='numeric' onChangeText={text => setMontant(text)} />
                        </View>
                    }

                    <View style={styles.qr_code_container}>
                        <Text style={styles.qr_texte}>QR CODE</Text>
                        <View style={styles.qr_code}>
                            {(showQrCode && qr_code) && <QRCode value={qr_code} size={150} />}

                            {(scanQrCode && montant && montant.trim() !== '') ?
                                <QRCodeScanner
                                    // onRead={({ data }) => Alert.alert('Test', data)}
                                    onRead={({ data }) => dispatch(_scanQrCode({
                                        beneficiareID: host?.id as string,
                                        montantBeneficiaire: montant,
                                        titulaireID: data?.split('/')[0],
                                        titulairePhone: data?.split('/')[1]
                                    }))}
                                    reactivate={true}
                                    reactivateTimeout={1500}
                                    cameraType='back'
                                /> : scanQrCode && <Text style={styles.qr_texte}>Veuillez renseigner le montant</Text>
                            }

                            {(!scanQrCode && !showQrCode) && <Text style={styles.qr_texte}>Scanner ou afficher QR CODE</Text>}
                        </View>
                    </View>

                    <Text style={styles.treatment_message}>Retrait de (MONTANT) est en cours de Traitement.</Text>

                    <View style={styles.btn_qr_code_container}>
                        <TouchableOpacity style={styles.btn_qr_code} activeOpacity={0.5} onPress={handleShowQrCode}>
                            <Text style={styles.btn_qr_code_text}> Montrer QR Code </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.btn_qr_code} activeOpacity={0.5} onPress={() => { setShowQrCode(false); setScanQrCode(true); }}>
                            <Text style={styles.btn_qr_code_text}>Scanner QR Code</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </components.commons.screen_container>
        </>
    )
}

const styles = StyleSheet.create({
    retirer_amount_container: { marginVertical: 10, },
    retirer_text: { color: colors.black, fontFamily: roboto.regular, },
    retirer_amount: { height: 40, color: colors.black, fontFamily: roboto.regular, borderWidth: 1, padding: 10, borderRadius: 5, },

    qr_code_container: { marginVertical: 30, },
    qr_texte: { color: colors.black, fontFamily: roboto.regular, textTransform: 'uppercase', },
    qr_code: { height: 200, overflow: 'hidden', borderWidth: 1, borderRadius: 5, alignItems: 'center', justifyContent: 'center', },

    treatment_message: { color: colors.black, fontFamily: roboto.regular, },

    btn_qr_code_container: { marginTop: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    btn_qr_code: { width: '48%', backgroundColor: colors.fond1, padding: 10, borderRadius: 5, },
    btn_qr_code_text: { color: colors.white, fontFamily: roboto.regular, textAlign: 'center', },

})

export default IkaWariTaa