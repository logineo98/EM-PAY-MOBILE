import { PermissionsAndroid, ScrollView, StyleSheet, } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import { components } from '../../components'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { RootState } from '../../libs/services/store'
import Geolocation from '@react-native-community/geolocation'

type COMPONENT_TYPE = {
    screenName: string,
}

const Geolocalisation: FC<COMPONENT_TYPE> = ({ screenName }) => {

    const { user_loading, allUsers } = useSelector((state: RootState) => state?.user)

    const [initialRegion, setInitialRegion] = useState<{ latitude: number, longitude: number, latitudeDelta: number, longitudeDelta: number }>()

    useEffect(() => {
        (async () => {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

                if (granted === PermissionsAndroid.RESULTS.GRANTED)
                    if (screenName === 'geolocalisation')
                        Geolocation.getCurrentPosition(info => {
                            setInitialRegion({ latitude: info.coords.latitude, longitude: info.coords.longitude, latitudeDelta: 0.5, longitudeDelta: 0.5 })
                        })
            } catch (err) { console.warn(err) }
        })()

    }, [screenName])

    return (
        <components.commons.screen_container title='Géolocalisation'>
            {/* {user_loading ? <components.commons.loading title='Veuillez patienter pendant le chargement des données.' /> : */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
                <MapView
                    style={{ width: '100%', height: '100%' }}
                    initialRegion={initialRegion}
                >
                    {allUsers?.map((user) => (
                        user?.montant && user?.coordinates?.la && user?.coordinates?.lo &&
                        <Marker key={user?.id}
                            coordinate={{ latitude: parseInt(user?.coordinates?.la, 10), longitude: parseInt(user?.coordinates?.lo, 10) }}
                            title={user?.name} description={`${user?.montant} FCFA`}
                        />
                    ))}
                </MapView>
            </ScrollView>
            {/*  } */}
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({})

export default Geolocalisation