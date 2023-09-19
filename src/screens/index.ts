import Connexion from "./auth/connexion";
import Inscription from "./auth/inscription";
import Welcome from "./auth/welcome";
import Geolocalisation from "./home/geolocalisation";
import APropos from "./home/a_propos";
import Facture from "./home/facture";
import Home from "./home/home";
import IkaWariTaa from "./home/ika_wari_taa";
import Partenaires from "./home/partenaire";
import Recharge from "./home/recharge";
import Status from "./home/status";
import Tarif from "./home/tarif";
import Historique from "./home/historique";
import ServiceClient from "./home/service_client";
import IkaWariTaaStatus from "./home/ika_wari_taa_status";

export const Screens = {
    Auth: {
        welcome: Welcome,
        login: Connexion,
        inscription: Inscription,
    },
    Home: {
        home: Home,
        facture: Facture,
        recharge: Recharge,
        ika_wari_taa: IkaWariTaa,
        ika_wari_taa_status: IkaWariTaaStatus,
        a_propos: APropos,
        tarif: Tarif,
        partenaire: Partenaires,
        status: Status,
        geolocalisation: Geolocalisation,
        historique: Historique,
        serviceClient: ServiceClient,
    }

}