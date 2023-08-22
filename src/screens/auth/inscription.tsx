import { FlatList, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { height, hp, width, wp } from '../../libs/typography/typography';
import InscriptionPages from './sub_inscription/_index';
import { userModel } from '../../libs/services/user/user.model';

const Inscription = () => {
    const flatListRef = useRef<any>(null);
    const scrollViewRef = useRef<any>(null);
    const inscription_init: userModel = { phone: "", name: "", firstname: "", address: "", email: "", account: "", profil: "", document: { nina: '', passport: '', cin: '' }, password: "", confirm: "", birthday: "", signature: '' }
    const [inputs, setInputs] = useState(inscription_init);
    const states = { inputs, setInputs }
    const [currentPage, setCurrentPage] = useState(0);
    const numPages = 7;


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
                style={{ height: hp(100) }}
                ref={flatListRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={"handled"}
                pagingEnabled
                scrollEnabled={false}
                data={Array.from({ length: numPages })}
                renderItem={({ item, index }) => <InscriptionPages states={states} index={index} currentPage={currentPage} prev={prev} next={next} />}
                keyExtractor={(item, index) => index.toString()}
                onMomentumScrollEnd={(event) => {
                    const newIndex = Math.round(event.nativeEvent.contentOffset.x / wp('100%'));
                    setCurrentPage(newIndex);
                }}
            />
        </ScrollView>
    )
}

export default Inscription




