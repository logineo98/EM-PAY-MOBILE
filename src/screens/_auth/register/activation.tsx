import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { FC, } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import { images } from '../../../libs/constants/constants'
import { colors, roboto } from '../../../libs/typography/typography'
import { inscription_screen } from "../../../libs/i18n/fr.FR.json"
import Wrapper from '../../../components/commons/wrapper'
import WrapperContent from '../../../components/commons/wrapper_content'
import LinearGradient from 'react-native-linear-gradient'
import Spacer from '../../../components/commons/spacer'
import ToastContainer from '../../../components/commons/toast_container'

const Finalisation: FC<any> = () => {
    const navigation = useNavigation<any>()
    const { height } = useWindowDimensions()

    return (
        <Wrapper>
            <ToastContainer />
            <WrapperContent scoll >
                <View style={styles.content}>
                    <Spacer />
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <View style={styles.logobox}>
                            <View style={[{ width: height * 0.20, height: height * 0.20 }]}><Image source={images.logo_png} style={styles.logo_img} /></View>
                        </View>
                        <Spacer h={40} />
                        <View >
                            <Text style={[styles.title, { textAlign: "center" }]}>{inscription_screen.waiting.title}</Text>
                            <Text style={[styles.description, { textAlign: "center" }]}>{inscription_screen.waiting.description}</Text>
                        </View>
                        <Spacer />
                    </View>


                    <View style={styles.btnbox}>
                        <TouchableOpacity onPress={() => navigation.navigate("login")} activeOpacity={0.8}>
                            <LinearGradient style={styles.main_btn} colors={[colors.white, colors.black]}>
                                <AntDesign name='caretleft' style={styles.icon} />
                            </LinearGradient>
                        </TouchableOpacity>

                    </View>
                </View>
            </WrapperContent>
        </Wrapper>
    )
}

export default Finalisation

const styles = StyleSheet.create({
    content: { flex: 1, justifyContent: "space-between", width: "100%", height: "100%" },
    logobox: { alignItems: "center", justifyContent: "center" },
    logo_img: { width: "100%", height: "100%" },
    title: { color: colors.black, fontSize: 24, fontFamily: roboto.bold },
    description: { color: colors.black, fontFamily: roboto.regular, fontSize: 13 },
    btnbox: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
    main_btn: { height: 50, width: 50, alignItems: "center", justifyContent: "center", borderRadius: 50 },
    icon: { fontSize: 24, color: colors.white },
    register_btn: { padding: 15, backgroundColor: colors.black, width: "60%", alignSelf: "center", borderRadius: 5 },
})

