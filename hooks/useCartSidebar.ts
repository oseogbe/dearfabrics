import { create } from "zustand";

interface CartSidebarStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useCartSidebar = create<CartSidebarStore>(set => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))

export default useCartSidebar