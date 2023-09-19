import { error_tarif, get_all_tarifs, loading_tarif } from './tarif.constant'
import { INITIAL_TARIF_STATE_TYPE } from './tarif.model'

interface IAction { type: string, payload: any }

const initialState: INITIAL_TARIF_STATE_TYPE = {
    tarif: null,
    allTarifs: [],
    loadingTarif: false,
    error: null
}

const tarifReducer = (state = initialState, action: IAction): INITIAL_TARIF_STATE_TYPE => {
    const { type, payload } = action

    switch (type) {
        case loading_tarif:
            return { ...state, loadingTarif: true }

        case error_tarif:
            return { ...state, error: payload, loadingTarif: false }

        case get_all_tarifs:
            return { ...state, allTarifs: payload, loadingTarif: false, error: null }

        default: return state
    }
}

export default tarifReducer