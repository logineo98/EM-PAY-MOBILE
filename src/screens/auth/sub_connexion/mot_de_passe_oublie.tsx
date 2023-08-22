import { Image, Text, TextInput, View } from 'react-native'
import React, { FC } from 'react'
import { components } from '../../../components'
import { handleChangeMobile, images } from '../../../libs/constants/constants'
import Feather from 'react-native-vector-icons/Feather'
import { colors } from '../../../libs/typography/typography'
import { forgot_screen } from "../../../libs/i18n/fr.FR.json"
import { css } from '../../../libs/styles/styles'
import { useNavigation } from '@react-navigation/native'
import { userModel } from '../../../libs/services/user/user.model'
import PhoneInput from 'react-native-phone-number-input'

const goto = { verify_code: 'verify_code' }
type props = { index?: number, forgotInputs: userModel, setForgotInputs: any, error: { forgot_phone_error?: string }, setError: any }
const MotDePasseOublier: FC<props> = ({ index, forgotInputs, setForgotInputs, error, setError }) => {
    const navigation = useNavigation<any>()


    return (
        <components.commons.container style={css.auth.connexion.connexion_container}>
            <View style={css.auth.connexion.content}>
                <View style={css.auth.connexion.logobox}>
                    <Image source={images.logo_png} style={css.auth.connexion.logo} />
                </View>
                <View style={css.auth.connexion.textbox}>
                    <Text style={css.auth.connexion.title}>{forgot_screen.title}</Text>
                    <Text style={css.auth.connexion.description}>{forgot_screen.description}</Text>
                </View>

                <View style={css.auth.connexion.inputbox}>
                    <View>
                        <View style={[css.auth.connexion.inputfield]}>
                            <Feather name='smartphone' style={css.auth.connexion.inputicon} />
                            <PhoneInput
                                defaultValue={""}
                                defaultCode="ML"
                                layout="second"
                                value={forgotInputs.phone}
                                onChangeText={(text) => handleChangeMobile("phone", text, setForgotInputs)}
                                codeTextStyle={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                                countryPickerButtonStyle={{ height: "100%" }}
                                textInputStyle={{ padding: 0, color: colors.black }}
                                containerStyle={{ height: 50 }}
                                withDarkTheme
                            />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error?.forgot_phone_error}</Text>
                    </View>
                </View>
            </View>

        </components.commons.container>
    )
}

export default MotDePasseOublier





