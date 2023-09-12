import { Image, PermissionsAndroid, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react';
import { inscription_screen } from '../../../libs/i18n/fr.FR.json'
import { components } from '../../../components';
import { css } from '../../../libs/styles/styles';
import ImageCropPicker from 'react-native-image-crop-picker';
import { Image as CompressImg } from 'react-native-compressor';
import Modal from "react-native-modal";
import { colors, height, hp, roboto } from '../../../libs/typography/typography';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { images } from '../../../libs/constants/constants';
import { userModel } from '../../../libs/services/user/user.model';

type props = { index?: number, currentPage?: number, error?: { document_error?: string, }, inputs: userModel, setError?: any, setInputs: any }
const Document: FC<props> = ({ index, currentPage, error, setError, inputs, setInputs }: any) => {
    const [files, setFiles] = useState<any>("");
    const [visible, setVisible] = useState(false);
    const [img, setImg] = useState<any>();

    const selectImage = () => {
        if (currentPage === 2)
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((granted) => {
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        ImageCropPicker.openPicker({ cropping: true, cropperCircleOverlay: false, mediaType: 'photo', includeBase64: false, })
                            .then((response: any) => {
                                if (!response.cancelled) {
                                    setImg(response?.path)
                                    CompressImg.compress(response?.path, { compressionMethod: 'auto', quality: 0.2 })
                                        .then((image: any) => {

                                            const imgs = image?.split('/')
                                            const filename = imgs[imgs?.length - 1].split('.')[0]
                                            setFiles({ uri: image, type: 'image/jpeg', name: filename + '-image.jpg' });
                                        }).catch((err: any) => { console.log(err) });
                                }
                            })
                            .catch((error) => { setError(error) });
                    }
                }).catch(err => { console.log(err) })

        setVisible(false)
    };

    const takePhoto = async () => {
        if (currentPage === 2)
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    const image = await ImageCropPicker.openCamera({ width: 300, height: 400, cropping: true, includeBase64: false })

                    setImg(image?.path)
                    const img = await CompressImg.compress(image?.path, { compressionMethod: 'auto', quality: 0.2 })
                    const imgs = image?.path?.split('/')
                    const filename = imgs[imgs?.length - 1].split('.')[0]

                    setFiles({ uri: img, type: 'image/jpeg', name: filename + '-image.jpg' });
                } else {
                    console.log('Permission refusée pour accéder à la caméra');
                }
            } catch (error) {
                console.log(error);
            }
        setVisible(false)
    };

    useEffect(() => {
        setInputs({ ...inputs, document: files })
        if (files && files !== null) setError({ document_error: '' })
    }, [files]);

    const openModal = () => {
        setVisible(!visible)
    }


    return (
        <components.commons.container style={css.auth.connexion.connexion_container}>
            {currentPage === 2 &&
                <Modal isVisible={visible} animationIn={"slideInUp"} animationOut={"bounceOut"} animationInTiming={500} animationOutTiming={1500} onBackdropPress={() => setVisible(false)}>
                    <View style={{ backgroundColor: colors.white, width: '100%', height: hp(25), borderRadius: 5 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5, paddingVertical: 10 }}>
                            <Text style={{ color: colors.black, fontSize: 20, fontFamily: roboto.bold }}>Options</Text>
                            <TouchableOpacity onPress={() => setVisible(false)} activeOpacity={0.8}><FontAwesome name="close" style={{ color: colors.black, fontSize: 20, marginRight: 10 }} /></TouchableOpacity>
                        </View>

                        <View style={{ gap: 5, flex: 1, alignContent: 'center', justifyContent: 'center', paddingHorizontal: 20 }}>
                            <TouchableOpacity onPress={takePhoto} activeOpacity={0.8} style={{ backgroundColor: colors.black, padding: 13, borderRadius: 5, }}><Text style={{ color: colors.white, textAlign: 'center', fontFamily: roboto.light }}>Prendre une photo</Text></TouchableOpacity>
                            <TouchableOpacity onPress={selectImage} activeOpacity={0.8} style={{ backgroundColor: colors.black, padding: 13, borderRadius: 5, }}><Text style={{ color: colors.white, textAlign: 'center', fontFamily: roboto.light }}>Choisir une photo</Text></TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            }
            <View style={css.auth.connexion.content}>
                <View style={css.auth.connexion.logobox}>
                    <Image source={images.logo_png} style={css.auth.connexion.logo} />
                </View>

                <View style={css.auth.connexion.textbox}>
                    <Text style={css.auth.connexion.title}>{inscription_screen.document.title}</Text>
                    <Text style={css.auth.connexion.description}>{inscription_screen.document.description}</Text>
                </View>
                <View style={css.auth.connexion.documentimgbox}>
                    <Image source={img ? { uri: img } : images.noimage} style={css.auth.connexion.documentimg} />
                    {error?.document_error !== '' &&
                        <View style={{ position: 'absolute', backgroundColor: colors.auth_icon, width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={[css.auth.connexion.errortext, { alignSelf: 'center' }]}>{error.document_error}</Text>
                        </View>
                    }
                </View>


                <View style={css.auth.connexion.inputbox}>
                    <View>
                        <TouchableOpacity onPress={() => openModal()} activeOpacity={0.8} style={[css.auth.connexion.documentbtn]}>
                            <Text style={css.auth.connexion.btntext}>{inscription_screen.document.nina}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => openModal()} activeOpacity={0.8} style={[css.auth.connexion.documentbtn]}>
                            <Text style={css.auth.connexion.btntext}>{inscription_screen.document.passport}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => openModal()} activeOpacity={0.8} style={[css.auth.connexion.documentbtn]}>
                            <Text style={css.auth.connexion.btntext}>{inscription_screen.document.cin}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            <View style={{ height: 60 }} />
        </components.commons.container>
    )
}

export default Document

