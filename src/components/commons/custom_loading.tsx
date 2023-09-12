import { ActivityIndicator, StyleSheet, Text, View } from "react-native"
import { colors, wp } from "../../libs/typography/typography"

const CustomLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.fond1} />
            <View style={styles.txtbox}>
                <Text style={styles.text}>Veuillez patienter pendant le chargement des données.</Text>
                <Text style={styles.text}>Merci</Text>
            </View>
        </View>
    )
}

export default CustomLoader

const styles = StyleSheet.create({
    container: { flex: 1, alignContent: "center", justifyContent: "center", width: wp(100) },
    txtbox: { alignItems: 'center', justifyContent: 'center', },
    text: { fontSize: 12, color: colors.fond1 },
})