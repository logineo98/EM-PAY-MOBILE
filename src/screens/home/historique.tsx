import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { components } from '../../components'
import { colors, roboto } from '../../libs/typography/typography'

const Historique = () => {

    const initial_choose = { retrait: true, achat: false, recharge: false }

    const [choose, setChoose] = useState(initial_choose)

    const historique_retrait = [
        { id: '1', price: 50000 },
        { id: '2', price: 50000 },
        { id: '3', price: 50000 },
        { id: '4', price: 50000 },
        { id: '5', price: 50000 },
    ]

    const historique_achat = [
        { id: '1', price: 80000 },
        { id: '2', price: 80000 },
        { id: '3', price: 80000 },
        { id: '4', price: 80000 },
        { id: '5', price: 80000 },
    ]

    const historique_recharge = [
        { id: '1', price: 25000 },
        { id: '2', price: 25000 },
        { id: '3', price: 25000 },
        { id: '4', price: 25000 },
        { id: '5', price: 25000 },
    ]

    return (
        <components.commons.screen_container title='Historiques'>
            <>
                <View style={styles.menu_container}>
                    <TouchableOpacity style={[styles.menu, { backgroundColor: choose.retrait ? colors.fond1 : colors.black }]} activeOpacity={0.5} onPress={() => setChoose({ retrait: true, achat: false, recharge: false })}>
                        <Text style={styles.menu_name}>Retrait</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.menu, { backgroundColor: choose.achat ? colors.fond1 : colors.black }]} activeOpacity={0.5} onPress={() => setChoose({ retrait: false, achat: true, recharge: false })}>
                        <Text style={styles.menu_name}>Achat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.menu, { backgroundColor: choose.recharge ? colors.fond1 : colors.black }]} activeOpacity={0.5} onPress={() => setChoose({ retrait: false, achat: false, recharge: true })}>
                        <Text style={styles.menu_name}>Recharge</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.menu_selected}>{choose.retrait ? 'Retrait' : choose.achat ? 'Achat' : choose.recharge && 'Recharge'}</Text>

                {choose.retrait &&
                    <FlatList
                        data={historique_retrait}
                        renderItem={({ item }) => <components.cards.historique_card price={item.price} />}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                    />
                }

                {choose.achat &&
                    <FlatList
                        data={historique_achat}
                        renderItem={({ item }) => <components.cards.historique_card price={item.price} />}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                    />
                }

                {choose.recharge &&
                    <FlatList
                        data={historique_recharge}
                        renderItem={({ item }) => <components.cards.historique_card price={item.price} />}
                        keyExtractor={item => item.id}
                        showsHorizontalScrollIndicator={false}
                    />
                }
            </>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    menu_container: { backgroundColor: colors.white, padding: 10, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', },
    menu: { width: '30%', padding: 5, borderRadius: 5, },
    menu_name: { color: colors.white, fontFamily: roboto.regular, textAlign: 'center', },

    menu_selected: { color: colors.black, fontFamily: roboto.black, textTransform: 'uppercase', marginVertical: 10, },

})

export default Historique