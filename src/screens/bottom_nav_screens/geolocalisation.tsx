import { ScrollView, StyleSheet, } from 'react-native'
import React from 'react'
import { components } from '../../components'
import MapView, { Marker } from 'react-native-maps'
import { images } from '../../libs/constants/constants'

const Geolocalisation = () => {

    return (
        <components.commons.screen_container title='Géolocalisation'>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
                <MapView
                    style={{ width: '100%', height: '100%', }}
                    initialRegion={{
                        latitude: 12.5894656,
                        longitude: -7.9822848,
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: 12.5894656, longitude: -7.9822848, }}
                    />
                </MapView>

            </ScrollView>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({})

export default Geolocalisation