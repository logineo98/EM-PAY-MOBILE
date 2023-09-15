export type coordinateType = { la: string; lo: string }

export type statusGeoMontantType = { id?: string, la: string; lo: string; montant: string, disable?: boolean }

export type userModel = {
    id?: string
    phone?: string
    name?: string
    firstname?: string
    address?: string
    code?: string
    email?: string
    account?: string
    profil?: string
    document?: ""
    password?: string
    confirm?: string
    birthday?: Date
    signature?: any
    montant?: string
    coordinates?: coordinateType
}

export type userStore = {
    user_loading: boolean
    user_errors: string | any
    user?: userModel | null
    allUsers?: userModel[]
    host?: userModel | null
    tmp?: boolean
    info?: string | null
    data?: any
    qr_code?: string
    scan_response?: string
}

export type scanModel = {
    beneficiareID: string
    titulaireID: string
    titulairePhone: string
    montantBeneficiaire: string
}