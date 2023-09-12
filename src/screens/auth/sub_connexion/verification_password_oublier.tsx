import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { components } from '../../../components'
import { images } from '../../../libs/constants/constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors, height, roboto } from '../../../libs/typography/typography'
import { verify_screen } from "../../../libs/i18n/fr.FR.json"
import { css } from '../../../libs/styles/styles'
import LinearGradient from 'react-native-linear-gradient'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { useNavigation } from '@react-navigation/native'
import { userModel } from '../../../libs/services/user/user.model'

const goto = { reset_password: 'reset_password' }
type props = { index?: number, verifyInputs: string, setVerifyInputs: any, error: { verify_phone_error?: string }, debugCode: string, setDebugcode: any }


const VerificationPasswordOublier: FC<props> = ({ index, verifyInputs, setVerifyInputs, error, debugCode, setDebugcode }) => {

    const CELL_COUNT = 5;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });


    useEffect(() => { setVerifyInputs(value) }, [value]);


    return (
        <components.commons.container style={css.auth.connexion.connexion_container}>
            <View style={css.auth.connexion.content}>
                <View style={css.auth.connexion.logobox}>
                    <Image source={images.logo_png} style={css.auth.connexion.logo} />
                </View>
                <View style={css.auth.connexion.textbox}>
                    <Text style={css.auth.connexion.title}>{verify_screen.title}</Text>
                    <Text style={css.auth.connexion.description}>{verify_screen.description}</Text>
                </View>

                <View style={css.auth.connexion.inputbox}>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={value}
                        onChangeText={setValue}
                        cellCount={CELL_COUNT}
                        rootStyle={{}}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        renderCell={({ index, symbol, isFocused }) => (
                            <Text
                                key={index}
                                style={[css.auth.connexion.verifycell, isFocused && css.auth.connexion.verifyfocusCell]}
                                onLayout={getCellOnLayoutHandler(index)}>
                                {symbol || (isFocused ? <Cursor /> : null)}
                            </Text>
                        )}
                    />
                </View>
                <View>
                    <Text style={css.auth.connexion.errortext}>{error?.verify_phone_error}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: colors.black, fontFamily: roboto.light }}>{verify_screen.no_code} </Text><TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: colors.fond1 }}>{verify_screen.retry}</Text></TouchableOpacity></View>

                {debugCode && <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "brown", padding: 5 }}>
                    <Text style={{ color: "wheat" }}>Debug code: <Text style={{ color: "white" }}>{debugCode}</Text></Text>
                </View>}

            </View>
        </components.commons.container>
    )
}

export default VerificationPasswordOublier


