import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Fontisto from "react-native-vector-icons/Fontisto"
import { inscription_screen } from '../../../libs/i18n/fr.FR.json'
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import fs from 'react-native-fs';
import { allInputsFilled, images } from '../../../libs/constants/constants';
import { userModel } from '../../../libs/services/user/user.model';
import Wrapper from '../../../components/commons/wrapper';
import WrapperContent from '../../../components/commons/wrapper_content';
import Spacer from '../../../components/commons/spacer';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated';
import { colors, roboto } from '../../../libs/typography/typography';
import { useNavigation } from '@react-navigation/native';
import { inscription_inputs_request } from '../../../libs/services/user/user.request';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToastContainer from '../../../components/commons/toast_container';

const Photo = () => {
    const { height, width } = useWindowDimensions()
    const cameraRef = useRef<any>(null);
    const navigation = useNavigation<any>()
    let scale = useSharedValue(1);
    const [inputs, setInputs] = useState<userModel>({ profil: "" });
    const [error, setError] = useState("");
    const [click, setClick] = useState(false);
    const [next, setNext] = useState(false);
    const [store, setStore] = useState<userModel>();
    const devices = useCameraDevices()
    const device: any = devices.front
    const [imageSource, setImageSource] = useState('');

    //get camera permission
    useEffect(() => {
        async function getPermission() { try { await Camera.requestCameraPermission(); } catch (error) { console.log(error) } }
        getPermission()
    }, []);

    //alert for errors form this app
    useEffect(() => { if (error && error !== null) { Toast.show({ type: 'error', text1: 'Avertissement', text2: error, }); setError("") }; }, [error]);

    //animate login button
    useEffect(() => { if (allInputsFilled(inputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); } else scale.value = withSpring(1); }, [allInputsFilled(inputs)]);

    //retrieve prev datas from localstorage
    useEffect(() => { AsyncStorage.getItem("inputs").then((res: any) => { const _inpt = JSON.parse(res); setStore({ ..._inpt }) }) }, []);

    //result of traitement
    useEffect(() => { if (next) { AsyncStorage.setItem("inputs", JSON.stringify(store)); navigation.navigate("signature"); setNext(false); setClick(false) } }, [next, store]);


    const takePhoto = async () => {
        if (cameraRef.current !== null) {
            try {
                const photo = await cameraRef.current.takePhoto({})
                setImageSource('file:///' + photo.path)
                setInputs({ ...inputs, profil: { uri: 'file:///' + photo.path, type: 'image/jpeg', name: "profile" + '-image.jpg' } })

            } catch (error: any) {
                console.log(error.message)
            }
        }
    }

    const removePhoto = async () => {
        try {
            const path = imageSource;
            const exist: any = fs.exists(path)

            if (exist) {
                await fs.unlink(path);
                setImageSource('')
                setInputs({ ...inputs, profil: null })
            }
        } catch (error) {
            console.log('Erreur de suppression d\'image:', error);
        }
    }


    //traitement of login
    const handle_validate = () => {
        if (inscription_inputs_request("selfie", inputs, setError)) return;
        setStore({ ...store, ...inputs })

        setNext(true)
        setClick(true)
    }

    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });

    if (device == null) return <ActivityIndicator size={20} color={colors.fond1} />;

    return (
        <Wrapper>
            <ToastContainer />
            <WrapperContent scoll>
                <View style={styles.content}>
                    <Spacer />
                    <View>
                        <View style={styles.logobox}>
                            <View style={[{ width: height * 0.20, height: height * 0.20 }]}><Image source={images.logo_png} style={styles.logo_img} /></View>
                        </View>
                        <Spacer h={40} />

                        <View style={[{ gap: height * 0.02, }]}>
                            <Text style={[styles.title, { fontSize: width * 0.08 }]}>{inscription_screen.identity.selfie.title}</Text>
                            <Text style={[styles.description, { fontSize: width * 0.04 }]}>{inscription_screen.identity.selfie.description}</Text>
                        </View>

                        <View style={styles.selfiebox}>
                            <View style={[styles.selfiezone, { height: width * 0.85, width: width * 0.85, borderRadius: width * 0.80, }]}>
                                {imageSource ? <Image source={{ uri: imageSource }} style={[styles.selfieimg, { borderRadius: width * 0.8, }]} /> :
                                    <Camera
                                        ref={cameraRef}
                                        style={[styles.selfieimg]}
                                        photo
                                        device={device}
                                        isActive
                                    />
                                }
                            </View>
                            {imageSource ?
                                <TouchableOpacity onPress={removePhoto} activeOpacity={0.8} style={styles.photoiconbtn}>
                                    <Fontisto name='trash' style={styles.photoicon} />
                                </TouchableOpacity> :
                                <TouchableOpacity onPress={takePhoto} activeOpacity={0.8} style={styles.photoiconbtn}>
                                    <MaterialIcons name='enhance-photo-translate' style={styles.photoicon} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
                <View style={styles.btnbox}>
                    <TouchableOpacity onPress={() => navigation.navigate("document")} activeOpacity={0.8}>
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
            </WrapperContent>
        </Wrapper>
    )
}

export default Photo


const styles = StyleSheet.create({
    content: { flex: 1, justifyContent: "space-between", width: "100%", height: "100%" },
    logobox: { alignItems: "center", justifyContent: "center" },
    logo_img: { width: "100%", height: "100%" },
    btnbox: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    main_btn: { height: 50, width: 50, alignItems: "center", justifyContent: "center", borderRadius: 50 },
    icon: { fontSize: 24, color: colors.white },
    title: { fontFamily: roboto.bold, textAlign: 'center', color: colors.black },
    description: { fontFamily: roboto.thin, textAlign: 'center', color: colors.black },
    selfiebox: { alignItems: 'center', position: 'relative' },
    selfiezone: { overflow: "hidden" },
    selfieimg: { width: '100%', height: '100%', resizeMode: "contain" },
    photoiconbtn: { zIndex: 1, position: 'absolute', right: '10%', top: '8%', backgroundColor: colors.black, height: 55, width: 55, borderRadius: 55, alignItems: 'center', justifyContent: 'center', },
    photoicon: { fontSize: 35, color: colors.white },

})

