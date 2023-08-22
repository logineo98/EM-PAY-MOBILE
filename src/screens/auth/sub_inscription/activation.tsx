import { Image, Text, View } from 'react-native'
import React, { FC } from 'react';
import { images } from '../../../libs/constants/constants';
import { inscription_screen } from '../../../libs/i18n/fr.FR.json'
import { components } from '../../../components';
import { css } from '../../../libs/styles/styles';
import { userModel } from '../../../libs/services/user/user.model';

type props = { index?: number, error?: { phone_error?: string, name_error?: string, firstname_error?: string, birth_error?: string }, inputs: userModel, setError?: any, setInputs: any }
const Activation: FC<props> = ({ error, inputs, setInputs }) => {

    return (
        <components.commons.container style={css.auth.connexion.connexion_container}>
            <View style={css.auth.connexion.content}>
                <View style={css.auth.connexion.logobox}>
                    <Image source={images.logo_png} style={css.auth.connexion.logo} />
                </View>
                <View style={css.auth.connexion.textbox}>
                    <Text style={css.auth.connexion.title}>{inscription_screen.waiting.title}</Text>
                    <Text style={css.auth.connexion.description}>{inscription_screen.waiting.description}</Text>
                </View>
            </View>
        </components.commons.container>
    )
}

export default Activation




