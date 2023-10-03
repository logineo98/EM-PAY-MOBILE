import { ActivityIndicator, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import { colors } from '../../libs/typography/typography'
import { FC } from 'react'

type COMPONENT_TYPE = {
    title?: string, op?: number
}

const CustomLoader: FC<COMPONENT_TYPE> = ({ title, op }) => {
    const { width } = useWindowDimensions()
    return (
        <View style={[styles.container, { width, opacity: op || 1 }]}>
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
    container: { flex: 1, alignContent: 'center', justifyContent: 'center' },
    txtbox: { alignItems: 'center', justifyContent: 'center', },
    text: { fontSize: 12, color: colors.fond1 },
})