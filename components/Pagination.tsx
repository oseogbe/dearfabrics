"use client"

import { useEffect, useState } from "react"

interface PaginationProps {
    pageSize: number
    total: number
    onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
    pageSize,
    total,
    onPageChange
}) => {
    const [currentPage, setCurrentPage] = useState(1)

    const pagesCount = Math.ceil(total / pageSize)

    useEffect(() => {
        onPageChange(currentPage)
    }, [currentPage, onPageChange])

    const handlePageClick = (page: number) => {
        if (page > 0 && page <= pagesCount) {
            setCurrentPage(page)
        }
    }

    const getPages = () => {
        const pages: (number | string)[] = []
        const maxPageButtons = 5

        if (pagesCount <= maxPageButtons) {
            for (let i = 1; i <= pagesCount; i++) {
                pages.push(i)
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(pagesCount)
            } else if (currentPage >= pagesCount - 2) {
                pages.push(1)
                pages.push('...')
                for (let i = pagesCount - 3; i < pagesCount; i++) {
                    pages.push(i)
                }
            } else {
                pages.push(1)
                pages.push('...')
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i)
                }
                pages.push('...')
                pages.push(pagesCount)
            }
        }
        return pages
    }

    const pages = getPages()

    return (
        <nav className="flex items-center gap-x-1">
            <button
                type="button"
                className={`min-h-8 min-w-8 md:min-h-[54px] md:min-w-[54px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm md:text-xl rounded-lg ${currentPage === 1 ? 'text-gray-400 disabled:opacity-50' : 'text-gray-800 hover:bg-gray-100'} focus:outline-none focus:bg-gray-100`}
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <svg className="flex-shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span aria-hidden="true" className="sr-only">Previous</span>
            </button>

            <div className="flex items-center gap-x-1">
                {pages.map((page, index) =>
                    page === '...' ? (
                        <div key={index} className="min-h-8 min-w-8 md:min-h-[54px] md:min-w-[54px] flex justify-center items-center text-gray-400 p-2 text-sm md:text-xl rounded-lg">•••</div>
                    ) : (
                        <button
                            key={index}
                            type="button"
                            className={`min-h-8 min-w-8 md:min-h-[54px] md:min-w-[54px] flex justify-center items-center ${page === currentPage ? 'bg-gray-200 text-gray-800' : 'text-gray-800 hover:bg-gray-100'} py-2 px-3 text-sm md:text-xl rounded-lg focus:outline-none`}
                            onClick={() => handlePageClick(page as number)}
                            aria-current={page === currentPage ? 'page' : undefined}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <button
                type="button"
                className={`min-h-8 min-w-8 md:min-h-[54px] md:min-w-[54px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm md:text-xl rounded-lg ${currentPage === pagesCount ? 'text-gray-400 disabled:opacity-50' : 'text-gray-800 hover:bg-gray-100'} focus:outline-none focus:bg-gray-100`}
                onClick={() => handlePageClick(currentPage + 1)}
                disabled={currentPage === pagesCount}
            >
                <span aria-hidden="true" className="sr-only">Next</span>
                <svg className="flex-shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </button>
        </nav>
    )
}

export default Pagination
