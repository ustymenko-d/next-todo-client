import AccountApi from './api/account.api'
import PasswordApi from './api/password.api'
import TokensApi from './api/tokens.api'

export const API_URL = '/auth'

const AuthService = {
	...AccountApi,
	...TokensApi,
	...PasswordApi,
}

export default AuthService
