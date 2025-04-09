import { NextRequest, NextResponse } from 'next/server'
import { AUTH_API_URL } from '@/services/auth.service'
import { apiRequestHandler, requestHandler } from '@/utils/requestHandler'
import { AxiosResponse } from 'axios'
import { IResponseStatus } from '@/types/common'
import urlBuilder from '@/utils/urlBuilder'

export async function PATCH(req: NextRequest): Promise<NextResponse> {
	const apiUrl = new URL(req.url)
	const params = new URLSearchParams(apiUrl.search)
	const url = urlBuilder(
		`${AUTH_API_URL}/password/reset-password`,
		Object.fromEntries(params)
	)
	const resetPassword = (): Promise<AxiosResponse<IResponseStatus>> =>
		requestHandler<IResponseStatus>(url, 'patch')
	return await apiRequestHandler<IResponseStatus>(req, resetPassword)
}
