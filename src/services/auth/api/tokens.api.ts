import apiRequestHandler from '@/utils/apiRequestHandler'
import { API_URL } from '../auth.service'
import { IResponseStatus } from '@/types/common'

const TokensApi = {
	refreshToken: (): Promise<IResponseStatus> =>
		apiRequestHandler<IResponseStatus>(`${API_URL}/refresh-tokens`, 'get'),
}

export default TokensApi
