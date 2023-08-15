import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
    return (
        <View style={styles.home_container}>
            <ScrollView showsHorizontalScrollIndicator={false}>

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    home_container: { flex: 1, padding: 10 }
})

export default Home