"use client"

import { Suspense } from 'react'

import SearchResultsPageContent from './SearchResultsPageContent'

const SearchResultsPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResultsPageContent />
        </Suspense>
    )
}

export default SearchResultsPage