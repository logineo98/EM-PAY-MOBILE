import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { components } from '../../../components'
import { handleChangeMobile, images } from '../../../libs/constants/constants'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { colors } from '../../../libs/typography/typography'
import { connexion_screen } from "../../../libs/i18n/fr.FR.json"
import { css } from '../../../libs/styles/styles'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { userModel } from '../../../libs/services/user/user.model'
import PhoneInput from 'react-native-phone-number-input'
import { supprimerOccurrence } from '../../../libs/constants/utils'

const goto = { register: 'register', forgot: 'forgot' }



type props = { index?: number, error?: { login_phone_error?: string, login_password_error?: string }, setError?: any, connexionInputs: userModel, setConnexionInputs: any, setIndicatif: any, next: any }
const Login: FC<props> = ({ index, connexionInputs, error, setError, setIndicatif, setConnexionInputs, next }) => {
    const navigation = useNavigation<any>()
    const [ind, setind] = useState('+223');



    return (
        <components.commons.container style={css.auth.connexion.connexion_container}>
            <View style={css.auth.connexion.content}>
                <View style={css.auth.connexion.logobox}>
                    <Image source={images.logo_png} style={css.auth.connexion.logo} />
                </View>
                <View style={css.auth.connexion.textbox}>
                    <Text style={css.auth.connexion.title}>{connexion_screen.title}</Text>
                    <Text style={css.auth.connexion.description}>{connexion_screen.description}</Text>
                </View>

                <View style={css.auth.connexion.inputbox}>
                    <View>
                        <View style={[css.auth.connexion.inputfield]}>
                            <Feather name='smartphone' style={css.auth.connexion.inputicon} />
                            <PhoneInput
                                defaultCode="ML"
                                layout="second"
                                value={connexionInputs?.phone ? supprimerOccurrence(connexionInputs?.phone, ind) : ''}
                                onChangeCountry={(text) => { setIndicatif(`+${text.callingCode[0]}`); setind(`+${text.callingCode[0]}`) }}
                                onChangeText={(text) => { handleChangeMobile("phone", text, setConnexionInputs); }}
                                codeTextStyle={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                                countryPickerButtonStyle={{ height: '100%' }}
                                textInputStyle={{ padding: 0, height: 45, color: colors.black }}
                                textContainerStyle={{ padding: 0 }}
                                containerStyle={{ height: 50 }}
                                withDarkTheme
                            />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error?.login_phone_error}</Text>
                    </View>

                    <View>
                        <View style={[css.auth.connexion.inputfield]}>
                            <MaterialIcons name='fingerprint' style={css.auth.connexion.inputicon} />
                            <TextInput value={connexionInputs.password} onChangeText={text => handleChangeMobile("password", text, setConnexionInputs)} placeholder={connexion_screen.password_field} placeholderTextColor={colors.placeholder} style={css.auth.connexion.input} />
                            <AntDesign name='eye' style={css.auth.connexion.inputicon} />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error?.login_password_error}</Text>
                    </View>
                </View>

                <View style={css.auth.connexion.linkbox}>

                    {/* faire vibrer ce button si les TextInputs contient des valeurs */}
                    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate(goto.register)} style={css.auth.connexion.registerbtn}><Text style={css.auth.connexion.registerbtn_txt}>S'inscrire</Text></TouchableOpacity>
                    <View>
                        <TouchableOpacity activeOpacity={0.8} onPress={next}><Text style={css.auth.connexion.forgot_txt}>Mot de passe oublié?</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
        </components.commons.container>
    )
}

export default Login

