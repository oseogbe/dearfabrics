"use client"

interface PaginationProps {

}

const Pagination: React.FC<PaginationProps> = ({

}) => {
    return (
        <nav className="flex items-center gap-x-1">
            <button type="button" className="min-h-8 min-w-8 md:min-h-[54px] md:min-w-[54px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm md:text-xl rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                <svg className="flex-shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span aria-hidden="true" className="sr-only">Previous</span>
            </button>
            <div className="flex items-center gap-x-1">
                <button type="button" className="min-h-8 min-w-8 md:min-h-[54px] md:min-w-[54px] flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm md:text-xl rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white dark:focus:bg-neutral-500" aria-current="page">1</button>
                <button type="button" className="min-h-8 min-w-8 md:min-h-[54px] md:min-w-[54px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm md:text-xl rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">2</button>
                <button type="button" className="min-h-8 min-w-8 md:min-h-[54px] md:min-w-[54px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm md:text-xl rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">3</button>
                <div className="hs-tooltip inline-block">
                    <button type="button" className="hs-tooltip-toggle group min-h-8 min-w-8 md:min-h-[54px] md:min-w-[54px] flex justify-center items-center text-gray-400 hover:text-gray-600 p-2 text-sm md:text-xl rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-500 dark:hover:text-gray-500 dark:focus:bg-white/10">
                        <span className="group-hover:hidden text-xs">•••</span>
                        <svg className="group-hover:block hidden flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m6 17 5-5-5-5"></path>
                            <path d="m13 17 5-5-5-5"></path>
                        </svg>
                        <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700" role="tooltip">
                            Next 4 pages
                        </span>
                    </button>
                </div>
                <button type="button" className="min-h-8 min-w-8 md:min-h-[54px] md:min-w-[54px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm md:text-xl rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">8</button>
            </div>
            <button type="button" className="min-h-8 min-w-8 md:min-h-[54px] md:min-w-[54px] py-2 px-2.5 inline-flex jusify-center items-center gap-x-2 text-sm md:text-xl rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10">
                <span aria-hidden="true" className="sr-only">Next</span>
                <svg className="flex-shrink-0 size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            </button>
        </nav>
    )
}

export default Pagination