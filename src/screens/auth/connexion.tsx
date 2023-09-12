import { FlatList, ScrollView, } from 'react-native'
import React, { FC, useEffect, useRef, useState } from 'react'
import { height, hp, width, wp } from '../../libs/typography/typography'
import ConnexionPages from './sub_connexion/_index'
import { userModel } from '../../libs/services/user/user.model'


type props = { navigation: any }
const Connexion: FC<props> = () => {
    const [connexionInputs, setConnexionInputs] = useState<userModel>({ phone: '', password: '' });
    const [forgotInputs, setForgotInputs] = useState<userModel>({ phone: '' });
    const [verifyInputs, setVerifyInputs] = useState('');
    const [resetInputs, setResetInputs] = useState<userModel>({ password: '', confirm: '' });
    const props = { connexionInputs, setConnexionInputs, forgotInputs, setForgotInputs, verifyInputs, setVerifyInputs, resetInputs, setResetInputs }
    const flatListRef = useRef<any>(null);
    const scrollViewRef = useRef<any>(null);
    const [currentPage, setCurrentPage] = useState(0);
    const numPages = 4;


    useEffect(() => { scrollViewRef.current.scrollToEnd({ animated: true }); }, [currentPage]);

    const next = () => {
        if (flatListRef.current && currentPage < numPages - 1) {
            flatListRef.current.scrollToIndex({ index: currentPage + 1, animated: true });
            setCurrentPage(currentPage + 1);
        }
    };

    const prev = () => {
        if (flatListRef.current && currentPage > 0) {
            flatListRef.current.scrollToIndex({ index: currentPage - 1, animated: true });
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <ScrollView ref={scrollViewRef} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <FlatList
                style={{ height: hp('100%') }}
                ref={flatListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={"handled"}
                pagingEnabled
                scrollEnabled={false}
                data={Array.from({ length: numPages })}
                renderItem={({ item, index }) => <ConnexionPages states={props} index={index} currentPage={currentPage} prev={prev} next={next} />}
                keyExtractor={(item, index) => index.toString()}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / wp('100%'));
                    setCurrentPage(newIndex);
                }}
            />
        </ScrollView>
    )
}

export default Connexion

