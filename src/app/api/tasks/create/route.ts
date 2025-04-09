import { TaskBaseDto } from '@/dto/tasks'
import { TASKS_API_URL } from '@/services/tasks.service'
import { ITaskResponse } from '@/types/tasks'
import { apiRequestHandler, requestHandler } from '@/utils/requestHandler'
import { AxiosResponse } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest): Promise<NextResponse> {
	return await apiRequestHandler<ITaskResponse, TaskBaseDto>(req, create)
}

const create = (payload: TaskBaseDto): Promise<AxiosResponse<ITaskResponse>> =>
	requestHandler<ITaskResponse, TaskBaseDto>(
		`${TASKS_API_URL}/create`,
		'post',
		payload
	)
