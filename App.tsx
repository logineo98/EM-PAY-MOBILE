import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RootNavigation from './src/libs/navigations/root_navigation'

const App = () => {
  return (
    <RootNavigation />
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'center'
  }
})