import CustomDrawerContent from "./cards/drawer/customDrawerContent";
import FactureCard from "./cards/facture/facture_card";
import PartenaireCard from "./cards/partenaire/partenaire_card";
import TarifCard from "./cards/tarif/tarif_card";
import Header from "./commons/header/header";
import ScreenContainer from "./commons/tz/screen_container";
import HistoriqueCard from "./historique/historique_card";

export const components = {
    commons: {
        header: Header,
        screen_container: ScreenContainer
    },
    cards: {
        customDrawerContent: CustomDrawerContent,
        partenaire_card: PartenaireCard,
        tarif_card: TarifCard,
        facture_card: FactureCard,
        historique_card: HistoriqueCard,
    }
}