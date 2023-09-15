import axios from 'axios'
import { error_partner, get_all_partners, loading_partner } from './partner.constant'
import { _end_point, get_credentials } from '../endpoints'
import { debug } from '../../constants/utils'

const loadingPartner = () => (dispatch: any) => {
    dispatch({ type: loading_partner })
}

const errorPartner = (payload: any) => (dispatch: any) => {
    dispatch({ type: error_partner, payload })
}

export const getAllPartners = () => async (dispatch: any) => {
    try {
        dispatch(loadingPartner())

        let token = await get_credentials('accessToken')

        const response = await axios.get(`${_end_point.partenaire.find}`, { headers: { Authorization: `Bearer ${token}` } })

        dispatch({ type: get_all_partners, payload: response.data })
    } catch (error: any) {
        debug('GET ALL PARTNERS', error?.response?.data || error.message)
        dispatch(errorPartner(error?.response?.data))
    }
}