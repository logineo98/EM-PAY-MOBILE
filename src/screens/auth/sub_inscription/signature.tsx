import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableHighlight, } from 'react-native';
import SignatureCapture from 'react-native-signature-capture';
import { colors, roboto } from '../../../libs/typography/typography';
import { components } from '../../../components';
import { inscription_screen } from '../../../libs/i18n/fr.FR.json'
import { CheckBox } from 'react-native-elements';
import { css } from '../../../libs/styles/styles';
import { userModel } from '../../../libs/services/user/user.model';


type props = { index?: number, currentPage?: number, error?: { signature_error?: string, }, inputs: userModel, setError?: any, setInputs: any }
const Signature: FC<props> = ({ index, error, currentPage, inputs, setInputs }) => {
    const signatureRef = useRef<any>();
    const [sign, setSign] = useState<any>('');
    const [isChecked, setIsChecked] = useState(false);

    const resetSign = () => { signatureRef.current.resetImage(); setInputs({ ...inputs, signature: '' }) };
    const _onSaveEvent = (result: any) => { setSign(result?.pathName); };
    const _onDragEvent = () => { setSign(signatureRef.current.saveImage()) };

    useEffect(() => {
        if (sign === "") setInputs({ ...inputs, signature: "" })
        setInputs({ ...inputs, signature: sign })
    }, [sign]);


    return (
        <components.commons.container style={css.auth.connexion.connexion_container}>
            <View style={css.auth.connexion.textbox}>
                <Text style={css.auth.connexion.title}>{inscription_screen.identity.signature.title}</Text>
                <Text style={css.auth.connexion.description}>{inscription_screen.identity.signature.description}</Text>
                <Text style={[css.auth.connexion.errortext, { alignSelf: "center" }]}>{error?.signature_error}</Text>
            </View>

            <View style={css.auth.connexion.signaturebox}>
                <View style={css.auth.connexion.signaturezone}>
                    <SignatureCapture
                        style={[css.auth.connexion.signature]}
                        ref={signatureRef}
                        onSaveEvent={_onSaveEvent}
                        onDragEvent={_onDragEvent}
                        saveImageFileInExtStorage={false}
                        showNativeButtons={false}
                        showTitleLabel={false}

                        viewMode={"portrait"} />


                    <View style={{ flexDirection: "row", justifyContent: 'space-around', gap: 3, marginTop: 10 }}>
                        <TouchableHighlight style={css.auth.connexion.buttonStyle} onPress={resetSign}>
                            <Text style={css.auth.connexion.signaturebtn}>Effacer</Text>
                        </TouchableHighlight>
                    </View>

                </View>


            </View>
            <View>
                <CheckBox title={<Text style={{ color: colors.black, fontFamily: roboto.light }}>{inscription_screen.identity.signature.authorize}</Text>} checked={isChecked} onPress={() => setIsChecked(!isChecked)} />
            </View>


        </components.commons.container>

    );
};


export default Signature;

