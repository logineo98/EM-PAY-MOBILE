import { ScrollView, StyleSheet, } from 'react-native'
import React from 'react'
import { components } from '../../components'
import MapView, { Marker } from 'react-native-maps'

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
                        coordinate={{ latitude: 2.5894656, longitude: -7.9822848, }}
                        image={{ uri: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ficon%2Fmap_3082383&psig=AOvVaw2b4eXejoPPBs2kKt-6_vb5&ust=1692575150555000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKiOlffz6YADFQAAAAAdAAAAABAE' }}
                    />
                </MapView>

            </ScrollView>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({})

export default Geolocalisation