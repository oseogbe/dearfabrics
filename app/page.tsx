import ClientOnly from "@/components/ClientOnly"
import Container from "@/components/Container"
import FlashSales from "@/components/FlashSales"
import Hero from "@/components/Hero"
import AdCard from "@/components/AdCard"
import AnkaraCard from "@/components/AnkaraCard"
import Categories from "@/components/Categories"
import NewArrival from "@/components/NewArrival"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"

const HomePage = () => {
  const menuItems = [
    {
      label: "Fabrics",
      link: ""
    },
    {
      label: "Accessories",
      link: ""
    },
    {
      label: "Men Fashion",
      link: ""
    },
    {
      label: "Dresses",
      link: ""
    },
    {
      label: "Sunglasses",
      link: ""
    },
    {
      label: "Shoes",
      link: ""
    },
    {
      label: "Bags",
      link: ""
    },
    {
      label: "Kids",
      link: ""
    },
  ]

  const adCardItems = [
    {
      heading: "Affordable Prices",
      title: "Quality Fabrics",
      offerLabel: "Up to 50% Off",
      actionLabel: "Explore Items",
      actionLink: "#",
      backgroundImageUrl: "/img/adcard-bg-0.svg",
      imageUrl: "/img/adcard-pic-0.svg",
      imageSize: 120
    },
    {
      heading: "Best Quality",
      title: "The Best Jewelries",
      offerLabel: "Up to 50% Off",
      actionLabel: "Explore Items",
      actionLink: "#",
      backgroundImageUrl: "/img/adcard-bg-1.svg",
      imageUrl: "/img/adcard-pic-1.png",
      imageSize: 110
    }
  ]

  const categoriesForWomen = [
    {
      title: "Fabrics",
      link: "#",
      image: "/img/jj_0.png"
    },
    {
      title: "Jewelry",
      link: "#",
      image: "/img/aa.png"
    },
    {
      title: "Dresses",
      link: "#",
      image: "/img/kk_0.png"
    },
    {
      title: "Shoes",
      link: "#",
      image: "/img/assets/heels-0.png"
    },
  ]

  const categoriesForMen = [
    {
      title: "Fabrics",
      link: "#",
      image: "/img/assets/agbada-3.png"
    },
    {
      title: "Casuals",
      link: "#",
      image: "/img/assets/men-shirt-and-jeans-1.png"
    },
    {
      title: "Shoes",
      link: "#",
      image: "/img/assets/men-shoes-0.png"
    },
    {
      title: "Accessories",
      link: "#",
      image: "/img/assets/men-accessories-0.png"
    },
  ]

  const testimonials = [
    {
      commenter: "Favour Emmanuel",
      comment: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed cum aut est nostrum aliquid adipisci, esse eos similique? Corporis dolorum tenetur consequatur esse eum nostrum est voluptas animi id eveniet!",
      image: "",
      rating: 5,
    },
    {
      commenter: "Jacob Benson",
      comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit odit rem veritatis alias beatae vel. Nemo similique optio, velit deleniti recusandae rerum perspiciatis labore, laudantium nisi hic inventore, officiis sequi.",
      image: "",
      rating: 5,
    },
    {
      commenter: "Anne Eghosa",
      comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, sed amet eos harum explicabo architecto, soluta ducimus aspernatur perspiciatis eum quis omnis quaerat ut molestias eius, odio pariatur quasi sunt.",
      image: "",
      rating: 5,
    },
    {
      commenter: "Blessing Daniel",
      comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias debitis harum recusandae illo maiores consequuntur praesentium qui! Repellat beatae facere corrupti quasi ex, velit voluptatem dolor? Dicta, iusto illum. Nobis.",
      image: "",
      rating: 5,
    },
    {
      commenter: "Funke Agunjobi",
      comment: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi blanditiis soluta quia, fugiat explicabo sint dicta eveniet eum corrupti architecto obcaecati libero dolore recusandae rem! Consequuntur placeat quae labore ipsam.",
      image: "",
      rating: 5,
    },
  ]

  return (
    <ClientOnly>
      <Container>
        <div className="grid grid-cols-6">
          <div className="hidden xl:col-span-1 xl:grid gap-4 pt-5 xl:pt-10">
            {
              menuItems.map(item => (
                <div className="text-lg font-medium cursor-pointer" key={item.label}>{item.label}</div>
              ))
            }
          </div>
          <div className="col-span-full xl:col-span-5 pt-5 xl:pt-10 xl:pl-10 xl:border-l">
            <Hero />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 xl:gap-8 mt-6 md:mt-12 xl:mt-[54px]">
          {
            adCardItems.map(item => (
              <AdCard
                key={item.title}
                heading={item.heading}
                title={item.title}
                offerLabel={item.offerLabel}
                actionLabel={item.actionLabel}
                actionLink={item.actionLink}
                backgroundImageUrl={item.backgroundImageUrl}
                imageUrl={item.imageUrl}
                imageSize={item.imageSize}
              />
            ))
          }
        </div>
        <hr className="w-[95%] mx-auto my-6 md:my-12 xl:my-[54px]" />
        <div className="flex flex-col gap-12 md:gap-16 xl:gap-24">
          <FlashSales />
          <AnkaraCard />
          <Categories
            name="Categories For Women"
            categories={categoriesForWomen}
          />
          <Categories
            name="Categories For Men"
            categories={categoriesForMen}
          />
          <NewArrival

          />
          <Testimonials
            testimonials={testimonials}
          />
        </div>
      </Container>
      <Footer />
    </ClientOnly>
  )
}

export default HomePage