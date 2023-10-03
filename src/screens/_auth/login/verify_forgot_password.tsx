import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation, useRoute } from '@react-navigation/native'
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
import { checking, forgot_password, forgot_verify, login, resent_code } from '../../../libs/services/user/user.action'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { verify_screen } from "../../../libs/i18n/fr.FR.json"


const VerifyForgotPassword: FC<any> = () => {
    let scale = useSharedValue(1);
    const route = useRoute<any>()
    const routes = route?.params
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const { width, height } = useWindowDimensions()
    const [error, setError] = useState("");
    const [click, setClick] = useState(false);
    const [indicatif, setIndicatif] = useState("+223");
    const [inputs, setInputs] = useState({ code: "" });

    const CELL_COUNT = 5;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue, });


    useEffect(() => { setInputs({ ...inputs, code: value }) }, [value]);


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
    useEffect(() => { if (user_tmp && user_data) { navigation.navigate("reset_password", { data: user_data }); dispatch({ type: "reset_user_tmp" }); dispatch({ type: "reset_user_data" }); setClick(false) } }, [user_tmp, user_data, dispatch]);



    //traitement of verify
    const handle_verify = () => {
        (inputs as any).id = routes?.data?.id;
        dispatch(forgot_verify(inputs, setError))
        setClick(true)
    }


    const handleReset = () => {
        dispatch(resent_code({ phone: routes?.data?.phone }, setError))
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
                                        style={[css.auth.connexion.verifycell, isFocused && css.auth.connexion.verifyfocusCell, { width: height * 0.09, height: height * 0.09 }]}
                                        onLayout={getCellOnLayoutHandler(index)}>
                                        {symbol || (isFocused ? <Cursor /> : null)}
                                    </Text>
                                )}
                            />

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 15 }}><Text style={{ color: colors.black, fontFamily: roboto.light }}>{verify_screen.no_code} </Text><TouchableOpacity onPress={handleReset} style={{ alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: colors.fond1 }}>{verify_screen.retry}</Text></TouchableOpacity></View>

                            {(user_data?.code || routes?.data?.code) && <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: "brown", padding: 5 }}>
                                <Text style={{ color: "wheat" }}>Debug code: <Text style={{ color: "white" }}>{user_data?.code || routes?.data?.code}</Text></Text>
                            </View>}
                        </View>
                    </View>
                    <Spacer />
                </View>
                <View style={styles.btnbox}>
                    <TouchableOpacity onPress={() => navigation.navigate("forgot")} activeOpacity={0.8}>
                        <LinearGradient style={styles.main_btn} colors={[colors.white, colors.black]}>
                            <AntDesign name='caretleft' style={styles.icon} />
                        </LinearGradient>
                    </TouchableOpacity>
                    <Animated.View style={animatedStyle}>
                        <TouchableOpacity onPress={handle_verify} activeOpacity={0.8}>
                            <LinearGradient style={styles.main_btn} colors={[colors.fond1, colors.fond2]}>
                                <AntDesign name='caretright' style={styles.icon} />
                            </LinearGradient>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </WrapperContent>
            {click && user_loading && <SecondaryLoader text={"Veuillez patienter! Verification du code de recuperation en cours.."} />}
        </Wrapper >
    )
}

export default VerifyForgotPassword

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

