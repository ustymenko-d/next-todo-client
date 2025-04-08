// import AccountApi from './api/account.api'
// import PasswordApi from './api/password.api'
// import TokensApi from './api/tokens.api'

import { baseAuthDto } from '@/dto/auth'
import { ApiAxios } from '../Axios'
import { IAuthResponse, IUserInfo } from '@/types/auth'

export const API_URL = '/auth'

const AuthService = {
	login: async (payload: baseAuthDto): Promise<IUserInfo> => {
		try {
			const { data } = await ApiAxios.post(`${API_URL}/login`, payload)
			const { userInfo } = data as IAuthResponse
			return userInfo
		} catch (error) {
			console.error('Login error:', error)
			throw new Error('Login failed')
		}
	},
}

export default AuthService
