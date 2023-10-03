import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import PhoneInput from 'react-native-phone-number-input'
import { components } from '../../../components'
import { css } from '../../../libs/styles/styles'
import { allInputsFilled, handleChangeMobile, images } from '../../../libs/constants/constants'
import { supprimerOccurrence } from '../../../libs/constants/utils'
import { colors, roboto } from '../../../libs/typography/typography'
import { connexion_screen } from "../../../libs/i18n/fr.FR.json"
import { userModel } from '../../../libs/services/user/user.model'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../../components/commons/wrapper'
import WrapperContent from '../../../components/commons/wrapper_content'
import LinearGradient from 'react-native-linear-gradient'
import Spacer from '../../../components/commons/spacer'
import { RootState } from '../../../libs/services/store'
import Toast from 'react-native-toast-message'
import ToastContainer from '../../../components/commons/toast_container'
import SecondaryLoader from '../../../components/commons/secondary_loader'
import { checking, forgot_password, login } from '../../../libs/services/user/user.action'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'


const ForgotPassword: FC<any> = () => {
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const { width, height } = useWindowDimensions()
    const [error, setError] = useState("");
    const [click, setClick] = useState(false);
    const [indicatif, setIndicatif] = useState("+223");
    const [inputs, setInputs] = useState({ phone: "" });

    const { user_tmp, user_info, user_data, user_loading, user_errors } = useSelector((state: RootState) => state?.user)


    //alert for info
    useEffect(() => { if (user_info && user_info !== null) { Toast.show({ type: 'info', text1: 'Informations', text2: user_info, }); dispatch({ type: 'reset_user_info' }) }; }, [user_info, dispatch]);

    //alert for errors form this app
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error, dispatch]);

    //alert for errors from api
    useEffect(() => { if (user_errors && user_errors !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: user_errors, }); dispatch({ type: 'reset_user_errors' }) }; }, [user_errors, dispatch]);


    //animate login button
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //result of traitement
    useEffect(() => { if (user_tmp && user_data) { navigation.navigate("forgot_verify", { data: user_data }); dispatch({ type: "reset_user_tmp" }); dispatch({ type: "reset_user_data" }); setClick(false) } }, [user_tmp, user_data, dispatch]);


    //traitement of forgot
    const handle_forgot = () => {

        if (!inputs.phone.includes(indicatif))
            inputs.phone = indicatif + inputs.phone


        dispatch(forgot_password(inputs, setError))
        setClick(true)
    }


    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });

    return (
        <Wrapper>
            <ToastContainer />
            <WrapperContent scoll position={"center"}>
                <View style={styles.content}>
                    <Spacer />
                    <View >
                        <View style={styles.logobox}>
                            <View style={[{ width: height * 0.20, height: height * 0.20 }]}><Image source={images.logo_png} style={styles.logo_img} /></View>
                        </View>
                        <Spacer h={40} />
                        <View >
                            <Text style={styles.title}>{connexion_screen.title}</Text>
                            <Text style={styles.description}>{connexion_screen.description}</Text>
                        </View>

                        <Spacer h={40} />

                        <View style={styles.formulaire}>
                            <View style={[[styles.inputfield, { borderRadius: width * 0.015, paddingHorizontal: width * 0.015 }]]}>
                                <Feather name='smartphone' style={{ fontSize: width * 0.06, color: colors.auth_icon }} />
                                <PhoneInput
                                    defaultCode="ML"
                                    layout="second"
                                    value={inputs?.phone ? supprimerOccurrence(inputs?.phone, indicatif) : ''}
                                    onChangeCountry={(text) => { setIndicatif(`+${text.callingCode[0]}`); setIndicatif(`+${text.callingCode[0]}`) }}
                                    onChangeText={(text) => { handleChangeMobile("phone", text, setInputs); }}
                                    codeTextStyle={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                                    countryPickerButtonStyle={{ height: '100%' }}
                                    textInputStyle={{ padding: 0, height: 45, color: colors.black }}
                                    textContainerStyle={{ padding: 0 }}
                                    containerStyle={{ height: 50 }}
                                    withDarkTheme
                                    placeholder='Numero de téléphone'

                                />
                            </View>
                        </View>
                        <Spacer />
                    </View>


                    <View style={styles.btnbox}>
                        <TouchableOpacity onPress={() => navigation.navigate("login")} activeOpacity={0.8}>
                            <LinearGradient style={styles.main_btn} colors={[colors.white, colors.black]}>
                                <AntDesign name='caretleft' style={styles.icon} />
                            </LinearGradient>
                        </TouchableOpacity>
                        <Animated.View style={animatedStyle}>
                            <TouchableOpacity onPress={handle_forgot} activeOpacity={0.8}>
                                <LinearGradient style={styles.main_btn} colors={[colors.fond1, colors.fond2]}>
                                    <AntDesign name='caretright' style={styles.icon} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </WrapperContent>
            {click && user_loading && <SecondaryLoader text={"Veuillez patienter! Verification du numéro de téléphone en cours"} />}
        </Wrapper>
    )
}

export default ForgotPassword

const styles = StyleSheet.create({
    content: { flex: 1, justifyContent: "space-between", width: "100%", height: "100%" },
    logobox: { alignItems: "center", justifyContent: "center" },
    logo_img: { width: "100%", height: "100%" },
    title: { color: colors.black, fontSize: 24, fontFamily: roboto.bold },
    description: { color: colors.black, fontFamily: roboto.regular, fontSize: 13 },
    formulaire: { gap: 10 },
    btnbox: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    main_btn: { height: 50, width: 50, alignItems: "center", justifyContent: "center", borderRadius: 50 },
    icon: { fontSize: 24, color: colors.white },
    inputfield: { width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.8, borderColor: colors.line, },
    input: { flex: 1, color: colors.black },
    register_btn: { padding: 15, backgroundColor: colors.black, width: "60%", alignSelf: "center", borderRadius: 5 },
    register_btn_text: { color: colors.white, fontFamily: roboto.regular, textAlign: "center", fontSize: 16 },
    forgot_link: { alignItems: "center", marginVertical: 15 },
    forgot_link_text: { color: colors.line },
})
