import { Image, Text, TextInput, View } from 'react-native'
import React, { FC, useState } from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Entypo from "react-native-vector-icons/Entypo"
import { handleChangeMobile, images } from '../../../libs/constants/constants';
import { colors, } from '../../../libs/typography/typography';
import { inscription_screen } from '../../../libs/i18n/fr.FR.json'
import { components } from '../../../components';
import { css } from '../../../libs/styles/styles';
import { userModel } from '../../../libs/services/user/user.model';

type props = { index?: number, currentPage?: number, error?: { address_error?: string, email_error?: string }, inputs: userModel, setError?: any, setInputs?: any }
const Account: FC<props> = ({ index, currentPage, inputs, setInputs, error }) => {

    const [selectedValue, setSelectedValue] = useState(false);

    const options = [
        { label: inscription_screen.account.account_choice_radio.oui, value: inscription_screen.account.account_choice_radio.oui === 'oui' ? true : false },
        { label: inscription_screen.account.account_choice_radio.non, value: inscription_screen.account.account_choice_radio.non === 'non' ? false : true },
    ];

    return (
        <components.commons.container style={css.auth.connexion.connexion_container}>
            <View style={css.auth.connexion.content}>
                <View style={css.auth.connexion.logobox}>
                    <Image source={images.logo_png} style={css.auth.connexion.logo} />
                </View>
                <View style={css.auth.connexion.textbox}>
                    <Text style={css.auth.connexion.title}>{inscription_screen.account.title}</Text>
                    <Text style={css.auth.connexion.description}>{inscription_screen.account.description}</Text>
                </View>

                <View style={css.auth.connexion.inputbox}>
                    <View>
                        <View style={css.auth.connexion.inputfield}>
                            <Entypo name='address' style={css.auth.connexion.inputicon} />
                            <TextInput value={inputs.address} onChangeText={text => handleChangeMobile("address", text, setInputs)} placeholder={inscription_screen.account.address} style={css.auth.connexion.input} placeholderTextColor={colors.placeholder} />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error?.address_error}</Text>
                    </View>
                    <View>
                        <View style={css.auth.connexion.inputfield}>
                            <MaterialIcons name='email' style={css.auth.connexion.inputicon} />
                            <TextInput value={inputs.email} onChangeText={text => handleChangeMobile("email", text, setInputs)} placeholder={inscription_screen.account.email} style={css.auth.connexion.input} placeholderTextColor={colors.placeholder} />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error?.email_error}</Text>
                    </View>
                    <View>
                        <View style={css.auth.connexion.radio}>
                            <Text style={css.auth.connexion.accounttitle}>{inscription_screen.account.account_choice_radio.text}</Text>
                            <components.commons.radio
                                horizontal
                                options={options}
                                selectedValue={selectedValue}
                                onSelect={setSelectedValue}
                            />
                        </View>


                        <View style={[css.auth.connexion.inputfield, { opacity: !selectedValue ? 0 : 1, pointerEvents: !selectedValue ? 'none' : 'auto' }]}>
                            <FontAwesome name='credit-card-alt' style={css.auth.connexion.inputicon} />
                            <TextInput value={inputs.account} onChangeText={text => handleChangeMobile("account", text, setInputs)} placeholder={inscription_screen.account.account_count_field} style={css.auth.connexion.input} placeholderTextColor={colors.placeholder} />
                        </View>
                        <Text style={css.auth.connexion.errortext}></Text>
                    </View>
                </View>
            </View>


        </components.commons.container>
    )
}

export default Account

