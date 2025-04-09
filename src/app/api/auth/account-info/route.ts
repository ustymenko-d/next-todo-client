import { NextRequest, NextResponse } from 'next/server'
import { AUTH_API_URL } from '@/services/auth.service'
import { IUserInfo } from '@/types/auth'
import { apiRequestHandler, requestHandler } from '@/utils/requestHandler'
import { AxiosResponse } from 'axios'

export async function GET(req: NextRequest): Promise<NextResponse> {
	return await apiRequestHandler<IUserInfo>(req, check)
}

const check = (): Promise<AxiosResponse<IUserInfo>> =>
	requestHandler<IUserInfo>(`${AUTH_API_URL}/account-info`, 'get')
