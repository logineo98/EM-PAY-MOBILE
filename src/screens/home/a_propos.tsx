import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { components } from '../../components'
import { colors, roboto, width } from '../../libs/typography/typography'
import { images } from '../../libs/constants/constants'

const APropos = () => {

    return (
        <components.commons.screen_container title='A Propos'>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View style={styles.logo_container}>
                    <Image source={images.logo_png} style={styles.logo} />
                </View>

                <Text style={styles.a_propos_text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias quae sed doloremque quasi aliquid nisi excepturi aspernatur ratione id ex, nihil illum maiores ipsum corporis, omnis, fugit ea facilis vel!
                    Pariatur nemo accusantium qui fugiat reprehenderit nihil porro quidem sint velit! Fugiat natus at vitae! Voluptatum nesciunt quo animi nulla pariatur velit cupiditate tenetur, qui vel sapiente nobis a rerum.
                    Consectetur fugiat beatae delectus voluptatum, impedit voluptates nam incidunt facere nesciunt nihil repudiandae officia quia iusto explicabo, quod corrupti, commodi atque sint! Dolores sint placeat excepturi nobis dolor, natus voluptatem.
                    Aperiam fuga pariatur, enim accusantium architecto hic libero expedita molestiae in possimus vel, perspiciatis saepe minima dolore ipsum at soluta vero nostrum amet deserunt! Aspernatur beatae numquam aperiam nulla explicabo.
                    Repellendus quas eveniet aspernatur, quibusdam distinctio est maiores modi praesentium ad, natus nulla, quisquam iure. Fugiat ducimus modi consequatur quis? Labore mollitia architecto magni ea aut exercitationem dignissimos suscipit voluptate.
                    Nihil iure, doloribus debitis dolores cupiditate id, reprehenderit maiores totam ipsam necessitatibus molestiae eius doloremque labore in autem suscipit odio. Accusamus, corrupti? Aliquid autem, iusto harum facere esse perspiciatis nesciunt.
                    Ut soluta dolore, ullam commodi laborum illum nemo exercitationem quas nulla quia vitae consectetur dolor corporis deleniti cupiditate eius optio iure animi quo eaque earum. Odit neque exercitationem fugit dignissimos?
                    Obcaecati nobis eum nulla temporibus odit minus tempore atque repellendus. Cupiditate natus dolores soluta amet ipsam, corrupti expedita assumenda sed? Illo alias, sequi repellendus perspiciatis quas quos possimus nisi suscipit?
                    Tenetur fuga dolor explicabo veniam odit suscipit eius asperiores, quas praesentium corporis qui deserunt libero iusto necessitatibus cupiditate esse ipsum, nostrum natus ipsa omnis? Ut asperiores soluta nobis nemo voluptate.
                    Ab earum impedit consectetur tenetur ea incidunt rerum amet! Fugit velit ratione, nihil cum ipsam, delectus accusantium vero veniam quod ullam, pariatur sapiente! Sapiente magni quia debitis provident consequatur fuga.
                </Text>
            </ScrollView>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    logo_container: { alignItems: 'center' },
    logo: { height: width * 0.30, width: width * 0.30, resizeMode: 'contain', },

    a_propos_text: { color: colors.black, fontFamily: roboto.regular, textAlign: 'justify', },
})

export default APropos