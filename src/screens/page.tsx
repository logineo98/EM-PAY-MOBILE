import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {inscription} from "../libs/i18n/fr.FR.json"
import { roboto } from '../libs/typography/typography'


const Page = () => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize:25,fontFamily:roboto.bold}}>{inscription.title}</Text>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container:{
    flex:1,alignItems:'center',justifyContent:'center'
  }
})