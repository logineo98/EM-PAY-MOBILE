import { Image, ImageProps, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { colors, height, roboto, width } from '../../../libs/typography/typography'
import { Overlay } from 'react-native-elements'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

type COMPONENT_TYPE = { logo: ImageProps, name: string, description: string }

const PartenaireCard: FC<COMPONENT_TYPE> = ({ logo, name, description }) => {

    const [visible, setVisible] = useState(false)
    const toggleOverlay = () => setVisible(!visible)

    return (
        <View style={styles.partenaire_container}>
            <TouchableOpacity activeOpacity={0.5} style={styles.partenaire} onPress={() => { setVisible(true) }}>
                <View style={styles.partenaire_logo_name}>
                    <View style={styles.partenaire_logo_container}>
                        <Image source={logo} style={styles.partenaire_logo} />
                    </View>
                    <Text style={styles.partenaire_name} numberOfLines={1}> {name} </Text>
                </View>
                <Text style={styles.partenaire_description} numberOfLines={2}> {description} </Text>
            </TouchableOpacity>

            <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={styles.bottom_sheet_container} animationType='slide'>
                <View style={styles.bottom_sheet_header}>
                    <Text style={styles.detail}>Détails</Text>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => { setVisible(false) }}>
                        <MaterialCommunityIcons name='close' color={colors.black} size={30} style={styles.close} />
                    </TouchableOpacity>
                </View>

                <View style={styles.divider} />

                <ScrollView>
                    <Text style={styles.bottom_sheet_content_name}>  {name}  </Text>
                    <Text style={styles.bottom_sheet_content_description}>  {description}  </Text>
                </ScrollView>
            </Overlay>
        </View>
    )
}

const styles = StyleSheet.create({
    partenaire_container: { marginBottom: 10 },
    partenaire: { backgroundColor: colors.white, padding: 10, borderWidth: 1, borderColor: colors.fond1, borderRadius: 10 },
    partenaire_logo_name: { flexDirection: 'row', alignItems: 'center', },
    partenaire_logo_container: { height: width * 0.17, width: width * 0.17, },
    partenaire_logo: { height: '100%', width: '100%', resizeMode: 'cover', borderRadius: width * 0.17 },
    partenaire_name: { color: colors.black, fontFamily: roboto.black, marginLeft: 10, textTransform: 'uppercase' },
    partenaire_description: { color: colors.black, fontFamily: roboto.regular, textAlign: 'justify', },

    bottom_sheet_container: { borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 15, width: width, height: height / 2, position: 'absolute', bottom: 0, },

    bottom_sheet_header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    detail: { color: colors.black, fontFamily: roboto.black, },
    close: { color: colors.black, },

    divider: { height: 1, borderWidth: 1, borderColor: colors.divider, marginBottom: 10, },

    bottom_sheet_content_name: { color: colors.black, fontFamily: roboto.black, marginBottom: 10, textTransform: 'uppercase', },
    bottom_sheet_content_description: { color: colors.black, fontFamily: roboto.regular, textAlign: 'justify', },
})

export default PartenaireCard