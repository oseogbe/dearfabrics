"use client"

const AnkaraCard = () => {
    return (
        <div className="w-full h-[690px] md:h-[360px] xl:h-[540px] flex flex-col md:flex-row shadow-md">
            <div className="flex-1 bg-black opacity-80 p-10 xl:p-20 flex items-center md:rounded-l-lg">
                <div className="space-y-5 xl:space-y-7">
                    <h3 className="text-white text-2xl xl:text-5xl font-black uppercase">Everything <br />Ankara</h3>
                    <p className="text-white text-sm xl:text-xl font-medium">We sell the best and quality ankara fabrics with <br className="hidden xl:block" />the latest pattern and style just for you.</p>
                    <button className="bg-white px-5 xl:px-11 py-2 xl:py-3 text-sm xl:text-lg font-semibold rounded-lg">Shop Now</button>
                </div>
            </div>
            <div className="flex-1 bg-white md:rounded-r-lg"></div>
        </div>
    )
}

export default AnkaraCard