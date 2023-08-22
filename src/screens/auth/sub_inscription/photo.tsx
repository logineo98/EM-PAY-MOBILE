import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Fontisto from "react-native-vector-icons/Fontisto"
import { inscription_screen } from '../../../libs/i18n/fr.FR.json'
import { components } from '../../../components';
import { css } from '../../../libs/styles/styles';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import fs from 'react-native-fs';
import { images } from '../../../libs/constants/constants';
import { userModel } from '../../../libs/services/user/user.model';

type props = { index?: number, currentPage?: number, error?: { profil_error?: string, }, inputs: userModel, setError?: any, setInputs: any }
const Photo: FC<props> = ({ index, error, currentPage, inputs, setInputs }: any) => {
    const cameraRef = useRef<any>(null);
    const devices = useCameraDevices()
    const device: any = devices.front
    const [imageSource, setImageSource] = useState('');

    useEffect(() => {
        async function getPermission() {
            try { await Camera.requestCameraPermission(); }
            catch (error) { console.log(error) }
        }
        if (currentPage === 3) getPermission()
    }, [currentPage]);

    useEffect(() => {
        setInputs({ ...inputs, profil: imageSource })
    }, [imageSource]);


    const takePhoto = async () => {
        if (cameraRef.current !== null && currentPage === 3) {
            try {
                const photo = await cameraRef.current.takePhoto({})
                setImageSource('file:///' + photo.path)
            } catch (error: any) {
                console.log(error.message)
            }
        }
    }

    const removePhoto = async () => {
        try {
            const path = imageSource;
            const exist: any = fs.exists(path)

            if (exist) {
                await fs.unlink(path);
                setImageSource('')
            }
        } catch (error) {
            console.log('Error deleting image:', error);
        }
    }

    if (device == null) return <ActivityIndicator size={20} color={'red'} />;

    return (

        <components.commons.container style={css.auth.connexion.connexion_container}>
            <View style={css.auth.connexion.content}>
                <View style={css.auth.connexion.logobox}>
                    <Image source={images.logo_png} style={css.auth.connexion.logo} />
                </View>

                <View style={css.auth.connexion.textbox}>
                    <Text style={css.auth.connexion.title}>{inscription_screen.identity.selfie.title}</Text>
                    <Text style={css.auth.connexion.description}>{inscription_screen.identity.selfie.description}</Text>
                    <Text style={[css.auth.connexion.errortext, { alignSelf: "center" }]}>{error?.profil_error}</Text>
                </View>

                <View style={css.auth.connexion.selfiebox}>
                    <View style={css.auth.connexion.selfiezone}>
                        {imageSource ? <Image source={{ uri: imageSource }} style={css.auth.connexion.selfieimg} /> :
                            <Camera
                                ref={cameraRef}
                                style={[css.auth.connexion.selfieimg]}
                                photo
                                device={device}
                                isActive
                            />
                        }
                    </View>
                    {imageSource ?
                        <TouchableOpacity onPress={removePhoto} activeOpacity={0.8} style={css.auth.connexion.photoiconbtn}>
                            <Fontisto name='trash' style={css.auth.connexion.photoicon} />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={takePhoto} activeOpacity={0.8} style={css.auth.connexion.photoiconbtn}>
                            <MaterialIcons name='enhance-photo-translate' style={css.auth.connexion.photoicon} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
        </components.commons.container>
    )
}

export default Photo

