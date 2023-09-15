import { error_partner, get_all_partners, loading_partner } from "./partner.constant";
import { INITIAL_PARTNER_STATE_TYPE } from "./partner.model";

const initialState: INITIAL_PARTNER_STATE_TYPE = {
    partner: null,
    allPartners: [],
    loadingPartner: false,
    error: null
}

interface IAction { type: string, payload: any }

const partnerReducer = (state = initialState, action: IAction): INITIAL_PARTNER_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case loading_partner:
            return { ...state, loadingPartner: true }

        case error_partner:
            return { ...state, error: payload, loadingPartner: false }

        case get_all_partners:
            return { ...state, allPartners: payload, loadingPartner: false, error: null }

        default: return state
    }
}

export default partnerReducer