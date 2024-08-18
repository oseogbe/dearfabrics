import Image from "next/image"

const Loader = () => {
    return (
      <div className="flex-center w-full">
          <Image src="/img/assets/loader.svg" alt="loading" width={24} height={24} />
      </div>
    )
  }
  
  export default Loader