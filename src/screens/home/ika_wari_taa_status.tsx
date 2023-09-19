import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { StackNavigationHelpers } from '@react-navigation/stack/lib/typescript/src/types'
import { ParamListBase, RouteProp } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../libs/services/store'
import { components } from '../../components'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'

import { colors, roboto } from '../../libs/typography/typography'

type COMPONENT_TYPE = {
    navigation: StackNavigationHelpers,
    route: RouteProp<ParamListBase, 'ika_wari_taa_status'>
}

const IkaWariTaaStatus: FC<COMPONENT_TYPE> = ({ navigation, route }) => {

    const { } = useSelector((state: RootState) => state?.user)

    const status = (route.params as any).status

    return (
        <components.commons.screen_container title='Ika Wari Taa'>
            <ScrollView contentContainerStyle={styles.container_global} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps='handled'>
                <View style={styles.status_container}>
                    <View style={styles.status_icon_container}>
                        {status ?
                            <FontAwesome5 name='check-circle' color={colors.success} size={100} style={styles.status_icon} /> :
                            <Entypo name='circle-with-cross' color={colors.error} size={100} style={styles.status_icon} />
                        }
                    </View>

                    <Text style={styles.message}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas tempore aut iusto asperiores accusamus, nostrum cumque doloremque expedita sunt saepe!
                    </Text>

                    <TouchableOpacity activeOpacity={0.5} style={styles.back_home_container} onPress={() => navigation.navigate('home')}>
                        <Text style={styles.back_home_name}>Retour à l'accueil</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    container_global: { flex: 1, justifyContent: 'center', alignItems: 'center', },

    status_container: { width: '100%', },

    status_icon_container: { alignItems: 'center', },
    status_icon: {},

    message: { color: colors.black, fontFamily: roboto.regular, textAlign: 'center', fontSize: 18, marginVertical: 25 },

    back_home_container: { backgroundColor: colors.black, borderRadius: 5, },
    back_home_name: { color: colors.white, fontFamily: roboto.black, textTransform: 'uppercase', textAlign: 'center', paddingVertical: 10, },
})

export default IkaWariTaaStatus