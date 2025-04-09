import { TaskDto } from '@/dto/tasks'
import { TASKS_API_URL } from '@/services/tasks.service'
import { ITaskResponse } from '@/types/tasks'
import { apiRequestHandler, requestHandler } from '@/utils/requestHandler'
import { AxiosResponse } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(req: NextRequest): Promise<NextResponse> {
	return await apiRequestHandler<ITaskResponse, TaskDto>(req, updateTask)
}

const updateTask = (payload: TaskDto): Promise<AxiosResponse<ITaskResponse>> =>
	requestHandler<ITaskResponse, TaskDto>(`${TASKS_API_URL}`, 'put', payload)
