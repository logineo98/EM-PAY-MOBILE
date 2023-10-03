import { Image, PermissionsAndroid, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, useWindowDimensions } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Modal from "react-native-modal";
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
import { Image as CompressImg } from 'react-native-compressor';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import DatePicker from 'react-native-date-picker'
import { format } from 'date-fns'
import { inscription_inputs_request } from '../../../libs/services/user/user.request'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import ImageCropPicker from 'react-native-image-crop-picker'


const Document: FC<any> = () => {
    let scale = useSharedValue(1);
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const { width, height } = useWindowDimensions()

    const [error, setError] = useState("");
    const [click, setClick] = useState(false);
    const [next, setNext] = useState(false);
    const initial: userModel = { document: "" }
    const [inputs, setInputs] = useState(initial);
    const [visible, setVisible] = useState(false);
    const [img, setImg] = useState<any>();
    const [store, setStore] = useState<userModel>();



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
    useEffect(() => { if (next) { AsyncStorage.setItem("inputs", JSON.stringify(store)); navigation.navigate("photo"); setNext(false); setClick(false) } }, [next, store]);

    const openModal = () => { setVisible(!visible) }


    const selectImage = () => {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((granted) => {
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    ImageCropPicker.openPicker({ cropping: true, cropperCircleOverlay: false, mediaType: 'photo', includeBase64: false, })
                        .then((response: any) => {
                            if (!response.cancelled) {
                                setImg(response?.path)
                                CompressImg.compress(response?.path, { compressionMethod: 'auto', quality: 0.2 })
                                    .then((image: any) => {

                                        const imgs = image?.split('/')
                                        const filename = imgs[imgs?.length - 1].split('.')[0]
                                        setInputs({ ...inputs, document: { uri: image, type: 'image/jpeg', name: filename + '-image.jpg' } });
                                    }).catch((err: any) => { console.log(err) });
                            }
                        })
                        .catch((error) => { setError(error) });
                }
            }).catch((err: any) => { setError(err) })

        setVisible(false)
    };

    const takePhoto = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                const image = await ImageCropPicker.openCamera({ width: 300, height: 400, cropping: true, includeBase64: false })

                setImg(image?.path)
                const img = await CompressImg.compress(image?.path, { compressionMethod: 'auto', quality: 0.2 })
                const imgs = image?.path?.split('/')
                const filename = imgs[imgs?.length - 1].split('.')[0]

                setInputs({ ...inputs, document: { uri: img, type: 'image/jpeg', name: filename + '-image.jpg' } });
            } else {
                setError('Permission refusée pour accéder à la caméra');
            }
        } catch (error: any) {
            setError(error);
        }
        setVisible(false)
    };


    //traitement of login
    const handle_validate = () => {
        const validate: any = { document: inputs.document }

        if (inscription_inputs_request("document", validate, setError)) return;
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
                    <Modal isVisible={visible} animationIn={"slideInUp"} animationOut={"bounceOut"} animationInTiming={500} animationOutTiming={1500} onBackdropPress={() => setVisible(false)}>
                        <View style={{ backgroundColor: colors.white, width: '100%', height: height * 0.25, borderRadius: 5 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 10 }}>
                                <Text style={{ color: colors.black, fontSize: 20, fontFamily: roboto.bold }}>Options</Text>
                                <TouchableOpacity onPress={() => setVisible(false)} activeOpacity={0.8}><FontAwesome name="close" style={{ color: colors.black, fontSize: 20, marginRight: 10 }} /></TouchableOpacity>
                            </View>

                            <View style={{ gap: 5, flex: 1, alignContent: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                                <TouchableOpacity onPress={takePhoto} activeOpacity={0.8} style={{ backgroundColor: colors.black, padding: 13, borderRadius: 5, }}><Text style={{ color: colors.white, textAlign: 'center', fontFamily: roboto.light }}>Prendre une photo</Text></TouchableOpacity>
                                <TouchableOpacity onPress={selectImage} activeOpacity={0.8} style={{ backgroundColor: colors.black, padding: 13, borderRadius: 5, }}><Text style={{ color: colors.white, textAlign: 'center', fontFamily: roboto.light }}>Choisir une photo</Text></TouchableOpacity>
                            </View>
                        </View>
                    </Modal>


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
                        <View style={styles.documentimgbox}>
                            <Image source={img ? { uri: img } : images.noimage} style={styles.documentimg} />
                        </View>
                        <Spacer h={20} />

                        <View style={styles.formulaire}>
                            <View style={styles.inputbox}>
                                <View>
                                    <TouchableOpacity onPress={() => openModal()} activeOpacity={0.8} style={[styles.documentbtn]}>
                                        <Text style={styles.btntext}>{inscription_screen.document.nina}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => openModal()} activeOpacity={0.8} style={[styles.documentbtn]}>
                                        <Text style={styles.btntext}>{inscription_screen.document.passport}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity onPress={() => openModal()} activeOpacity={0.8} style={[styles.documentbtn]}>
                                        <Text style={styles.btntext}>{inscription_screen.document.cin}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Spacer />
                    </View>

                    <View style={styles.btnbox}>
                        <TouchableOpacity onPress={() => navigation.navigate("account")} activeOpacity={0.8}>
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

export default Document

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

    inputbox: { gap: 10 },
    documentimgbox: { height: 150, width: "100%", alignItems: 'center', justifyContent: 'center' },
    documentimg: { width: '100%', height: '100%', resizeMode: 'cover' },
    documentbtn: { backgroundColor: colors.black, padding: 14, borderRadius: 4, alignItems: 'center' },
    btntext: { color: colors.white, fontFamily: roboto.thin, fontSize: 17 },
})

