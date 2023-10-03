import Welcome from "./_auth/welcome";
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
import Login from "./_auth/login/login";
import ForgotPassword from "./_auth/login/forgot_password";
import VerifyForgotPassword from "./_auth/login/verify_forgot_password";
import ResetPassword from "./_auth/login/reset_password";
import Infos from "./_auth/register/infos";
import Account from "./_auth/register/account";
import Activation from "./_auth/register/activation";
import Document from "./_auth/register/document";
import Finalisation from "./_auth/register/finalisation";
import Photo from "./_auth/register/photo";
import Signature from "./_auth/register/signature";

export const Screens = {
    Auth: {
        welcome: Welcome,
        login: Login,
        forgot: ForgotPassword,
        verify: VerifyForgotPassword,
        reset: ResetPassword,
        infos: Infos,
        account: Account,
        activation: Activation,
        document: Document,
        finalisation: Finalisation,
        photo: Photo,
        signature: Signature
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