"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import ProductFilter from './ProductFilter'
import Button from '../Button'

import { IoFilter } from "react-icons/io5"

const FilterModal = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="flex items-center justify-center gap-2 bg-black text-white w-24 h-8 md:h-10 text-sm rounded-md border border-gray-200">
                    <IoFilter className="fill-white" /> Filter
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-[95%] md:max-w-[560px] max-h-[90%] overflow-y-scroll scrollbar-hide rounded-md">
                <DialogHeader className='text-left'>
                    <DialogTitle>Filter</DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                    {/* <ProductFilter /> */}
                    <DialogClose asChild>
                        <div className="mt-10">
                            <Button
                                label='Search'
                                type='primary'
                                onClick={() => { }}
                            />
                        </div>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default FilterModal