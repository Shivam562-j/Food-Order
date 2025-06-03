import { useContext } from "react";

import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Checkout() {
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

    // handle close checkout modal
    function handleCloseCheckout() {
        userProgressCtx.hideCheckout();
    }

    // handle form submit 
    function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items: cartCtx?.items,
                    customer: customerData
                }
            })
        })

    }

    return <Modal
        open={userProgressCtx?.progress === 'checkout'}
        onClose={userProgressCtx?.progress === 'checkout' ? handleCloseCheckout : null}
    >
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label='Full Name' type='text' id='name' />
            <Input label='E-Mail Address' type='email' id='email' />
            <Input label='Street' type='text' id='street' />

            <div className="control-row">
                <Input label='Postal Code' type='text' id='postal-code' />
                <Input label='City' type='text' id='city' />
            </div>

            <p className="modal-actions">
                <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
                <Button textOnly>Submit Order</Button>
            </p>
        </form>
    </Modal>
}