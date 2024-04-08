import ClientOnly from "@/components/ClientOnly"
import Container from "@/components/Container"
import FlashSales from "@/components/FlashSales"
import Hero from "@/components/Hero"
import AdCard from "@/components/AdCard"
import AnkaraCard from "@/components/AnkaraCard"
import Categories from "@/components/Categories"

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
    },
    {
      heading: "Best Quality",
      title: "The Best Jewelries",
      offerLabel: "Up to 50% Off",
      actionLabel: "Explore Items",
      actionLink: "#",
      backgroundImageUrl: "/img/adcard-bg-1.svg",
      imageUrl: "/img/adcard-pic-0.svg",
    }
  ]

  const categoriesForWomen = [
    {
      title: "Fabrics",
      link: "#",
      image: "/img/aa.png"
    },
    {
      title: "Jewelry",
      link: "#",
      image: "/img/aa.png"
    },
    {
      title: "Dresses",
      link: "#",
      image: "/img/bb.png"
    },
    {
      title: "Shoes",
      link: "#",
      image: "/img/cc.png"
    },
  ]

  const categoriesForMen = [
    {
      title: "Fabrics",
      link: "#",
      image: "/img/dd.png"
    },
    {
      title: "Casuals",
      link: "#",
      image: "/img/ee.png"
    },
    {
      title: "Shoes",
      link: "#",
      image: "/img/ff.png"
    },
    {
      title: "Accessories",
      link: "#",
      image: "/img/gg.png"
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
        </div>
      </Container>
    </ClientOnly>
  )
}

export default HomePage