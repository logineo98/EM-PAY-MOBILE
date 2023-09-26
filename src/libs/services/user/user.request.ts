import { userModel } from "./user.model";
import { connexion_screen } from "../../i18n/fr.FR.json"

/****************************CONNEXION*********************************** */
export const connexion_request = (toStore: userModel) => {
    let error = { login_phone_error: '', login_password_error: '' }

    if (!toStore.phone || toStore.phone === "") error = { login_phone_error: connexion_screen.errors.phone_field_empty, login_password_error: '' }
    if (!toStore.password || toStore.password === "") error = { ...error, login_password_error: connexion_screen.errors.password_field_empty }
    else if (toStore.password.length < 6) error = { login_phone_error: '', login_password_error: connexion_screen.errors.incorrect }
    return error;
}

export const forgot_request = (toStore: userModel) => {
    let error = { forgot_phone_error: '' }

    if (!toStore.phone || toStore.phone === "") error = { forgot_phone_error: connexion_screen.errors.phone_field_empty }
    return error;
}

export const verify_request = (code: string, size: number) => {
    let error = { verify_phone_error: '' }

    if (!code || code === "") error = { verify_phone_error: connexion_screen.errors.phone_field_empty }
    if (code && code?.length < size) error = { verify_phone_error: connexion_screen.errors.phone_field_empty }
    return error;
}

export const reset_request = (toStore: userModel) => {

    let error = { reset_password_error: '', reset_confirm_error: '' }
    if (!toStore.password || toStore.password === "") error = { reset_password_error: connexion_screen.errors.password_field_empty, reset_confirm_error: '' }
    if (toStore.password && toStore.password.length < 6) error = { reset_password_error: connexion_screen.errors.incorrect, reset_confirm_error: connexion_screen.errors.incorrect }
    if (toStore.password !== toStore.confirm) error = { reset_password_error: connexion_screen.errors.incorrect, reset_confirm_error: connexion_screen.errors.incorrect }
    return error;
}

/****************************INSCRIPTION*********************************** */

export const inscription_inputs_request = (type: string, toStore: userModel) => {
    var errors = { phone_error: '', name_error: '', firstname_error: '', birth_error: '', address_error: '', email_error: '', document_error: '', profil_error: '', signature_error: '', password_error: '', confirm_error: '' }
    switch (type) {
        case "infos":
            if (!toStore.phone || toStore.phone === "") errors = { ...errors, phone_error: connexion_screen.errors.password_field_empty }
            if (!toStore.name || toStore.name === "") errors = { ...errors, name_error: connexion_screen.errors.incorrect, }
            if (!toStore.firstname || toStore.firstname === "") errors = { ...errors, firstname_error: connexion_screen.errors.incorrect, }
            if (!toStore.birthday || toStore.birthday === null) errors = { ...errors, birth_error: connexion_screen.errors.incorrect, }
            return errors

        case "account":
            if (!toStore.address || toStore.address === "") errors = { ...errors, address_error: connexion_screen.errors.password_field_empty }
            if (!toStore.email || toStore.email === "") errors = { ...errors, email_error: connexion_screen.errors.incorrect, }
            return errors

        case "document":
            if (!toStore.document || toStore.document === "")
                errors = { ...errors, document_error: connexion_screen.errors.password_field_empty }
            return errors

        case "selfie":
            if (!toStore.profil || toStore.profil === "") errors = { ...errors, profil_error: connexion_screen.errors.password_field_empty }
            return errors


        case "signature":
            if (!toStore.signature || toStore.signature === null) errors = { ...errors, signature_error: connexion_screen.errors.password_field_empty }
            return errors

        case "reset":
            if (!toStore.password || toStore.password === "") errors = { ...errors, password_error: connexion_screen.errors.password_field_empty }
            if (!toStore.confirm || toStore.confirm === "") errors = { ...errors, confirm_error: connexion_screen.errors.incorrect, }
            else if (toStore.password && toStore.password.length < 6) errors = { ...errors, confirm_error: connexion_screen.errors.incorrect, }
            return errors

        default: return errors
    }
}

/****************************STATUT GEOLOCALISATION*********************************** */
export const status_geo_montant_request = (montant: string) => {
    const initialError = { montant: '' }
    let error = initialError

    if (!montant || montant.trim() === '') error = { ...error, montant: 'Veuillez renseigner le montant.' }
    else if (parseInt(montant, 10) < 500) error = { ...error, montant: 'Montant doit être superieur à 500 FCFA.' }

    return { error, initialError }
}

/****************************VITEPAY VALIDATION DATA*********************************** */
export const vitepay_data_validation = (data: { phone: string, montant: string }) => {
    const { phone, montant } = data
    const phone_regex = /^[789][0-9]{7}$/

    const initialError = { phone: '', montant: '' }
    let error = initialError

    if (!phone || phone.trim() === '') error = { ...error, phone: 'Veuillez renseigner le champ.' }
    else if (!phone_regex.test(phone)) error = { ...error, phone: 'Doit être un numéro ORANGE.' }

    if (!montant || montant.trim() === '') error = { ...error, montant: 'Veuillez renseigner le champ.' }
    else if (parseInt(montant, 10) < 500) error = { ...error, montant: 'Montant doit être superieur à 500 FCFA.' }

    return { error, initialError }
}