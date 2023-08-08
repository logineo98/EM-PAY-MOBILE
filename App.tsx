import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Page from './src/screens/page'

const App = () => {
  return (
    <View style={styles.container}>
      <Page/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,alignItems:'center',justifyContent:'center'
  }
})