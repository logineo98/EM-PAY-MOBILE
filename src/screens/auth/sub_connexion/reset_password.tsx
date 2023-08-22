import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef } from 'react';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { handleChangeMobile, images } from '../../../libs/constants/constants';
import { colors } from '../../../libs/typography/typography';
import { reset_screen } from '../../../libs/i18n/fr.FR.json'
import { components } from '../../../components';
import { css } from '../../../libs/styles/styles';
import { useNavigation } from '@react-navigation/native';
import { userModel } from '../../../libs/services/user/user.model';

const goto = { reset_password: 'reset_password' }
type props = { index?: number, resetInputs: userModel, setResetInputs: any, error: { reset_password_error?: string, reset_confirm_error?: string } }


const ResetPassword: FC<props> = ({ index, resetInputs, setResetInputs, error }) => {
    const navigation = useNavigation<any>()

    return (
        <components.commons.container style={css.auth.connexion.connexion_container}>
            <View style={css.auth.connexion.content}>
                <View style={css.auth.connexion.logobox}>
                    <Image source={images.logo_png} style={css.auth.connexion.logo} />
                </View>
                <View style={css.auth.connexion.textbox}>
                    <Text style={css.auth.connexion.title}>{reset_screen.title}</Text>
                    <Text style={css.auth.connexion.description}>{reset_screen.description}</Text>
                </View>

                <View style={css.auth.connexion.inputbox}>
                    <View>
                        <View style={css.auth.connexion.inputfield}>
                            <MaterialIcons name='fingerprint' style={css.auth.connexion.inputicon} />
                            <TextInput value={resetInputs.password} onChangeText={text => handleChangeMobile("password", text, setResetInputs)} placeholder={reset_screen.password} style={css.auth.connexion.input} placeholderTextColor={colors.placeholder} />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error.reset_password_error}</Text>
                    </View>
                    <View>
                        <View style={css.auth.connexion.inputfield}>
                            <MaterialIcons name='fingerprint' style={css.auth.connexion.inputicon} />
                            <TextInput value={resetInputs.confirm} onChangeText={text => handleChangeMobile("confirm", text, setResetInputs)} placeholder={reset_screen.confirm} style={css.auth.connexion.input} placeholderTextColor={colors.placeholder} />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error.reset_confirm_error}</Text>
                    </View>
                </View>
            </View>

        </components.commons.container>
    )
}

export default ResetPassword



