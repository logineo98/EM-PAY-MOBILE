import CustomDrawerContent from "./cards/drawer/customDrawerContent";
import PartenaireCard from "./cards/partenaire/partenaire_card";
import Header from "./commons/header/header";
import ScreenContainer from "./commons/tz/screen_container";

export const components = {
    commons: {
        header: Header,
        screen_container: ScreenContainer
    },
    cards: {
        customDrawerContent: CustomDrawerContent,
        partenaire_card: PartenaireCard,
    }
}