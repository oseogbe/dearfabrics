import Container from '@/components/Container'
import CartClient from './CartClient'

const CartPage = () => {

    const products = [
        {
            id: 'jkje-irr-84nr',
            name: "Damask Fabric 1",
            slug: 'damask-fabric-1',
            category: 'fabrics',
            price: 45000,
            quantity: 2,
            image: '/img/products/fabric-7.png',
            inStock: true,
        },
        {
            id: 'jg84-p90e-9je4',
            name: "Gold Necklace",
            slug: 'gold-necklace',
            category: 'accessories',
            price: 60000,
            quantity: 1,
            image: '/img/products/gold-necklace.png',
            shipsIn: '3-4 weeks'
        },
    ]

    return (
        <Container>
            <div className="pt-5 xl:pt-10">
                <CartClient products={products} />
            </div>
        </Container>
    )
}

export default CartPage