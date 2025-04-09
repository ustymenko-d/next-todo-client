import { ApiAxios } from './Axios'
import { IGetTasksResponse, ITaskResponse } from '@/types/tasks'
import { GetTasksRequestDto, TaskBaseDto, TaskDto } from '@/dto/tasks'
import { handleServiceRequest } from '@/utils/requestHandler'

export const TASKS_API_URL = '/tasks'

const TasksService = {
	getTasks: async (payload: GetTasksRequestDto): Promise<IGetTasksResponse> =>
		handleServiceRequest(
			() => ApiAxios.post(`${TASKS_API_URL}/get`, payload),
			'Get  tasks'
		),

	create: async (payload: TaskBaseDto): Promise<ITaskResponse> =>
		handleServiceRequest(
			() => ApiAxios.post(`${TASKS_API_URL}/create`, payload),
			'Create task'
		),

	update: async (payload: TaskDto): Promise<ITaskResponse> =>
		handleServiceRequest(
			() => ApiAxios.put(`${TASKS_API_URL}`, payload),
			'Update task'
		),

	toggleStatus: async (id: string): Promise<ITaskResponse> =>
		handleServiceRequest(
			() => ApiAxios.patch(`${TASKS_API_URL}/${id}`),
			'Toggle task status'
		),

	delete: async (id: string): Promise<ITaskResponse> =>
		handleServiceRequest(
			() => ApiAxios.delete(`${TASKS_API_URL}/${id}`),
			'Delete task '
		),
}

export default TasksService
