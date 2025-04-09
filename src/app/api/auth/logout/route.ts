import { NextRequest, NextResponse } from 'next/server'
import { AUTH_API_URL } from '@/services/auth.service'
import { apiRequestHandler, requestHandler } from '@/utils/requestHandler'
import { AxiosResponse } from 'axios'
import { IResponseStatus } from '@/types/common'

export async function GET(req: NextRequest): Promise<NextResponse> {
	return await apiRequestHandler<IResponseStatus>(req, logout)
}

const logout = (): Promise<AxiosResponse<IResponseStatus>> =>
	requestHandler<IResponseStatus>(`${AUTH_API_URL}/logout`, 'get')
