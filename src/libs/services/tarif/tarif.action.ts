import axios from 'axios'
import { _end_point, get_credentials } from '../endpoints'
import { error_tarif, get_all_tarifs, loading_tarif } from './tarif.constant'
import { debug } from '../../constants/utils'

const loadingTarif = () => (dispatch: any) => {
    dispatch({ type: loading_tarif })
}

const errorTarif = (payload: any) => (dispatch: any) => {
    dispatch({ type: error_tarif, payload })
}

export const getAllTarifs = () => async (dispatch: any) => {
    try {
        dispatch(loadingTarif())

        let token = await get_credentials('accessToken')

        const response = await axios.get(`${_end_point.tarif.find}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: get_all_tarifs, payload: response.data })
    } catch (error: any) {
        debug('GET ALL TARIFS', error?.response?.data || error.message)
        dispatch(errorTarif(error?.response?.data))
    }
}