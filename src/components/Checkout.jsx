import { useContext } from "react";

import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";

export default function Checkout() {
    const cartCtx = useContext(CartContext);

    // handle total cart
    // const cartTotal = cartCtx?.items?.reduce(
    //     (totalPrice, item) => totalPrice + item?.quanlity * item?.price, 0
    // );
    const cartTotal = cartCtx?.items?.reduce((totalPrice, item) => {
        const quantity = Number(item?.quantity);
        const price = Number(item?.price);

        const validQuantity = isNaN(quantity) ? 0 : quantity;
        const validPrice = isNaN(price) ? 0 : price;

        return totalPrice + validQuantity * validPrice;
    }, 0);

    return <Modal>
        <form>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        </form>
    </Modal>
}