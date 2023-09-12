import { user_errors, user_forgot_success, user_loading, user_login_success, user_logout_success, user_register_success, user_reset_success, user_verify_success } from "./user.constant";
import { userStore } from "./user.model";




const initial: userStore = { user_loading: false, user_errors: null, user: null, host: null, tmp: false, info: null }
interface IAction { type: string; payload: string | boolean | any }

const userReducer = (state = initial, action: IAction): userStore => {
    switch (action.type) {

        case user_loading: return { ...state, user_loading: true, user_errors: false, }
        case user_errors: return { ...state, user_loading: false, user_errors: action.payload, }

        case user_reset_success:
        case user_login_success: return { user_errors: false, user_loading: false, host: action.payload.usr, info: action.payload.info, tmp: true }

        case user_logout_success: return initial;

        case user_verify_success:
        case user_forgot_success: return { ...state, user_errors: false, user_loading: false, data: action.payload }
        case user_forgot_success: return { ...state, user_errors: false, user_loading: false, data: action.payload }

        case user_register_success: return { user_errors: false, user_loading: false, user: action.payload, tmp: true }

        case "reset_tmp": return { ...state, tmp: false }
        case "reset_info": return { ...state, info: null }
        case "reset_data": return { ...state, data: null }
        case "reset_user_errors": return { ...state, user_errors: null }

        default: return state
    }
}

export default userReducer