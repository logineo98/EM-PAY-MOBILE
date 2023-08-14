import Login from "./auth/login";
import Geolocalisation from "./bottom_nav_screens/geolocalisation";
import Historique from "./bottom_nav_screens/historique";
import ServiceClient from "./bottom_nav_screens/service_client";
import APropos from "./others/a_propos";
import Facture from "./others/facture";
import home from "./home/home";
import IkaWariTaa from "./others/ika_wari_taa";
import Partenaires from "./others/partenaires";
import Recharge from "./others/recharge";
import Tarifs from "./others/tarifs";

export const Screens = {
    geolocalisation: Geolocalisation,
    historique: Historique,
    serviceClient: ServiceClient,

    Others: {
        a_propos: APropos,
        tarifs: Tarifs,
        partenaire: Partenaires
    },
    Auth: {
        login: Login
    },
    Home: {
        home: home,
        facture: Facture,
        recharge: Recharge,
        ika_wari_taa: IkaWariTaa,
    }

}