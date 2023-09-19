import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { colors, height, roboto, width } from '../../../libs/typography/typography'
import { Overlay } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { PARTNER_TYPE } from '../../../libs/services/partner/partner.model'
import { _end_point } from '../../../libs/services/endpoints'

type COMPONENT_TYPE = PARTNER_TYPE

const PartenaireCard: FC<COMPONENT_TYPE> = ({ logo, name, description }) => {

    const [visible, setVisible] = useState(false)
    const toggleOverlay = () => setVisible(!visible)

    return (
        <View style={styles.partenaire_container}>
            <TouchableOpacity activeOpacity={0.5} style={styles.partenaire} onPress={() => { setVisible(true) }}>
                <View style={styles.partenaire_logo_name}>
                    <View style={styles.partenaire_logo_container}>
                        <Image source={{ uri: `${_end_point.api_img}/${logo}` }} style={styles.partenaire_logo} />
                    </View>
                    <Text style={styles.partenaire_name} numberOfLines={1}> {name} </Text>
                </View>
                <Text style={styles.partenaire_description} numberOfLines={2}> {description} </Text>
            </TouchableOpacity>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.bottom_sheet_container} animationType='slide'>
                <View style={styles.bottom_sheet_header}>
                    <Text style={styles.detail}>Détails</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { setVisible(false) }} style={styles.close_container}>
                        <MaterialCommunityIcons name='close' color={colors.white} size={30} style={styles.close} />
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                <Text style={styles.bottom_sheet_content_name}> {name} </Text>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
                    <Text style={styles.bottom_sheet_content_description}> {description} </Text>
                </ScrollView>
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    partenaire_container: { marginBottom: 10 },
    partenaire: { backgroundColor: colors.white, padding: 10, borderWidth: 1, borderColor: colors.fond1, borderRadius: 10, },
    partenaire_logo_name: { flexDirection: 'row', alignItems: 'center', },
    partenaire_logo_container: { height: 60, width: 60, },
    partenaire_logo: { height: '100%', width: '100%', resizeMode: 'contain', borderRadius: 60 },
    partenaire_name: { color: colors.black, fontFamily: roboto.black, marginLeft: 10, textTransform: 'uppercase' },
    partenaire_description: { color: colors.black, fontFamily: roboto.regular, textAlign: 'justify', fontSize: 13 },

    bottom_sheet_container: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 15, width: width, height: height / 2, position: 'absolute', bottom: 0, },

    bottom_sheet_header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    detail: { color: colors.black, fontFamily: roboto.black, },
    close_container: { backgroundColor: colors.fond1, borderRadius: 30, },
    close: {},

    divider: { height: 2, backgroundColor: colors.divider, marginTop: 5, },

    bottom_sheet_content_name: { color: colors.black, fontFamily: roboto.black, marginVertical: 5, textTransform: 'uppercase', },
    bottom_sheet_content_description: { color: colors.black, fontFamily: roboto.regular, textAlign: 'justify', },
})

export default PartenaireCard