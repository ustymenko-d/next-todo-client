import { NextRequest, NextResponse } from 'next/server'
import { AUTH_API_URL } from '@/services/auth.service'
import { apiRequestHandler, requestHandler } from '@/utils/requestHandler'
import { AxiosResponse } from 'axios'
import { IResponseStatus } from '@/types/common'

export async function POST(req: NextRequest): Promise<NextResponse> {
	return await apiRequestHandler<IResponseStatus>(req, deleteAccount)
}

const deleteAccount = (): Promise<AxiosResponse<IResponseStatus>> =>
	requestHandler<IResponseStatus>(`${AUTH_API_URL}/delete-account`, 'delete')
