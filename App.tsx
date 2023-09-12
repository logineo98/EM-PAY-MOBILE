import { StyleSheet } from 'react-native'
import React from 'react'
import RootNavigation from './src/libs/navigations/root_navigation'
import { Provider } from 'react-redux'
import Store from './src/libs/services/store'

const App = () => {
  return (
    <Provider store={Store}>
      <RootNavigation />
    </Provider>
  )
}

const styles = StyleSheet.create({})

export default App