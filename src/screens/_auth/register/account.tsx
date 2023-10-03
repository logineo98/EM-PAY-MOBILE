import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import PhoneInput from 'react-native-phone-number-input'
import { components } from '../../../components'
import { allInputsFilled, handleChangeMobile, images } from '../../../libs/constants/constants'
import { supprimerOccurrence } from '../../../libs/constants/utils'
import { colors, roboto } from '../../../libs/typography/typography'
import { inscription_screen } from "../../../libs/i18n/fr.FR.json"
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
import { checking, login } from '../../../libs/services/user/user.action'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns'
import { inscription_inputs_request } from '../../../libs/services/user/user.request'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'


const Account: FC<any> = () => {
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const { width, height } = useWindowDimensions()
    const [modalVisible, setModalVisible] = useState(false)

    const [error, setError] = useState("");
    const [click, setClick] = useState(false);
    const [next, setNext] = useState(false);
    const initial: userModel = { address: "", email: "" }
    const [inputs, setInputs] = useState(initial);
    const [store, setStore] = useState<userModel>();
    const [selectedValue, setSelectedValue] = useState(false);

    const options = [
        { label: inscription_screen.account.account_choice_radio.oui, value: inscription_screen.account.account_choice_radio.oui === 'oui' ? true : false },
        { label: inscription_screen.account.account_choice_radio.non, value: inscription_screen.account.account_choice_radio.non === 'non' ? false : true },
    ];

    const { user_info, user_loading, user_errors } = useSelector((state: RootState) => state?.user)

    //alert for info
    useEffect(() => { if (user_info && user_info !== null) { Toast.show({ type: 'info', text1: 'Informations', text2: user_info, }); dispatch({ type: 'reset_user_info' }) }; }, [user_info, dispatch]);

    //alert for errors form this app
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error, dispatch]);

    //alert for errors from api
    useEffect(() => { if (user_errors && user_errors !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: user_errors, }); dispatch({ type: 'reset_user_errors' }) }; }, [user_errors, dispatch]);


    //animate login button
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //retrieve prev datas from localstorage
    useEffect(() => { AsyncStorage.getItem("inputs").then((res: any) => { const _inpt = JSON.parse(res); setStore({ ..._inpt }) }) }, []);

    //result of traitement
    useEffect(() => { if (next) { AsyncStorage.setItem("inputs", JSON.stringify(store)); AsyncStorage.setItem("account", JSON.stringify(inputs)); navigation.navigate("document"); setNext(false); setClick(false) } }, [next, store]);

    //traitement of login
    const handle_validate = () => {
        const validation: userModel = { address: inputs?.address, email: inputs?.email }
        if (inscription_inputs_request("account", validation, setError)) return;
        setStore({ ...store, ...inputs })

        setNext(true)
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
                            <Text style={styles.title}>{inscription_screen.infos.title}</Text>
                            <Text style={styles.description}>{inscription_screen.infos.description}</Text>
                        </View>

                        <Spacer h={40} />

                        <View style={styles.formulaire}>
                            <View>
                                <View style={[[styles.inputfield, { borderRadius: width * 0.015, paddingHorizontal: width * 0.015 }]]}>
                                    <Entypo name='address' style={{ fontSize: width * 0.06, color: colors.auth_icon }} />
                                    <TextInput value={inputs?.address} onChangeText={text => handleChangeMobile("address", text, setInputs)} placeholder={"Adresse"} placeholderTextColor={"gray"} style={[styles.input, { paddingHorizontal: width * 0.02 }]} />
                                </View>
                            </View>

                            <View>
                                <View style={[[styles.inputfield, { borderRadius: width * 0.015, paddingHorizontal: width * 0.015 }]]}>
                                    <MaterialIcons name='email' style={{ fontSize: width * 0.06, color: colors.auth_icon }} />
                                    <TextInput value={inputs?.email} onChangeText={text => handleChangeMobile("email", text, setInputs)} placeholder={"Email"} placeholderTextColor={"gray"} style={[styles.input, { paddingHorizontal: width * 0.02 }]} />
                                </View>
                            </View>

                            <View>
                                <View style={styles.radio}>
                                    <Text style={styles.accounttitle}>{inscription_screen.account.account_choice_radio.text}</Text>
                                    <components.commons.radio
                                        horizontal
                                        options={options}
                                        selectedValue={selectedValue}
                                        onSelect={setSelectedValue}
                                    />
                                </View>


                                <View style={[[styles.inputfield, { borderRadius: width * 0.015, paddingHorizontal: width * 0.015 }], { opacity: !selectedValue ? 0 : 1, pointerEvents: !selectedValue ? 'none' : 'auto' }]}>
                                    <FontAwesome name='credit-card-alt' style={{ fontSize: width * 0.06, color: colors.auth_icon }} />
                                    <TextInput value={inputs.account} onChangeText={text => handleChangeMobile("account", text, setInputs)} placeholder={inscription_screen.account.account_count_field} style={[styles.input, { paddingHorizontal: width * 0.02 }]} placeholderTextColor={colors.placeholder} />
                                </View>
                            </View>


                        </View>

                        <Spacer />

                    </View>


                    <View style={styles.btnbox}>
                        <TouchableOpacity onPress={() => navigation.navigate("register")} activeOpacity={0.8}>
                            <LinearGradient style={styles.main_btn} colors={[colors.white, colors.black]}>
                                <AntDesign name='caretleft' style={styles.icon} />
                            </LinearGradient>
                        </TouchableOpacity>
                        <Animated.View style={animatedStyle}>
                            <TouchableOpacity onPress={handle_validate} activeOpacity={0.8}>
                                <LinearGradient style={styles.main_btn} colors={[colors.fond1, colors.fond2]}>
                                    <AntDesign name='caretright' style={styles.icon} />
                                </LinearGradient>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </WrapperContent>
            {click && user_loading && <SecondaryLoader />}
        </Wrapper>
    )
}

export default Account

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
    accounttitle: { color: colors.black },
    radio: { flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', gap: 5 },
})

