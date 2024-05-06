import Container from "@/components/Container"
import ProductFilter from "@/components/product/ProductFilter"
import ProductCard from "@/components/product/ProductCard"
import Select from "@/components/Select"
import Pagination from "@/components/Pagination"

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

    const products = [
        {
            name: "Damask Fabric 1",
            discountPrice: 20000,
            price: 25000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Gold Necklace",
            discountPrice: 55000,
            price: 65000,
            image: '/img/products/gold-necklace.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 2",
            discountPrice: 18000,
            price: 21000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 3",
            discountPrice: 23000,
            price: 27000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 4",
            discountPrice: null,
            price: 20000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 5",
            discountPrice: 28000,
            price: 33000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 6",
            discountPrice: 24000,
            price: 28000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 7",
            discountPrice: null,
            price: 25000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 8",
            discountPrice: 30000,
            price: 35000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 9",
            discountPrice: 25000,
            price: 29000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
    ]

    return (
        <Container>
            <div className="pt-5 flex xl:gap-8 xl:pt-10">
                <div className="w-[280px] shrink-0">
                    <ProductFilter />
                </div>
                <div className="w-full">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            Showing 1-12 of 240 results
                        </div>
                        <div className="flex items-center">
                            <div className="mr-4">Sort by:</div>
                            <Select
                                options={[
                                    "Default sorting",
                                    "Sort by popularity",
                                    "Sort by average rating",
                                    "Sort by newness",
                                    "Sort by price: low to high",
                                    "Sort by price: high to low",
                                ]}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-4 gap-6">
                        {
                            products.map(product => (
                                <div
                                    key={product.name}
                                    className="w-[230px] md:w-[250px]"
                                >
                                    <ProductCard
                                        name={product.name}
                                        discountPrice={product.discountPrice}
                                        price={product.price}
                                        image={product.image}
                                        stars={product.stars}
                                        ratings={product.ratings}
                                    />
                                </div>
                            ))
                        }
                    </div>
                    <div className="mt-16 flex justify-center">
                        <Pagination />
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default CollectionPage