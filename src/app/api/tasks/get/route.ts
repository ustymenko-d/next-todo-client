import { GetTasksRequestDto } from '@/dto/tasks'
import { TASKS_API_URL } from '@/services/tasks.service'
import { IGetTasksResponse } from '@/types/tasks'
import { apiRequestHandler, requestHandler } from '@/utils/requestHandler'
import { AxiosResponse } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
	return await apiRequestHandler<IGetTasksResponse, GetTasksRequestDto>(
		req,
		getTasks
	)
}

const getTasks = (
	payload: GetTasksRequestDto
): Promise<AxiosResponse<IGetTasksResponse>> =>
	requestHandler<IGetTasksResponse, GetTasksRequestDto>(
		`${TASKS_API_URL}/get`,
		'post',
		payload
	)
