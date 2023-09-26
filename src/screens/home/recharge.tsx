import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { components } from '../../components'
import { colors, height, roboto, width } from '../../libs/typography/typography'
import { Overlay } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { images } from '../../libs/constants/constants'
import { vitepay_data_validation } from '../../libs/services/user/user.request'
import { useDispatch } from 'react-redux'

const Recharge = () => {
    const data = { phone: '', montant: '' }

    const [visible, setVisible] = useState(false)
    const [vitepayData, setVitepayData] = useState(data)
    const [err, setErr] = useState<{ phone: string, montant: string }>()

    const dispatch = useDispatch<any>()

    const toggleOverlay = () => {
        setVisible(!visible)
        setVitepayData(data)
        setErr(data)
    }

    const handleSubmit = () => {
        const { error, initialError } = vitepay_data_validation(vitepayData)

        if (error.phone !== initialError.phone || error.montant !== initialError.montant) {
            setErr(error)
        } else {
            setErr(initialError)

            console.log(vitepayData)
        }
    }

    return (
        <components.commons.screen_container title='Recharges'>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
                <Text style={styles.info_message}>Veuillez cliquer sur le bouton 'RECHARGER' afin de recharger votre compte avec Vitepay.</Text>

                <TouchableOpacity activeOpacity={0.5} style={styles.btn} onPress={() => { setVisible(true) }}>
                    <Text style={styles.btn_name}>Recharger</Text>
                </TouchableOpacity>

                <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.bottom_sheet_container} animationType='slide'>
                    <View style={styles.vitepay_logo_close_container}>
                        <View style={styles.vitepay_logo_container}>
                            <Image source={images.vitepay} style={styles.vitepay_logo} />
                        </View>
                        <TouchableOpacity activeOpacity={0.5} style={styles.close_container} onPress={() => { setVisible(false); setVitepayData(data); setErr(data) }}>
                            <MaterialCommunityIcons name='close' color={colors.white} size={45} style={styles.close} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.divider} />

                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}} keyboardShouldPersistTaps='handled'>
                        <View style={styles.input_container}>
                            <Text style={styles.input_title}>Téléphone</Text>
                            <TextInput keyboardType='numeric' maxLength={8} style={styles.input} placeholderTextColor={'rgba(0,0,0,0.5)'} placeholder={'Numéro orange (sans l\'indicatif)'} value={vitepayData.phone} onChangeText={text => setVitepayData({ ...vitepayData, phone: text })} />
                            {err?.phone && <Text style={styles.input_error}> {err?.phone} </Text>}
                        </View>

                        <View style={styles.input_container}>
                            <Text style={styles.input_title}>Montant (FCFA)</Text>
                            <TextInput keyboardType='numeric' style={styles.input} placeholderTextColor={'rgba(0,0,0,0.5)'} placeholder={'Montant de la recharge'} value={vitepayData.montant} onChangeText={text => setVitepayData({ ...vitepayData, montant: text })} />
                            {err?.montant && <Text style={styles.input_error}> {err?.montant} </Text>}
                        </View>

                        <TouchableOpacity activeOpacity={0.5} style={[styles.btn, { marginBottom: 10, backgroundColor: colors.tz_blue, }]} onPress={handleSubmit}>
                            <Text style={styles.btn_name}>Recharger</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </Overlay>
            </ScrollView>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', },

    info_message: { color: colors.black, fontFamily: roboto.regular, textAlign: 'justify', marginBottom: 50, },

    btn: { backgroundColor: colors.fond1, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, },
    btn_name: { color: colors.white, fontFamily: roboto.black, textAlign: 'center', textTransform: 'uppercase', },

    bottom_sheet_container: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 15, width: width, height: height * 0.59, position: 'absolute', bottom: 0, },

    vitepay_logo_close_container: { position: 'relative', height: 60, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', },
    vitepay_logo_container: { height: width * 0.40, width: width * 0.40, },
    vitepay_logo: { height: '100%', width: '100%', resizeMode: 'cover', borderRadius: width * 0.35, position: 'absolute', left: (width / 2) - ((width * 0.40) / 1.5), bottom: (width * 0.35) / 1.5 },
    close_container: { backgroundColor: colors.fond1, borderRadius: 50, },
    close: {},

    vitepay_texte_container: { alignItems: 'center', marginVertical: 10, },
    vitepay_title: { fontSize: 22, color: colors.black, fontFamily: roboto.black, textTransform: 'uppercase' },
    vitepay_description: { color: colors.black, fontFamily: roboto.regular, },

    divider: { height: 2, backgroundColor: colors.divider, marginVertical: 10, },

    input_container: { padding: 5, borderRadius: 5, borderWidth: 1, marginBottom: 10, },
    input_title: { color: colors.black, fontFamily: roboto.black, },
    input: { height: 60, color: colors.black, fontFamily: roboto.regular, fontSize: 13, },
    input_error: { color: colors.fond1, fontFamily: roboto.italic, fontSize: 10, },
})

export default Recharge