import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import Account from './account'
import { colors, hp, wp } from '../../../libs/typography/typography'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Infos from './infos'
import Document from './document'
import Photo from './photo'
import Signature from './signature'
import Finalisation from './finalisation'
import LinearGradient from 'react-native-linear-gradient'
import Activation from './activation'
import { useNavigation } from '@react-navigation/native'
import { css } from '../../../libs/styles/styles'
import { inscription_inputs_request } from '../../../libs/services/user/user.request'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring } from 'react-native-reanimated'


type proprs = { index: number, currentPage: number, prev: any, next: any, states: any }
const goto = { welcome: 'welcome' }

const InscriptionPages: FC<proprs> = ({ index, currentPage, prev, next, states }: any) => {
    const navigation = useNavigation<any>()
    var error_init = { phone_error: '', name_error: '', firstname_error: '', birth_error: '', address_error: '', email_error: '', document_error: '', profil_error: '', signature_error: '', password_error: '', confirm_error: '' }
    const [error, setError] = useState<any>(error_init);
    const { inputs, setInputs } = states
    const [status, setStatus] = useState(false);
    let scale = useSharedValue(1);

    useEffect(() => { setStatus(true); scale.value = withSpring(1); }, [inputs, currentPage]);

    useEffect(() => {


        switch (currentPage) {
            case 0:
                scale.value = withSpring(1);
                if (inputs.phone !== '' && inputs.name !== '' && inputs.firstname !== '' && inputs.birthday !== '') { scale.value = withRepeat(withSpring(1.2), -1, true); }
                else scale.value = withSpring(1);
                setStatus(false)
                break;
            case 1:
                scale.value = withSpring(1);
                if (inputs.address !== "" && inputs.email !== "") scale.value = withRepeat(withSpring(1.2), -1, true);
                else scale.value = withSpring(1);
                setStatus(false)
                break;
            case 2:
                scale.value = withSpring(1);
                if (inputs.document?.cin !== '' || inputs.document?.nina !== "" || inputs.document?.passport !== "") scale.value = withRepeat(withSpring(1.2), -1, true);
                else scale.value = withSpring(1);
                setStatus(false)
                break;
            case 3:
                scale.value = withSpring(1);
                if (inputs.profil !== '') scale.value = withRepeat(withSpring(1.2), -1, true);
                else scale.value = withSpring(1);
                setStatus(false)
                break;
            case 4:
                scale.value = withSpring(1);
                if (inputs.signature !== '') scale.value = withRepeat(withSpring(1.2), -1, true);
                else scale.value = withSpring(1);
                setStatus(false)
                break;

            case 5:
                scale.value = withSpring(1);
                if (inputs.password !== '' && inputs.confirm !== '') scale.value = withRepeat(withSpring(1.2), -1, true);
                else scale.value = withSpring(1);
                setStatus(false)
                break;
            default: break;
        }
    }, [currentPage, status]);
    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });

    //---------------------SERVICES FUNCTIONS-----------------------//
    const infoNext = () => {
        const { phone_error, name_error, firstname_error, birth_error } = inscription_inputs_request("infos", inputs)
        if (phone_error !== '' || name_error !== '' || firstname_error !== '' || birth_error !== '') { setError(inscription_inputs_request("infos", inputs)); return }
        else setError(error_init)
        next()
    }

    const accountNext = () => {
        const { address_error, email_error } = inscription_inputs_request("account", inputs)
        if (address_error !== '' || email_error !== '') { setError(inscription_inputs_request("account", inputs)); return }
        else setError(error_init)
        next()
    }

    const documentNext = () => {
        const { document_error } = inscription_inputs_request("document", inputs)
        if (document_error !== '') { setError(inscription_inputs_request("document", inputs)); return }
        else setError(error_init)
        next()
    }


    const selfieNext = () => {
        const { profil_error } = inscription_inputs_request("selfie", inputs)
        if (profil_error !== '') { setError(inscription_inputs_request("selfie", inputs)); return }
        else setError(error_init)
        next()
    }

    const signatureNext = () => {
        const { signature_error } = inscription_inputs_request("signature", inputs)
        if (signature_error !== '') { setError(inscription_inputs_request("signature", inputs)); return }
        else setError(error_init)
        next()
    }

    const passwordNext = () => {
        const { password_error, confirm_error } = inscription_inputs_request("reset", inputs)
        if (password_error !== '' || confirm_error !== '') { setError(inscription_inputs_request("reset", inputs)); return }
        else setError(error_init)
        next()
    }

    //--------------------------------------------------------------//
    const RenderBtn = (func: any) =>
        <View style={css.auth.connexion.btnscontainer}>
            <View style={[styles.footer, { opacity: index > 0 ? 1 : 0 }]}>
                <TouchableOpacity onPress={prev}>
                    <LinearGradient style={styles.loginbtn} colors={['#bdc3c7', '#2c3e50']}>
                        <AntDesign name='caretleft' style={styles.loginbtn_txt} />
                    </LinearGradient>
                </TouchableOpacity >
            </View>

            <View style={styles.footer}>
                <Animated.View style={animatedStyle}>
                    <TouchableOpacity onPress={func} >
                        <LinearGradient style={styles.loginbtn} colors={[colors.fond1, colors.fond2]}>
                            <AntDesign name='caretright' style={styles.loginbtn_txt} />
                        </LinearGradient>
                    </TouchableOpacity >
                </Animated.View>
            </View>
        </View>


    switch (index) {
        case 0:
            return (
                <View style={[{ width: wp('100%'), height: hp(100) }]}>
                    <Infos inputs={inputs} currentPage={currentPage} setInputs={setInputs} error={error} />
                    {RenderBtn(infoNext)}
                </View>
            )
        case 1:
            return (
                <View style={[{ width: wp('100%'), height: hp('100%'), }]}>
                    <Account inputs={inputs} currentPage={currentPage} setInputs={setInputs} error={error} />
                    {RenderBtn(accountNext)}
                </View>
            )
        case 2:
            return (
                <View style={[{ width: wp('100%'), height: hp('100%'), }]}>
                    <Document index={index} currentPage={currentPage} inputs={inputs} setInputs={setInputs} error={error} setError={setError} />
                    {RenderBtn(documentNext)}
                </View>
            )

        case 3:
            return (
                <View style={[{ width: wp('100%'), height: hp('100%'), }]}>
                    <Photo index={index} currentPage={currentPage} inputs={inputs} setInputs={setInputs} error={error} />
                    {RenderBtn(selfieNext)}
                </View>
            )
        case 4:
            return (
                <View style={[{ width: wp('100%'), height: hp('100%'), }]}>
                    <Signature inputs={inputs} currentPage={currentPage} setInputs={setInputs} error={error} />
                    {RenderBtn(signatureNext)}
                </View>
            )

        case 5:
            return (
                <View style={[{ width: wp('100%'), height: hp('100%'), }]}>
                    <Finalisation inputs={inputs} currentPage={currentPage} setInputs={setInputs} error={error} />
                    {RenderBtn(passwordNext)}
                </View>
            )
        case 6:
            return (
                <View style={[{ width: wp('100%'), height: hp('100%'), }]}>
                    <Activation inputs={inputs} setInputs={setInputs} error={error} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={[styles.footer, { opacity: index > 0 ? 1 : 0 }]}>
                            <TouchableOpacity onPress={() => navigation.navigate(goto.welcome)}>
                                <LinearGradient style={styles.loginbtn} colors={['#bdc3c7', '#2c3e50']}>
                                    <Ionicons name='return-down-back-outline' style={styles.loginbtn_txt} />
                                </LinearGradient>
                            </TouchableOpacity >
                        </View>
                    </View>
                </View>
            )
        default:
            return null
    }
}

export default InscriptionPages

const styles = StyleSheet.create({
    footer: { alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 0 },
    loginbtn: { height: 55, width: 55, borderRadius: 55, backgroundColor: colors.fond1, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
    loginbtn_txt: { color: colors.white, fontSize: 24 },
});
