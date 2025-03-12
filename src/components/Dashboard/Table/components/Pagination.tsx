import { Table } from '@tanstack/react-table'
import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

interface DataTablePaginationProps<TData> {
	table: Table<TData>
}

export function DataTablePagination<TData>({
	table,
}: DataTablePaginationProps<TData>) {
	const pageIndex = table.getState().pagination.pageIndex
	const pageSize = table.getState().pagination.pageSize
	const totalPages = table.getPageCount()

	return (
		<div className='flex flex-wrap-reverse items-center justify-end gap-2 py-4 space-x-6 lg:space-x-8'>
			<div className='flex items-center space-x-2'>
				<p className='text-sm font-medium'>Rows per page</p>
				<Select
					value={`${pageSize}`}
					onValueChange={(value) => {
						table.setPageSize(Number(value))
					}}>
					<SelectTrigger className='h-8 w-[70px]'>
						<SelectValue placeholder={pageSize} />
					</SelectTrigger>
					<SelectContent side='top'>
						{[5, 10, 20, 30, 40, 50].map((size) => (
							<SelectItem
								key={size}
								value={`${size}`}>
								{size}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className='flex w-[100px] items-center justify-center text-sm font-medium'>
				Page {pageIndex + 1} of {totalPages}
			</div>

			<div className='flex items-center space-x-2'>
				<Button
					variant='outline'
					className='hidden w-8 h-8 p-0 sm:flex'
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}>
					<span className='sr-only'>Go to first page</span>
					<ChevronsLeft />
				</Button>
				<Button
					variant='outline'
					className='w-8 h-8 p-0'
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}>
					<span className='sr-only'>Go to previous page</span>
					<ChevronLeft />
				</Button>
				<Button
					variant='outline'
					className='w-8 h-8 p-0'
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}>
					<span className='sr-only'>Go to next page</span>
					<ChevronRight />
				</Button>
				<Button
					variant='outline'
					className='hidden w-8 h-8 p-0 sm:flex'
					onClick={() => table.setPageIndex(totalPages - 1)}
					disabled={!table.getCanNextPage()}>
					<span className='sr-only'>Go to last page</span>
					<ChevronsRight />
				</Button>
			</div>
		</div>
	)
}
