// import ClientOnly from "@/components/ClientOnly"
import Container from "@/components/Container"
import FlashSales from "@/components/flashsales/FlashSales"
import Hero from "@/components/Hero"
import AdCard from "@/components/AdCard"
import AnkaraCard from "@/components/AnkaraCard"
import FeaturedCategories from "@/components/Categories"
import NewArrival from "@/components/NewArrival"
import Testimonials from "@/components/Testimonials"

import { fetchHeroSlides, fetchSales } from "@/lib/sanity"

const HomePage = async () => {
  const slides = await fetchHeroSlides()

  const sales = await fetchSales()

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
      title: "The Best Jewelry",
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
      commenter: "Angela, Abuja",
      comment: "I absolutely love the lace fabrics I ordered! The quality is top-notch, and the colors are just as vibrant as they look in the pictures. My tailor did a fantastic job with it, and I received so many compliments at the event. Will definitely be coming back for more!",
      image: "/img/testimonials/angela.png",
      stars: 5,
    },
    {
      commenter: "Chidinma, Port Harcourt",
      comment: "I've shopped here a few times for my ready-to-wear outfits and I'm never disappointed. The skirts and dresses are fashionable and fit perfectly. Plus, their perfumes smell amazing! I always get compliments when I wear them.",
      image: "/img/testimonials/chidinma.png",
      stars: 5,
    },
    {
      commenter: "Joan, Enugu",
      comment: "My husband loved his brocade fabric from here! It was the perfect material for his traditional outfit, and he looked amazing. I also got myself a stylish bag and perfume that has become my favorite. I'm truly satisfied with my shopping experience.",
      image: "/img/testimonials/joan.png",
      stars: 5,
    },
    {
      commenter: "Ngozi, Abuja",
      comment: "I've been looking for beautiful, authentic Ankara prints for a while, and this store has the best selection! The fabric is so soft and easy to work with, and it arrived in no time. I also got a pair of stylish shoes that I can't wait to wear!",
      image: "/img/testimonials/ngozi.png",
      stars: 5,
    },
    {
      commenter: "Timilehin, Lagos",
      comment: "The Aso-Oke fabrics here are gorgeous! I used it for my wedding outfit, and it was simply stunning. The quality is unmatched, and the customer service was excellent. I'll recommend this store to all my friends!",
      image: "/img/testimonials/timilehin.png",
      stars: 5,
    },
  ]

  return (
    <Container>
      {/* <div className="grid grid-cols-6">
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
        </div> */}
      <div className="pt-5 xl:pt-10">
        <Hero slides={slides} />
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
      <div className="flex flex-col gap-y-8 md:gap-y-12 mb-12 md:mb-16 xl:mb-24">
        {sales.map((sale, i) => (
          <FlashSales key={i} sale={sale} />
        ))}
      </div>
      <div className="flex flex-col gap-12 md:gap-16 xl:gap-24">
        <AnkaraCard />
        {/* <FeaturedCategories
          name="Categories For Women"
          categories={categoriesForWomen}
        />
        <FeaturedCategories
          name="Categories For Men"
          categories={categoriesForMen}
        />
        <NewArrival

        />
        <Testimonials
          testimonials={testimonials}
        /> */}
      </div>
    </Container>
  )
}

export default HomePage