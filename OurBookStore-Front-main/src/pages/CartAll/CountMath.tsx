import { create } from "zustand";
import { CartItemType } from "../App";
import { CartDetailsDto } from "../API";

export interface CartState {
    cart: CartDetailsDto[];
    total: number;
    calculateTotal: () => void;
    setCart: (newCart: CartDetailsDto[]) => void
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    total: 0,


    calculateTotal: () =>
        set((state) => ({
            total: state.cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
        })),
    setCart: (newCart) => set((state) => ({
        ...state,
        cart: newCart
    }))

}));
