import CustomDrawerContent from "./cards/drawer/customDrawerContent";
import FactureCard from "./cards/facture/facture_card";
import PartenaireCard from "./cards/partenaire/partenaire_card";
import TarifCard from "./cards/tarif/tarif_card";
import Container from "./commons/container";
import CustomRadioButton from "./commons/custom_radio_button";
import Header from "./commons/header/header";
import ScreenContainer from "./commons/tz/screen_container";
import HistoriqueCard from "./historique/historique_card";

export const components = {
    commons: {
        header: Header,
        screen_container: ScreenContainer,
        container: Container,
        radio: CustomRadioButton,
    },
    cards: {
        customDrawerContent: CustomDrawerContent,
        partenaire_card: PartenaireCard,
        tarif_card: TarifCard,
        facture_card: FactureCard,
        historique_card: HistoriqueCard,
    }
}