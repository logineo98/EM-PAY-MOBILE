import { Image, Text, TextInput, View } from 'react-native'
import React, { FC, useState } from 'react';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { handleChangeMobile, images } from '../../../libs/constants/constants';
import { colors } from '../../../libs/typography/typography';
import { inscription_screen } from '../../../libs/i18n/fr.FR.json'
import { components } from '../../../components';
import { css } from '../../../libs/styles/styles';
import { userModel } from '../../../libs/services/user/user.model';

type props = { index?: number, currentPage?: number, error?: { password_error?: string, confirm_error?: string, }, inputs: userModel, setError?: any, setInputs: any }
const Finalisation: FC<props> = ({ error, currentPage, inputs, setInputs }) => {

    return (
        <components.commons.container style={css.auth.connexion.connexion_container}>
            <View style={css.auth.connexion.content}>
                <View style={css.auth.connexion.logobox}>
                    <Image source={images.logo_png} style={css.auth.connexion.logo} />
                </View>
                <View style={css.auth.connexion.textbox}>
                    <Text style={css.auth.connexion.title}>{inscription_screen.identity.finalisation.title}</Text>
                    <Text style={css.auth.connexion.description}>{inscription_screen.identity.finalisation.description}</Text>
                </View>

                <View style={css.auth.connexion.inputbox}>
                    <View>
                        <View style={css.auth.connexion.inputfield}>
                            <MaterialIcons name='fingerprint' style={css.auth.connexion.inputicon} />
                            <TextInput placeholder={inscription_screen.identity.finalisation.password} value={inputs?.password} onChangeText={text => handleChangeMobile("password", text, setInputs)} style={css.auth.connexion.input} placeholderTextColor={colors.placeholder} />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error?.password_error}</Text>
                    </View>
                    <View>
                        <View style={css.auth.connexion.inputfield}>
                            <MaterialIcons name='fingerprint' style={css.auth.connexion.inputicon} />
                            <TextInput placeholder={inscription_screen.identity.finalisation.confirm} value={inputs?.confirm} onChangeText={text => handleChangeMobile("confirm", text, setInputs)} style={css.auth.connexion.input} placeholderTextColor={colors.placeholder} />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error?.confirm_error}</Text>
                    </View>
                </View>
            </View>


        </components.commons.container>
    )
}

export default Finalisation



