import Container from "@/components/Container"
import ProductsClient from "./ProductsClient"

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
            slug: 'damask-fabric-1',
            discountPrice: 20000,
            price: 25000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Gold Necklace",
            slug: 'gold-necklace',
            discountPrice: 55000,
            price: 65000,
            image: '/img/products/gold-necklace.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 2",
            slug: 'damask-fabric-2',
            discountPrice: 18000,
            price: 21000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 3",
            slug: 'damask-fabric-3',
            discountPrice: null,
            price: 100000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 4",
            slug: 'damask-fabric-4',
            discountPrice: null,
            price: 80000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 5",
            slug: 'damask-fabric-5',
            discountPrice: null,
            price: 125000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 6",
            slug: 'damask-fabric-6',
            discountPrice: null,
            price: 280000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 7",
            slug: 'damask-fabric-7',
            discountPrice: null,
            price: 25000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 8",
            slug: 'damask-fabric-8',
            discountPrice: 30000,
            price: 35000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
        {
            name: "Damask Fabric 9",
            slug: 'damask-fabric-9',
            discountPrice: null,
            price: 150000,
            image: '/img/products/fabric-7.png',
            stars: 0,
            ratings: 0,
        },
    ]

    return (
        <Container>
            <div className="pt-5 flex xl:gap-8 xl:pt-10">
                <ProductsClient products={products} />
            </div>
        </Container>
    )
}

export default CollectionPage