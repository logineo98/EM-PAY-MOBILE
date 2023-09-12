import AsyncStorage from "@react-native-async-storage/async-storage"

export const get_credentials = async (type: string) => {
    const t = await AsyncStorage.getItem('credentials')
    if (t) {
        const cred = JSON.parse(t)
        const accessToken = cred.accessToken
        const expiresIn = cred.expiresIn
        const usr = cred.usr

        if (type === "accessToken") return accessToken;
        else if (type === "expiresIn") return new Date().getTime() + parseInt(expiresIn);
        else if (type === "usr") return usr;
    }
}


//----------- endpoints
const _API_BASE = "http://192.168.50.82:8000/api/v1"

export const _end_point = {
    customer: {
        //without id
        login: `${_API_BASE}/customers/login`,
        register: `${_API_BASE}/customers/register`,
        forgot: `${_API_BASE}/customers/forgot`,
        verify: `${_API_BASE}/customers/verify-code`,
        reset: `${_API_BASE}/customers/reset-password`,
        find: `${_API_BASE}/customers`,

        // with id
        show: `${_API_BASE}/customers/`,
        update: `${_API_BASE}/customers/`,
        remove: `${_API_BASE}/customers/`,
    },
    partenaire: {
        register: `${_API_BASE}/partenaires/register`, //post
        find: `${_API_BASE}/partenaires`,               //get

        show: `${_API_BASE}/partenaires/`,              //get
        update: `${_API_BASE}/partenaires/`,            //put
        remove: `${_API_BASE}/partenaires/`,            //delete
    }
}
