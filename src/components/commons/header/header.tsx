import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ParamListBase } from '@react-navigation/native'
import { images } from '../../../libs/constants/constants'
import { Switch } from 'react-native-elements'

type COMPONENT_TYPE = {
  navigation: DrawerNavigationProp<ParamListBase, string, undefined>,
  screenName: string,
  bottomTabScreenName: string,
  displayCard: boolean,
  setDisplayCard: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC<COMPONENT_TYPE> = ({ navigation, screenName, bottomTabScreenName, displayCard, setDisplayCard }) => {

  return (
    <View style={styles.header_container}>
      <TouchableOpacity style={styles.profil_img_name_container} activeOpacity={0.5} onPress={() => navigation.openDrawer()}>
        <View style={styles.profil_img_container}>
          <Image source={images.logo_png} style={styles.profil_img} />
        </View>
        <Text style={styles.profil_name}>Tz nation</Text>
      </TouchableOpacity>

      {((!screenName || screenName === 'home') && (bottomTabScreenName !== 'geolocalisation_stack' && bottomTabScreenName !== 'historique_stack' && bottomTabScreenName !== 'service_client_stack')) &&
        <Switch value={displayCard} onValueChange={(value) => setDisplayCard(value)} trackColor={{ false: '#767577', true: '#767577' }} thumbColor={displayCard ? colors.fond1 : '#f4f3f4'} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  header_container: { backgroundColor: colors.white, height: 56, elevation: 2, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  profil_img_name_container: { flexDirection: 'row', alignItems: 'center' },
  profil_img_container: { height: 46, width: 46, },
  profil_img: { height: '100%', width: '100%', resizeMode: 'cover' },
  profil_name: { color: colors.black, fontSize: 18, marginLeft: 3, fontFamily: roboto.regular },
})

export default Header