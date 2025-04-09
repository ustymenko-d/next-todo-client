import { TASKS_API_URL } from '@/services/tasks.service'
import { ITaskResponse } from '@/types/tasks'
import { apiRequestHandler, requestHandler } from '@/utils/requestHandler'
import { AxiosResponse } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
	req: NextRequest,
	{ params }: { params: { id: string } }
): Promise<NextResponse> {
	const { id } = params
	const toggleStatus = (): Promise<AxiosResponse<ITaskResponse>> =>
		requestHandler<ITaskResponse>(`${TASKS_API_URL}/${id}`, 'patch')

	return await apiRequestHandler<ITaskResponse>(req, toggleStatus)
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
): Promise<NextResponse> {
	const { id } = params
	const deleteTask = (): Promise<AxiosResponse<ITaskResponse>> =>
		requestHandler<ITaskResponse>(`${TASKS_API_URL}/${id}`, 'delete')

	return await apiRequestHandler<ITaskResponse>(req, deleteTask)
}
