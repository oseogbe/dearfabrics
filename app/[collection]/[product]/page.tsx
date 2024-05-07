import Container from "@/components/Container"
import ProductClient from "./ProductClient"
import RelatedProducts from "@/components/product/RelatedProducts"

interface ProductPageProps {
    params: {
        collection: string
        product: string
    }
}

const ProductPage = ({
    params
}: ProductPageProps) => {
    const product = {
        id: "bba45695-168a-4e29-a1cd-e5b0f20a40a3",
        name: "Custom-made Agbada",
        slug: "custom-made-agbada",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum deleniti maxime cum vitae facilis incidunt consequuntur, aliquid maiores consequatur quisquam accusantium recusandae id nisi, magni nihil obcaecati, sed tenetur saepe.",
        category: "Fabrics",
        images: [
            "/img/products/agbada/1.jpg",
            "/img/products/agbada/2.jpg",
            "/img/products/agbada/3.jpg",
            "/img/products/agbada/4.jpg",
        ],
        discountPrice: 80000,
        price: 95000,
        inStock: true,
        colors: [
            {
                name: "Wine",
                code: "#712a3d"
            },
            {
                name: "Berry",
                code: "#241571"
            },
            {
                name: "Blue",
                code: "#1c5f7e"
            },
            {
                name: "Green",
                code: "#77a331"
            },
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        stars: 0,
        ratings: 0,
        relatedProducts: [
            {
                name: "Custom-made Agbada 2",
                slug: "custom-made-agbada-2",
                image: "/img/products/agbada/5.png",
                discountPrice: 80000,
                price: 95000,
                stars: 0,
                ratings: 0,
            },
            {
                name: "Custom-made Agbada 3",
                slug: "custom-made-agbada-3",
                image: "/img/products/agbada/6.png",
                discountPrice: 80000,
                price: 95000,
                stars: 0,
                ratings: 0,
            },
        ]
    }

    return (
        <Container>
            <div className="pt-5 xl:pt-10">
                <div className="flex flex-col xl:flex-row xl:gap-8">
                    <ProductClient
                        product={product}
                    />
                </div>
                <div className="mt-20">
                    <RelatedProducts
                        products={product.relatedProducts}
                    />
                </div>
            </div>
        </Container>
    )
}

export default ProductPage