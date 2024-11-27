import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

import { LuAlignJustify } from 'react-icons/lu'

const MobileMenu = () => {
    return (
        <Sheet>
            <SheetTrigger className="lg:hidden">
                <LuAlignJustify className="w-4 h-4 xl:w-5 xl:h-5 text-[#807D7E] cursor-pointer mr-3" />
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>DearFabrics.ng</SheetTitle>
                    <SheetDescription>

                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu