import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { colors, wp } from '../../libs/typography/typography'
import { FC } from 'react'

type COMPONENT_TYPE = {
    title?: string
}

const CustomLoader: FC<COMPONENT_TYPE> = ({ title }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size='large' color={colors.fond1} />
            <View style={styles.txtbox}>
                {title &&
                    <>
                        <Text style={styles.text}> {title} </Text>
                        <Text style={styles.text}>Merci</Text>
                    </>
                }
            </View>
        </View>
    )
}

export default CustomLoader

const styles = StyleSheet.create({
    container: { flex: 1, alignContent: 'center', justifyContent: 'center', width: wp(100) },
    txtbox: { alignItems: 'center', justifyContent: 'center', },
    text: { fontSize: 12, color: colors.fond1 },
})