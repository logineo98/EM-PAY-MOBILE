import { PermissionsAndroid, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { components } from '../../components'
import { colors, roboto } from '../../libs/typography/typography'
import { Switch } from 'react-native-elements'
import Geolocation from '@react-native-community/geolocation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../libs/services/store'
import { statusGeoMontantType } from '../../libs/services/user/user.model'
import { status_geo_montant_request } from '../../libs/services/user/user.request'
import { send_status_geo_montant } from '../../libs/services/user/user.action'

type COMPONENT_TYPE = {
    screenName: string,
}
const Status: FC<COMPONENT_TYPE> = ({ screenName }) => {

    const data: statusGeoMontantType = { id: '', la: '', lo: '', montant: '' }

    const [checked, setChecked] = useState(false)
    const [dataToSend, setDataToSend] = useState(data)
    const [err, setErr] = useState<{ montant: string }>()

    const { host, user_loading } = useSelector((state: RootState) => state?.user)
    const dispatch = useDispatch<any>()

    const handleSwitchBtn = (value: boolean) => {
        const { error, initialError } = status_geo_montant_request(dataToSend.montant)

        if (error.montant !== initialError.montant) {
            setErr(error)
            setChecked(false)
        } else {
            setErr(initialError)
            setChecked(value)

            if (value) dispatch(send_status_geo_montant(dataToSend))
            else {
                dispatch(send_status_geo_montant({ id: host?.id, la: '', lo: '', montant: '', disable: true }))
                setDataToSend({ ...dataToSend, montant: '' })
            }
        }
    }

    const get_initial_info_dataToSend = (la: string, lo: string) => {
        if (host?.montant && parseInt(host?.montant, 10) > 0 && host?.coordinates?.la && host?.coordinates?.lo) {
            setChecked(true)
            setDataToSend({ id: host?.id, montant: host?.montant, la, lo })
        } else setDataToSend({ id: host?.id, montant: '', la, lo })
    }

    useEffect(() => {
        (async () => {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    if (screenName === 'status') {
                        Geolocation.getCurrentPosition(info => {
                            if (host?.coordinates?.la !== info.coords.latitude.toString() || host?.coordinates?.lo !== info.coords.longitude.toString()) {
                                get_initial_info_dataToSend(info.coords.latitude.toString(), info.coords.longitude.toString())
                            } else {
                                get_initial_info_dataToSend(info.coords.latitude.toString(), info.coords.longitude.toString())
                            }
                        })
                    }
                }
            } catch (err) {
                console.warn(err)
            }
        })()
    }, [screenName])

    return (
        <components.commons.screen_container title='Statuts'>
            {user_loading ? <components.commons.loading title='Veuillez patienter pendant le chargement des données.' /> :
                <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
                    <View style={styles.visibility_container}>
                        <Text style={styles.visibility_name}>STATUT</Text>
                        <Switch value={checked} onValueChange={(value) => handleSwitchBtn(value)} trackColor={{ false: '#767577', true: '#767577' }} thumbColor={checked ? colors.fond1 : '#f4f3f4'} />
                    </View>

                    <View style={styles.amount_error_container}>
                        <View style={styles.amount_container}>
                            <Text style={styles.amount_name}>Montant disponible</Text>
                            <TextInput style={[styles.amount_price, { backgroundColor: checked ? colors.divider : 'transparent' }]} keyboardType='numeric' editable={!checked} value={dataToSend?.montant} onChangeText={text => setDataToSend({ ...dataToSend, montant: text })} />
                        </View>
                        {err?.montant && <Text style={styles.error}> {err?.montant} </Text>}
                    </View>

                    <Text style={styles.description_status}>
                        En activant votre statut vous émettez le souhait d'un retrait d'argent du
                        montant inscrit dans le champs ci-dessus.
                    </Text>
                </ScrollView>
            }
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    visibility_container: { marginVertical: 10, flexDirection: 'row', alignItems: 'center', },
    visibility_name: { width: '50%', color: colors.black, fontFamily: roboto.black, },

    amount_error_container: { marginVertical: 50, },
    amount_container: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    amount_name: { width: '50%', color: colors.black, fontFamily: roboto.black, },
    amount_price: { height: 40, width: '50%', color: colors.black, fontFamily: roboto.black, borderWidth: 1, padding: 10, borderRadius: 5, },
    error: { color: colors.fond1, fontFamily: roboto.italic, fontSize: 10, textAlign: 'right' },

    description_status: { color: colors.black, fontFamily: roboto.black, marginTop: 20, textAlign: 'justify', },
})

export default Status