import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { colors, height, hp, width, wp } from '../../../libs/typography/typography'
import AntDesign from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import MotDePasseOublier from './mot_de_passe_oublie'
import VerificationPasswordOublier from './verification_password_oublier'
import ResetPassword from './reset_password'
import Login from './login'
import { css } from '../../../libs/styles/styles'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { connexion_service } from '../../../libs/services/user/user.action'
import { connexion_request, forgot_request, reset_request, verify_request } from '../../../libs/services/user/user.request'
import { allInputsFilled, logger } from '../../../libs/constants/constants'


type proprs = { index?: number, currentPage?: number, states?: any, prev: any, next: any }
const goto = { welcome: 'welcome' }

const ConnexionPages: FC<proprs> = ({ index, currentPage, states, prev, next }: any) => {
    const navigation = useNavigation<any>()
    const error_init = { login_phone_error: '', login_password_error: '', forgot_phone_error: '', verify_phone_error: '', reset_password_error: '', reset_confirm_error: '' }
    const [error, setError] = useState<any>(error_init);
    let { connexionInputs, setConnexionInputs, forgotInputs, setForgotInputs, verifyInputs, setVerifyInputs, resetInputs, setResetInputs } = states
    let scale = useSharedValue(1);

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
        // const { login_phone_error, login_password_error } = connexion_request(connexionInputs)
        // if (login_phone_error !== '' || login_password_error !== '') { setError(connexion_request(connexionInputs)); return }
        // else setError(error_init)

        navigation.navigate('main')
        logger("Reset password succeed", "GOTO HOME")
    }

    const handleForgot = () => {
        const { forgot_phone_error } = forgot_request(forgotInputs)
        if (forgot_phone_error !== '') { setError(forgot_request(forgotInputs)); return }
        else setError(error_init)
        next()
    }

    const handleVerify = () => {
        const { verify_phone_error } = verify_request(verifyInputs, 5)
        if (verify_phone_error !== '') { setError(verify_request(verifyInputs, 5)); return }
        else setError(error_init)
        next()
    }

    const handleReset = () => {
        const { reset_confirm_error, reset_password_error } = reset_request(resetInputs)
        if (reset_password_error !== '' || reset_confirm_error !== '') { setError(reset_request(resetInputs)); return }
        else setError(error_init)

    }
    //--------------------------------------------------------------//

    switch (index) {

        case 0:
            return (
                <View style={[{ width: wp('100%'), height: hp(100) }]}>
                    <Login index={index} next={next} connexionInputs={connexionInputs} setConnexionInputs={setConnexionInputs} error={error} setError={setError} />

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
                                <TouchableOpacity onPress={handleLogin} >
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
                                <TouchableOpacity onPress={handleForgot} >
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
                    <VerificationPasswordOublier verifyInputs={verifyInputs as string} setVerifyInputs={setVerifyInputs} error={error} index={index} />

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
                                <TouchableOpacity onPress={handleVerify} >
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
                                <TouchableOpacity onPress={handleReset} >
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
