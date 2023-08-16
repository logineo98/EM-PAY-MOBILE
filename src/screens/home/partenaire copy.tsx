import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { components } from '../../components'
import { images } from '../../libs/constants/constants'
import { colors, height, roboto, width } from '../../libs/typography/typography'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

const SPRING_CONFIG = {
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
}

const Partenaire = () => {
    const top = useSharedValue(height)

    const gestureHandler = useAnimatedGestureHandler({
        onStart(_, context) {
            context.startTop = top.value
        },
        onActive(event, context) {
            if (top.value + event.translationY <= height / 2) {
                top.value = height / 2
            } else {
                top.value = context.startTop + event.translationY
            }
        }
    })

    const style = useAnimatedStyle(() => ({
        top: top.value
    }))

    const partenaires = [
        { id: '1', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '2', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '3', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '4', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '5', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '6', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '7', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '8', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '9', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
        { id: '10', logo: images.logo_png, name: 'Emploi et moi', description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam, animi.' },
    ]

    console.log(height, width)

    return (
        <components.commons.screen_container>
            <>
                <View style={styles.container}>
                    <ScrollView>
                        <Text style={styles.screen_title}>Partenaires</Text>

                        <View style={styles.partenaire_container}>
                            <TouchableOpacity activeOpacity={0.5} style={styles.partenaire} onPress={() => { top.value = withSpring(height / 2, SPRING_CONFIG) }}>
                                <View style={styles.partenaire_logo_name}>
                                    <View style={styles.partenaire_logo_container}>
                                        <Image source={images.logo_png} style={styles.partenaire_logo} />
                                    </View>
                                    <Text style={styles.partenaire_name} numberOfLines={1}>logineo</Text>
                                </View>
                                <Text style={styles.partenaire_description} numberOfLines={2}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero amet consectetur, expedita eaque neque ipsum unde eligendi excepturi tempore, inventore, temporibus dicta et laborum fugiat voluptatibus. Est porro ullam voluptatum?</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>

                <PanGestureHandler onGestureEvent={gestureHandler}>
                    <Animated.View style={[styles.animated_view_container, style]}  >
                        <ScrollView>
                            <View style={styles.detail_close_container}>
                                <Text style={styles.detail}>Détails</Text>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => { top.value = withSpring(height * 1, SPRING_CONFIG) }}>
                                    <MaterialCommunityIcons name='close' color={colors.black} size={30} style={styles.close} />
                                </TouchableOpacity>
                            </View>

                            <Text style={{ color: '#000', textAlign: 'justify' }}>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum dignissimos hic assumenda sequi, voluptatibus placeat cupiditate dolore natus ipsa animi labore suscipit? Iure harum illum expedita commodi deleniti ipsum ipsam!
                                Cum accusamus officia asperiores ipsam doloremque ut voluptas vero harum qui sit tenetur maxime suscipit, architecto, neque est, laudantium quas accusantium nisi nulla. Cum aliquid nostrum quos itaque esse beatae.
                                Sequi suscipit aliquid molestiae consectetur fugiat omnis deserunt repellendus, vitae necessitatibus culpa provident totam rem tenetur unde voluptate, accusamus, maxime in. Eum voluptatem quae dignissimos temporibus aliquam placeat. Ducimus, vitae.
                                Temporibus harum quaerat ipsa neque nisi officiis dolorum nemo quas exercitationem, amet id, aperiam ratione voluptatibus, autem debitis. Praesentium soluta culpa modi distinctio velit at, error sapiente unde temporibus quae?
                                Consequuntur et vel vitae. Perferendis distinctio quasi id suscipit. Ea qui cum laboriosam amet quibusdam deserunt aperiam quam dolor saepe? Pariatur libero culpa, eum rerum quaerat iusto ad ipsam ex.
                                Incidunt necessitatibus assumenda voluptatem perferendis magni laboriosam deleniti illum facere perspiciatis consectetur ipsum minus enim aut tenetur et quo voluptate architecto suscipit, odio excepturi, temporibus rerum quidem. Quaerat, aliquid eum.
                                Id animi non molestias repellat debitis odio, quo consectetur ducimus laboriosam sint, culpa distinctio libero possimus a. Eos magnam officiis provident animi magni dolor ipsum minus, commodi delectus iusto sequi!
                                Quisquam magni nobis aperiam ab maxime cumque doloremque amet fugiat officia natus, porro error iusto ratione omnis quas est laboriosam sint, nesciunt eos veniam suscipit ipsam sapiente, fugit animi? Iste.
                                Impedit reiciendis odio amet facere alias consequatur hic porro repudiandae, in iure rem magni quas quidem, dolorum ut minus velit mollitia. Magni vero animi molestiae quo esse cupiditate dicta aperiam.
                                Dolor necessitatibus dolorem culpa itaque animi unde iure asperiores, aut voluptatem quidem laudantium quam natus aspernatur maiores tenetur illum? Itaque, culpa consequuntur! Pariatur illum sunt corporis, soluta neque quidem unde!
                                Inventore modi dolorum soluta recusandae, iusto officia, necessitatibus nulla ipsum error quia voluptatum harum nihil ad consequuntur voluptatem magnam veritatis alias! Odio, earum expedita deleniti porro facilis alias harum culpa?
                                Incidunt necessitatibus dolorem quisquam possimus delectus dolore ad totam dolores ut veniam inventore minus tempora dolor odit id cum provident, magni itaque quis at architecto aperiam aspernatur aliquam natus! Distinctio.
                                Assumenda quaerat, nobis at itaque repellat totam ratione, consequuntur perspiciatis fugit, ipsum optio rem qui voluptatibus. Quod porro eos officiis doloremque officia dolores quisquam nostrum culpa! Doloremque ex ut corporis.
                                Non architecto ex cumque nihil qui. Cupiditate consectetur quia sed exercitationem facere ut iusto facilis reprehenderit recusandae quos fuga nobis nulla ipsa enim, explicabo pariatur labore est saepe placeat. Optio?
                                Eum ipsam recusandae totam? Ad ducimus quibusdam itaque tenetur vitae, sit corrupti! Doloremque tempore, delectus commodi repudiandae vero reprehenderit quibusdam ab magnam facilis. Harum possimus exercitationem rem aut odio id?
                                Voluptas fuga laborum eveniet corrupti, officiis provident, nemo quis est animi molestiae perspiciatis sequi ad ab totam tempora quod architecto ex natus ipsa fugiat ducimus tempore modi consectetur. Perferendis, eligendi?
                                In sit quaerat quos vel tempore nesciunt temporibus quisquam rem corporis similique esse error dolor et ducimus assumenda expedita, quia consectetur porro? Ratione sequi officiis perferendis a corporis nesciunt consequatur.
                                Expedita ex accusamus earum omnis soluta perferendis ab, ea non consectetur quas totam ullam fuga labore itaque deleniti commodi error velit recusandae atque! Possimus, reiciendis ipsum. Sapiente non vel dolores.
                                Ex, enim. Maxime, soluta quam similique voluptatibus voluptatum iure magnam atque illo. Doloribus maiores at, expedita laudantium consequatur neque eveniet, quas explicabo, incidunt cupiditate fugiat quaerat. Facere nam aliquam nulla.
                                Inventore, molestias. Similique, accusamus officia nostrum nobis corporis, officiis delectus voluptas rem ducimus eius vel, nulla sequi deserunt iste vitae in eos voluptatum veritatis! Doloribus quas labore vitae officia nostrum?
                            </Text>
                        </ScrollView>
                    </Animated.View>
                </PanGestureHandler>
            </>
        </components.commons.screen_container>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, },

    screen_title: { color: colors.black, fontFamily: roboto.black, fontSize: 25, textAlign: 'center', marginBottom: 10, },

    partenaire_container: {},
    partenaire: { backgroundColor: colors.white, padding: 10, borderWidth: 1, borderColor: colors.fond1, borderRadius: 10 },
    partenaire_logo_name: { flexDirection: 'row', alignItems: 'center', },
    partenaire_logo_container: { height: width * 0.17, width: width * 0.17, },
    partenaire_logo: { height: '100%', width: '100%', resizeMode: 'cover', },
    partenaire_name: { color: colors.black, fontFamily: roboto.black, marginLeft: 10, textTransform: 'capitalize' },
    partenaire_description: { color: colors.black, fontFamily: roboto.regular, textAlign: 'justify', },

    animated_view_container: {
        backgroundColor: colors.white,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 5,
        padding: 15,
    },

    detail_close_container: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, },
    detail: { color: colors.black, fontFamily: roboto.black, },
    close: { color: colors.black, fontFamily: roboto.black, },
})

export default Partenaire