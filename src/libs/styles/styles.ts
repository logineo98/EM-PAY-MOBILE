export const drawer = {

}

import { StyleSheet } from "react-native";
import { colors, height, hp, roboto, width, wp } from "../typography/typography";



const connexion = StyleSheet.create({

    connexion_container: { height: '90%', justifyContent: "flex-end" },
    content: { gap: 15, flex: 1, justifyContent: "center" },
    logobox: { height: '25%', alignItems: 'center', justifyContent: 'center' },
    logo: { width: '90%', height: '90%', resizeMode: 'contain' },
    textbox: { gap: hp(2), marginVertical: hp(2) },
    title: { fontSize: hp(3.5), fontFamily: roboto.bold, textAlign: 'center', color: colors.black },
    description: { fontSize: wp(3.3), fontFamily: roboto.thin, textAlign: 'center', color: colors.black },

    inputbox: { gap: 10 },
    inputfield: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.8, borderColor: colors.placeholder, borderRadius: wp(1.5), paddingHorizontal: wp(1.5) },
    inputicon: { fontSize: wp(6), color: colors.auth_icon },
    input: { flex: 1, paddingHorizontal: wp(2), color: colors.black },
    errortext: { paddingRight: 5, color: "tomato", alignSelf: 'flex-end', fontFamily: roboto.boldItalic, fontSize: 9 },

    linkbox: { height: hp(15), alignItems: 'center', justifyContent: 'center', gap: hp(2.5) },
    registerbtn: { padding: wp(2.5), backgroundColor: colors.black, width: wp(60), borderRadius: wp(1.5) },
    registerbtn_txt: { color: colors.white, textAlign: 'center', fontFamily: roboto.light, fontSize: hp(2.5) },
    forgot_txt: { color: colors.black, textAlign: 'center', fontFamily: roboto.thin, fontSize: hp(2) },

    footer: { alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 15, paddingVertical: 0 },
    loginbtn: { height: 55, width: 55, borderRadius: 55, backgroundColor: colors.fond1, alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' },
    loginbtn_txt: { color: colors.white, fontSize: 24 },
    verifycell: { width: hp(9), height: hp(9), borderRadius: 4, alignItems: 'center', justifyContent: 'center', lineHeight: 60, fontSize: 28, borderWidth: 2, borderColor: colors.auth_icon, textAlign: 'center', color: colors.black },
    verifyfocusCell: { borderColor: colors.fond1, color: colors.fond1 },
    btnscontainer: { flexDirection: 'row', justifyContent: 'space-between', flex: 1 },

    //compte
    accounttitle: { color: colors.black },
    radio: { flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', gap: 5 },

    //document
    documentimgbox: { height: 180, width: "100%", alignItems: 'center', justifyContent: 'center' },
    documentimg: { width: '100%', height: '100%', resizeMode: 'cover' },
    documentbtn: { backgroundColor: colors.black, padding: 14, borderRadius: 4, alignItems: 'center' },
    btntext: { color: colors.white, fontFamily: roboto.thin, fontSize: 17 },

    //photo
    photoiconbtn: { zIndex: 1, position: 'absolute', right: '10%', top: '8%', backgroundColor: colors.black, height: 55, width: 55, borderRadius: 55, alignItems: 'center', justifyContent: 'center', },
    photoicon: { fontSize: 35, color: colors.white },
    selfiebox: { alignItems: 'center', position: 'relative' },
    selfiezone: { height: wp(85), width: wp(85), borderRadius: wp(80), overflow: "hidden" },
    selfieimg: { width: '100%', height: '100%', borderRadius: wp(80), resizeMode: "contain" },

    //signature
    signaturebtn: { color: colors.white },
    signature: { flex: 1, borderColor: '#000033', borderWidth: 1, },
    buttonStyle: { flex: 1, justifyContent: "center", alignItems: "center", padding: 14, backgroundColor: colors.black, borderRadius: 4, marginTop: 2, fontFamily: roboto.light },
    signaturebox: { alignItems: 'center' },
    signaturezone: { height: wp(85), width: wp(85), borderColor: colors.placeholder },
})


const welcome = StyleSheet.create({
    welcomebgimg: { flex: 1 },
    welcome_container: { flex: 1, height: '90%', justifyContent: "flex-end" },
    content: { gap: 10 },
    logobox: { height: '35%', alignItems: 'center', justifyContent: 'center' },
    logo: { width: '100%', height: '100%', resizeMode: 'contain' },
    textbox: { gap: 5, marginVertical: '5.5%' },
    title: { fontSize: hp(3.5), fontFamily: roboto.bold, textAlign: 'center', color: colors.black },
    description: { fontSize: wp(3.3), fontFamily: roboto.light, textAlign: 'center', color: colors.black },

    inputbox: { gap: 10 },
    inputfield: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 0.8, borderColor: colors.placeholder, borderRadius: 4, paddingHorizontal: 5 },
    inputicon: { fontSize: 22, color: colors.auth_icon },
    input: { flex: 1, paddingHorizontal: 6, },
    errortext: { paddingRight: 5, color: "tomato", alignSelf: 'flex-end', fontFamily: roboto.boldItalic, fontSize: 9 },

    accounttitle: { color: colors.black },
    radio: { flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', gap: 5 },

    documentbtn: {
        backgroundColor: colors.black, padding: 14, borderRadius: 4, alignItems: 'center'
    },
    btntext: { color: colors.white, fontFamily: roboto.light, fontSize: 17 }
})

export const css = {
    auth: {
        connexion, welcome
    }
}