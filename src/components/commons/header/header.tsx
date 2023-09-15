import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { colors, roboto } from '../../../libs/typography/typography'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { ParamListBase } from '@react-navigation/native'
import { images } from '../../../libs/constants/constants'
import { Switch } from 'react-native-elements'
import { RootState } from '../../../libs/services/store'
import { useSelector } from 'react-redux'

type COMPONENT_TYPE = {
  navigation: DrawerNavigationProp<ParamListBase, string, undefined>,
  screenName: string,
  displayCard: boolean,
  setDisplayCard: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: FC<COMPONENT_TYPE> = ({ navigation, screenName, displayCard, setDisplayCard }) => {

  const { host } = useSelector((state: RootState) => state?.user)

  return (
    <View style={styles.header_container}>
      <TouchableOpacity style={styles.profil_img_name_container} activeOpacity={0.5} onPress={() => navigation.openDrawer()}>
        <View style={styles.profil_img_container}>
          <Image source={images.avatar} style={styles.profil_img} />
        </View>
        <Text style={styles.profil_name}> {host?.name} </Text>
      </TouchableOpacity>

      {(!screenName || screenName === 'home') &&
        <Switch value={displayCard} onValueChange={(value) => setDisplayCard(value)} trackColor={{ false: '#767577', true: '#767577' }} thumbColor={displayCard ? colors.fond1 : '#f4f3f4'} />
      }
    </View>
  )
}

const styles = StyleSheet.create({
  header_container: { backgroundColor: colors.white, height: 56, elevation: 2, padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },

  profil_img_name_container: { flexDirection: 'row', alignItems: 'center' },
  profil_img_container: { height: 35, width: 35, },
  profil_img: { height: '100%', width: '100%', resizeMode: 'cover', borderRadius: 35 },
  profil_name: { color: colors.black, fontSize: 18, marginLeft: 3, fontFamily: roboto.regular },
})

export default Header