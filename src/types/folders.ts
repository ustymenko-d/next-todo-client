import { z } from 'zod'
import FoldersValidation from '@/schemas/folders.schema'
import { IGetResponse, IPagination, IResponseStatus } from './common'
import { TTask } from './tasks'

export type TFolderName = z.infer<typeof FoldersValidation.folderName>

export interface IFolder {
	id: string
	name: string
	userId: string
}

export interface IGetFoldersRequest extends IPagination {
	name?: string
}

export interface IFolderResponse extends IResponseStatus {
	folder: IFolder
}

export interface IGetFoldersResponse extends IGetResponse {
	folders: IFolder[]
}

export interface IFolderWithTasks extends IFolder {
	tasks?: TTask[]
	page?: number
	pages?: number
	limit?: number
	total?: number
}
