import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { FC, useRef, useState } from 'react';
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
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns';
import { supprimerOccurrence } from '../../../libs/constants/utils';

type props = { index?: number, setIndicatif?: any, currentPage?: number, error?: { phone_error?: string, name_error?: string, firstname_error?: string, birth_error?: string }, inputs: userModel, setError?: any, setInputs: any }
const Infos: FC<props> = ({ index, currentPage, error, inputs, setInputs, setIndicatif }) => {
    const [modalVisible, setModalVisible] = useState(false)
    // const [date, setDate] = useState(new Date(new Date().getTime()))
    const [ind, setind] = useState('+223');
    const toggleModal = () => setModalVisible(!modalVisible)

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
                                value={inputs?.phone ? supprimerOccurrence(inputs?.phone, ind) : ''}
                                onChangeCountry={(text) => { setIndicatif(`+${text.callingCode[0]}`); setind(`+${text.callingCode[0]}`) }}
                                defaultCode="ML"
                                layout="second"
                                onChangeText={(text) => handleChangeMobile("phone", text, setInputs)}
                                codeTextStyle={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                                countryPickerButtonStyle={{ height: "100%" }}
                                textInputStyle={{ padding: 0, height: 45, color: colors.black }}
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
                        <TouchableWithoutFeedback onPress={toggleModal} style={[css.auth.connexion.input, { padding: 15, flex: 1, }]} >
                            <View style={[css.auth.connexion.inputfield, { padding: 13, justifyContent: "flex-start" }]}>
                                <MaterialCommunityIcons name='cake-layered' style={css.auth.connexion.inputicon} />
                                {/* <TextInput value={inputs.birthday} onChangeText={text => handleChangeMobile("birthday", text, setInputs)} placeholder={inscription_screen.infos.birth} style={css.auth.connexion.input} placeholderTextColor={colors.placeholder} /> */}

                                <Text><Text style={[]}>  {format((inputs as any).birthday, 'dd/MM/yyyy')}</Text></Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <Modal visible={modalVisible} animationType="slide" transparent={true} onRequestClose={toggleModal} style={{ alignItems: "center" }}>
                            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                                <View style={styles.modal}>
                                    <DatePicker
                                        date={(inputs as any).birthday}
                                        onDateChange={(_date) => setInputs({ ...inputs, birthday: _date })}
                                        mode="date"
                                        style={{ backgroundColor: "white" }}
                                    />
                                    <TouchableOpacity onPress={toggleModal} style={[styles.button, { width: "75%", }]}>
                                        <Text style={{ color: colors.white, letterSpacing: 1, fontSize: 14 }}>Selectionner</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        <Text style={css.auth.connexion.errortext}>{error?.birth_error}</Text>
                    </View>
                </View>
            </View>


        </components.commons.container>
    )
}

export default Infos

const styles = StyleSheet.create({
    button: { width: "100%", padding: 15, backgroundColor: colors.fond1, justifyContent: "center", alignItems: "center", marginVertical: 10 },
    modal: { alignItems: "center", justifyContent: "center", backgroundColor: ' rgba(0,0,0,0.1)', height: "100%", },
})