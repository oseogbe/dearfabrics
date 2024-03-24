"use client";

import Container from "./Container";
import Announcement from "./navbar/Announcement";
import Logo from "./navbar/Logo";
import Search from "./navbar/Search";
import AccountButton from "./navbar/AccountButton";
import CartButton from "./navbar/CartButton";

interface NavbarProps {
    currentUser?: null;
}

const Navbar: React.FC<NavbarProps> = ({
    currentUser
}) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <Announcement />
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div
                        className="flex flex-row items-center justify-between gap-3 md:gap-0"
                    >
                        <Logo />
                        <div className="flex flex-row items-center gap-3 xl:gap-9">
                            <Search />
                            <div className="flex flex-row gap-3">
                                <AccountButton />
                                <CartButton />
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default Navbar