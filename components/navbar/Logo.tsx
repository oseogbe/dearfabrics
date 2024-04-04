"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <Image
            src="/img/dfng-logo.png"
            alt="dear fabrics logo"
            height={100}
            width={100}
            className="cursor-pointer h-9 md:h-10 xl:h-12 w-auto"
            onClick={() => router.push('/')}
        />
    )
}

export default Logo