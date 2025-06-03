import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from '../util/formatting'
import Button from './UI/Button';
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

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

    // handle close cart
    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    // handle checkout page
    function handleShowCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx?.items?.map(item => <li key={item?.id}>
                    {item?.name} - {item.quantity}
                </li>)}
            </ul>

            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>

            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                <Button onClick={handleCloseCart}>Go to Checkout</Button>
            </p>
        </Modal>
    )
}
