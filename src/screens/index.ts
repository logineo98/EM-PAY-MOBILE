import Login from "./auth/login";
import Geolocalisation from "./bottom_nav_screens/geolocalisation";
import Historique from "./bottom_nav_screens/historique";
import ServiceClient from "./bottom_nav_screens/service_client";
import APropos from "./home/a_propos";
import Facture from "./home/facture";
import Home from "./home/home";
import IkaWariTaa from "./home/ika_wari_taa";
import Partenaires from "./home/partenaire";
import Recharge from "./home/recharge";
import Status from "./home/status";
import Tarif from "./home/tarif";

export const Screens = {
    geolocalisation: Geolocalisation,
    historique: Historique,
    serviceClient: ServiceClient,

    Others: {},
    Auth: {
        login: Login
    },
    Home: {
        home: Home,
        facture: Facture,
        recharge: Recharge,
        ika_wari_taa: IkaWariTaa,
        a_propos: APropos,
        tarif: Tarif,
        partenaire: Partenaires,
        status: Status,
    }

}