export type userModel = { id?: string, phone?: string, name?: string, firstname?: string, address?: string, code?: string, email?: string, account?: string, profil?: string, document?: "", password?: string, confirm?: string, birthday?: Date, signature?: any }

export type userStore = { user_loading: boolean, user_errors: string | any, user?: userModel | null, host?: userModel | null, tmp?: boolean, info?: string | null, data?: any }
