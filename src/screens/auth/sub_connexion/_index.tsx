import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { colors, hp, wp } from '../../../libs/typography/typography'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import MotDePasseOublier from './mot_de_passe_oublie'
import VerificationPasswordOublier from './verification_password_oublier'
import ResetPassword from './reset_password'
import Login from './login'
import { css } from '../../../libs/styles/styles'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import { authentification, forgot_password, forgot_verify, reset_password, } from '../../../libs/services/user/user.action'
import { connexion_request, forgot_request, reset_request, verify_request } from '../../../libs/services/user/user.request'
import { allInputsFilled, logger } from '../../../libs/constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../libs/services/store'
import Toast from 'react-native-toast-message'
import { components } from '../../../components'


type proprs = { index?: number, currentPage?: number, states?: any, prev: any, next: any }
const goto = { welcome: 'welcome' }

const ConnexionPages: FC<proprs> = ({ index, currentPage, states, prev, next }: any) => {
    const dispatch = useDispatch<any>()
    const error_init = { login_phone_error: '', login_password_error: '', forgot_phone_error: '', verify_phone_error: '', reset_password_error: '', reset_confirm_error: '' }
    const [error, setError] = useState<any>(error_init);
    const [indicatif, setIndicatif] = useState<any>("+223");
    const [_data, _setData] = useState<any>();
    const [click, setClick] = useState(false);
    let { connexionInputs, setConnexionInputs, forgotInputs, setForgotInputs, verifyInputs, setVerifyInputs, resetInputs, setResetInputs } = states
    let scale = useSharedValue(1);

    const { tmp, info, data, user_loading, user_errors } = useSelector((state: RootState) => state?.user)

    //---------------- user account validation info alert
    useEffect(() => {
        if (tmp && info !== null) { Toast.show({ type: 'info', text1: 'Informations', text2: (info ? info : ''), }); setError(""); dispatch({ type: 'reset_tmp' }); dispatch({ type: 'reset_info' }) }
    }, [tmp, dispatch]);

    //---------------- user account errors alert
    useEffect(() => {
        if (user_errors && user_errors !== null) { Toast.show({ type: 'error', text1: 'Erreurs', text2: (user_errors ? user_errors : ''), }); dispatch({ type: 'reset_user_errors' }); setClick(false); }
    }, [user_errors, dispatch]);

    //-------------- forgot success
    useEffect(() => {
        if (data && data !== null) {
            next()
            _setData(data)
            dispatch({ type: "reset_data" })
        }
    }, [data]);


    //------------ for animations
    useEffect(() => {
        switch (currentPage) {
            case 0:
                if (allInputsFilled(connexionInputs)) { scale.value = withRepeat(withSpring(1.2), -1, true); }
                else scale.value = withSpring(1);
                break;
            case 1:
                if (allInputsFilled(forgotInputs)) scale.value = withRepeat(withSpring(1.2), -1, true);
                else scale.value = withSpring(1);
                break;
            case 2:
                if (verifyInputs !== '' && verifyInputs?.length >= 5) scale.value = withRepeat(withSpring(1.2), -1, true);
                else scale.value = withSpring(1);
                break;
            case 3:
                if (allInputsFilled(resetInputs)) scale.value = withRepeat(withSpring(1.2), -1, true);
                else scale.value = withSpring(1);
                break;
            default: break;
        }
    }, [
        allInputsFilled(connexionInputs),
        allInputsFilled(forgotInputs),
        allInputsFilled(resetInputs),
        verifyInputs,
        currentPage
    ]);

    const animatedStyle = useAnimatedStyle(() => { return { transform: [{ scale: scale.value }], }; });

    //---------------------SERVICES FUNCTIONS-----------------------//
    const handleLogin = () => {
        const { login_phone_error, login_password_error } = connexion_request(connexionInputs)
        if (login_phone_error !== '' || login_password_error !== '') { setError(connexion_request(connexionInputs)); return }
        else setError(error_init)

        if (!connexionInputs.phone.includes(indicatif))
            connexionInputs.phone = indicatif + connexionInputs.phone


        dispatch(authentification(connexionInputs))
        setClick(true)

    }

    const handleForgot = () => {
        const { forgot_phone_error } = forgot_request(forgotInputs)
        if (forgot_phone_error !== '') { setError(forgot_request(forgotInputs)); return }
        else setError(error_init)

        if (!forgotInputs.phone.includes(indicatif))
            forgotInputs.phone = indicatif + forgotInputs.phone

        dispatch(forgot_password(forgotInputs))
    }

    const handleVerify = () => {
        const { verify_phone_error } = verify_request(verifyInputs, 5)
        if (verify_phone_error !== '') { setError(verify_request(verifyInputs, 5)); return }
        else setError(error_init)

        const toStore = { code: verifyInputs, id: _data.id }
        dispatch(forgot_verify(toStore))

    }

    const handleReset = () => {
        const { reset_confirm_error, reset_password_error } = reset_request(resetInputs)
        if (reset_password_error !== '' || reset_confirm_error !== '') { setError(reset_request(resetInputs)); return }
        else setError(error_init)

        const toStore = { password: resetInputs.password, id: _data.id }
        dispatch(reset_password(toStore))

    }

    //--------------------------- pages ui ----------------------//
    if (click && user_loading)
        return <components.commons.loading />


    switch (index) {

        case 0:
            return (
                <View style={[{ width: wp('100%'), height: hp('100%') }]}>
                    <View style={{ zIndex: 100 }}><Toast /></View>
                    <Login index={index} next={next} connexionInputs={connexionInputs} setConnexionInputs={setConnexionInputs} setIndicatif={setIndicatif} error={error} setError={setError} />

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
                                <TouchableOpacity disabled={user_loading ? true : false} onPress={handleLogin} >
                                    <LinearGradient style={styles.loginbtn} colors={[colors.fond1, colors.fond2]}>
                                        <AntDesign name='check' style={styles.loginbtn_txt} />
                                    </LinearGradient>
                                </TouchableOpacity >
                            </Animated.View>
                        </View>
                    </View>
                </View>
            )
        case 1:
            return (
                <View style={[{ width: wp('100%'), height: hp(100) }]}>
                    <MotDePasseOublier forgotInputs={forgotInputs} error={error} setError={setError} setForgotInputs={setForgotInputs} index={index} />

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
                                <TouchableOpacity disabled={user_loading ? true : false} onPress={handleForgot} >
                                    <LinearGradient style={styles.loginbtn} colors={[colors.fond1, colors.fond2]}>
                                        <AntDesign name='check' style={styles.loginbtn_txt} />
                                    </LinearGradient>
                                </TouchableOpacity >
                            </Animated.View>
                        </View>
                    </View>
                </View>
            )
        case 2:
            return (
                <View style={[{ width: wp('100%'), height: hp('100%'), }]}>
                    <VerificationPasswordOublier setDebugcode={_setData} debugCode={_data?.code || ""} verifyInputs={verifyInputs as string} setVerifyInputs={setVerifyInputs} error={error} index={index} />

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
                                <TouchableOpacity disabled={user_loading ? true : false} onPress={handleVerify} >
                                    <LinearGradient style={styles.loginbtn} colors={[colors.fond1, colors.fond2]}>
                                        <AntDesign name='check' style={styles.loginbtn_txt} />
                                    </LinearGradient>
                                </TouchableOpacity >
                            </Animated.View>
                        </View>
                    </View>
                </View>
            )
        case 3:
            return (
                <View style={[{ width: wp('100%'), height: hp('100%'), }]}>
                    <ResetPassword resetInputs={resetInputs} setResetInputs={setResetInputs} index={index} error={error} />

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
                                <TouchableOpacity disabled={user_loading ? true : false} onPress={handleReset} >
                                    <LinearGradient style={styles.loginbtn} colors={[colors.fond1, colors.fond2]}>
                                        <AntDesign name='check' style={styles.loginbtn_txt} />
                                    </LinearGradient>
                                </TouchableOpacity >
                            </Animated.View>
                        </View>
                    </View>
                </View>
            )

        default:
            return null
    }
}

export default ConnexionPages

const styles = StyleSheet.create({
    footer: { alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 0 },
    loginbtn: { height: 55, width: 55, borderRadius: 55, backgroundColor: colors.fond1, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
    loginbtn_txt: { color: colors.white, fontSize: 24 },
});
