import requestHandler from '@/utils/requestHandler'
import { API_URL } from './tasks.service'
import { GetTasksRequestDto, TaskBaseDto, TaskDto } from '@/dto/tasks'
import { IGetTasksResponse, ITaskResponse } from '@/types/tasks'
import { AxiosResponse } from 'axios'

const TasksApi = {
	getTasks: (
		payload: GetTasksRequestDto
	): Promise<AxiosResponse<IGetTasksResponse>> =>
		requestHandler<IGetTasksResponse, GetTasksRequestDto>(
			`${API_URL}/get`,
			'post',
			payload
		),

	createTask: (payload: TaskBaseDto): Promise<AxiosResponse<ITaskResponse>> =>
		requestHandler<ITaskResponse, TaskBaseDto>(
			`${API_URL}/create`,
			'post',
			payload
		),

	editTask: (payload: TaskDto): Promise<AxiosResponse<ITaskResponse>> =>
		requestHandler<ITaskResponse>(API_URL, 'put', payload),

	toggleStatus: (taskId: string): Promise<AxiosResponse<ITaskResponse>> =>
		requestHandler<ITaskResponse>(`${API_URL}/${taskId}`, 'patch'),

	deleteTask: (taskId: string): Promise<AxiosResponse<ITaskResponse>> =>
		requestHandler<ITaskResponse>(`${API_URL}/${taskId}`, 'delete'),
}

export default TasksApi
