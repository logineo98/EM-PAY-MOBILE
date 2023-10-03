import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect } from 'react';
import { images } from '../../libs/constants/constants';
import { colors, height, roboto, width } from '../../libs/typography/typography';
import { welcome_screen } from '../../libs/i18n/fr.FR.json'
import { components } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { css } from '../../libs/styles/styles';
import { checking } from '../../libs/services/user/user.action';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../libs/services/store';

type proprs = {}
const goto = { login: "login", register: "register" }
const Welcome: FC<proprs> = () => {
    const dispatch = useDispatch<any>()
    const navigation = useNavigation<any>()
    const { user_loading } = useSelector((state: RootState) => state?.user)

    useEffect(() => { dispatch(checking()) }, [dispatch]);

    if (user_loading)
        return <components.commons.loading title='Veuillez patienter pendant le chargement des données.' />

    return (
        <ImageBackground source={images.bg} style={css.auth.welcome.welcomebgimg}>
            <components.commons.container style={css.auth.welcome.welcome_container}>
                <View style={css.auth.welcome.content}>
                    <View style={css.auth.welcome.logobox}>
                        <Image source={images.logo_png} style={css.auth.welcome.logo} />
                    </View>
                    <View style={css.auth.welcome.textbox}>
                        <Text style={[css.auth.welcome.title, { fontSize: height * 0.035 }]}>{welcome_screen.title}</Text>
                        <Text style={[css.auth.welcome.description, { fontSize: width * 0.033 }]}>{welcome_screen.description}</Text>
                    </View>

                    <View style={css.auth.welcome.inputbox}>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate(goto.register)} activeOpacity={0.8} style={[css.auth.welcome.documentbtn]}>
                                <Text style={css.auth.welcome.btntext}>{welcome_screen.register_btn}</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity onPress={() => navigation.navigate(goto.login)} activeOpacity={0.8} style={[css.auth.welcome.documentbtn]}>
                                <Text style={css.auth.welcome.btntext}>{welcome_screen.login_btn}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </components.commons.container>
        </ImageBackground>
    )
}

export default Welcome

