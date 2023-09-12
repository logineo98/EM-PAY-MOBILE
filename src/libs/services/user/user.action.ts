import axios from "axios"
import { logger } from "../../constants/constants"
import { userModel } from "./user.model"
import { _end_point, get_credentials } from "../endpoints"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { user_errors, user_forgot_success, user_loading, user_login_success, user_logout_success, user_register_success, user_reset_success, user_verify_success } from "./user.constant"
import { Expired, debug } from "../../constants/utils"


export const checking = () => async (dispatch: any) => {
    dispatch({ type: 'user_loading' })

    const expiresIn = await get_credentials('expiresIn')
    let token = await get_credentials('accessToken');

    if ((!expiresIn || expiresIn === '') && (!token || token === '')) {
        dispatch(logout()); return;
    }

    if (expiresIn !== '' && token !== '') {
        if (!Expired(parseInt(expiresIn))) {
            dispatch(profile())
        } else dispatch(logout());
    }
}

const profile = () => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })
        const usr = await get_credentials('usr')
        // const config = { headers: { Authorization: `Bearer ${token}` } }

        dispatch({ type: user_login_success, payload: { usr } })
    } catch (err: any) {
        dispatch(logout());
    }
}

export const authentification = (data: userModel) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        const res = await axios.post(_end_point.customer.login, data)
        await AsyncStorage.setItem('credentials', JSON.stringify(res.data))

        dispatch({ type: user_login_success, payload: res.data })
    } catch (error: any) {
        debug("USER LOGIN ACTION", error?.response?.data || error.message)
        dispatch({ type: user_errors, payload: error?.response?.data })
    }
}

export const logout = () => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        await AsyncStorage.removeItem('credentials')
        dispatch({ type: user_logout_success });
    } catch (error: any) {
        debug("USER LOGOUT ACTION", error?.response?.data || error.message)
        dispatch({ type: user_errors, payload: error.message || error })
    }
}

export const forgot_password = (data: userModel) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })
        const res = await axios.post(_end_point.customer.forgot, data)

        dispatch({ type: user_forgot_success, payload: res.data })
    } catch (error: any) {
        debug("USER FORGOT PASSWORD ACTION", error?.response?.data || error.message)
        dispatch({ type: user_errors, payload: error?.response?.data })
    }
}

export const forgot_verify = (data: userModel) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })
        const res = await axios.post(_end_point.customer.verify, data)

        dispatch({ type: user_verify_success, payload: res.data })
    } catch (error: any) {
        debug("USER FORGOT CODE VERIFY ACTION", error?.response?.data || error.message)
        dispatch({ type: user_errors, payload: error?.response?.data })
    }
}

export const reset_password = (data: userModel) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })
        const res = await axios.post(_end_point.customer.reset, data)
        await AsyncStorage.setItem('credentials', JSON.stringify(res.data))

        dispatch({ type: user_reset_success, payload: res.data })
    } catch (error: any) {
        debug("USER RESET PASSWORD ACTION", error?.response?.data || error.message)
        dispatch({ type: user_errors, payload: error?.response?.data })
    }
}

export const inscription_service = (data: FormData) => async (dispatch: any) => {
    try {
        dispatch({ type: user_loading })

        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const res = await axios.post(_end_point.customer.register, data, config)

        dispatch({ type: user_register_success, payload: res.data })
    } catch (error: any) {
        debug("USER REGISTER ACTION", error?.response?.data || error.message)
        dispatch({ type: user_errors, payload: error?.response?.data })
    }
}



// { uri: sign, type: 'image/png', name: 'signature.png' } 

export const test_image = (data: any) => async (dispatch: any) => {
    try {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } }
        const res = await axios.post("http://192.168.50.82:8000/test-image", data, config)
        console.log(res.data)
    } catch (error) {
        console.log(error)
    }
}


