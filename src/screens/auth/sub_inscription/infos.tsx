import { Image, ScrollView, Text, TextInput, View } from 'react-native'
import React, { FC, useRef } from 'react';
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { handleChangeMobile, images } from '../../../libs/constants/constants';
import { colors } from '../../../libs/typography/typography';
import { inscription_screen } from '../../../libs/i18n/fr.FR.json'
import { components } from '../../../components';
import { css } from '../../../libs/styles/styles';
import Feather from 'react-native-vector-icons/Feather';
import { userModel } from '../../../libs/services/user/user.model';
import PhoneInput from "react-native-phone-number-input";

type props = { index?: number, currentPage?: number, error?: { phone_error?: string, name_error?: string, firstname_error?: string, birth_error?: string }, inputs: userModel, setError?: any, setInputs: any }
const Infos: FC<props> = ({ index, currentPage, error, inputs, setInputs }) => {




    return (

        <components.commons.container style={css.auth.connexion.connexion_container}>
            <View style={css.auth.connexion.content}>
                <View style={css.auth.connexion.logobox}>
                    <Image source={images.logo_png} style={css.auth.connexion.logo} />
                </View>
                <View style={css.auth.connexion.textbox}>
                    <Text style={css.auth.connexion.title}>{inscription_screen.infos.title}</Text>
                    <Text style={css.auth.connexion.description}>{inscription_screen.infos.description}</Text>
                </View>

                <View style={css.auth.connexion.inputbox}>
                    <View>
                        <View style={[css.auth.connexion.inputfield]}>
                            <Feather name='smartphone' style={css.auth.connexion.inputicon} />
                            <PhoneInput
                                defaultValue={""}
                                defaultCode="ML"
                                layout="second"
                                onChangeText={(text) => handleChangeMobile("phone", text, setInputs)}
                                codeTextStyle={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                                countryPickerButtonStyle={{ height: "100%" }}
                                textInputStyle={{ padding: 0, color: colors.black }}
                                containerStyle={{ height: 50 }}
                                withDarkTheme
                            />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error?.phone_error}</Text>
                    </View>
                    <View>
                        <View style={css.auth.connexion.inputfield}>
                            <AntDesign name='edit' style={css.auth.connexion.inputicon} />
                            <TextInput value={inputs.name} onChangeText={text => handleChangeMobile("name", text, setInputs)} placeholder={inscription_screen.infos.name} style={css.auth.connexion.input} placeholderTextColor={colors.placeholder} />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error?.name_error}</Text>
                    </View>
                    <View>
                        <View style={css.auth.connexion.inputfield}>
                            <AntDesign name='edit' style={css.auth.connexion.inputicon} />
                            <TextInput value={inputs.firstname} onChangeText={text => handleChangeMobile("firstname", text, setInputs)} placeholder={inscription_screen.infos.firstname} style={css.auth.connexion.input} placeholderTextColor={colors.placeholder} />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error?.firstname_error}</Text>
                    </View>
                    <View>
                        <View style={css.auth.connexion.inputfield}>
                            <MaterialCommunityIcons name='cake-layered' style={css.auth.connexion.inputicon} />
                            <TextInput value={inputs.birthday} onChangeText={text => handleChangeMobile("birthday", text, setInputs)} placeholder={inscription_screen.infos.birth} style={css.auth.connexion.input} placeholderTextColor={colors.placeholder} />
                        </View>
                        <Text style={css.auth.connexion.errortext}>{error?.birth_error}</Text>
                    </View>
                </View>
            </View>


        </components.commons.container>
    )
}

export default Infos

