import requestHandler from '@/utils/requestHandler'
import { API_URL } from '../auth.service'
import { IResponseStatus } from '@/types/common'
import { AxiosResponse } from 'axios'

const TokensApi = {
	refreshToken: (): Promise<AxiosResponse<IResponseStatus>> =>
		requestHandler<IResponseStatus>(`${API_URL}/refresh-tokens`, 'get'),
}

export default TokensApi
