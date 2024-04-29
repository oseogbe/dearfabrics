import Container from "@/components/Container"
import ProductFilter from "@/components/product/ProductFilter"

interface CollectionsProps {
    params: {
        type: string
    },
    searchParams?: {
        type?: string
        minPrice?: number
        maxPrice?: number
        page?: string
    }
}

const CollectionPage = ({
    params,
    searchParams
}: CollectionsProps) => {
    return (
        <Container>
            <div className="pt-5 xl:pt-10">
                <div className="flex justify-end mb-8">
                    top right filter
                </div>
                <div className="flex xl:gap-8">
                    <div className="w-[320px]">
                        <ProductFilter />
                    </div>
                    <div className="w-full grid grid-cols-4 gap-6">
                        <div className="h-[320px] border rounded-md"></div>
                        <div className="h-[320px] border rounded-md"></div>
                        <div className="h-[320px] border rounded-md"></div>
                        <div className="h-[320px] border rounded-md"></div>
                        <div className="h-[320px] border rounded-md"></div>
                        <div className="h-[320px] border rounded-md"></div>
                        <div className="h-[320px] border rounded-md"></div>
                        <div className="h-[320px] border rounded-md"></div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default CollectionPage