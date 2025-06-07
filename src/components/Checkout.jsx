import { useContext, useActionState } from "react";

import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from '../hooks/useHttp';
import Error from '../components/Error';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const { data, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig)

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

    // handle finish
    function handleFinish() {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    // handle form submit 
    function checkoutAction(prevState, fd) {
        // event.preventDefault();

        // const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx?.items,
                customer: customerData
            }
        }));

    }

    const [formState, formAction, isSending] = useActionState(checkoutAction, null);

    let actions = (
        <>
            <Button type="button" textOnly onClick={handleCloseCheckout}>Close</Button>
            <Button textOnly>Submit Order</Button>
        </>
    )

    if (isSending) {
        actions = <span>Sending order data....</span>
    }

    if (data && !error) {
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>
                We will get back to you more details via email within the next
            </p>
            <p className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>
    }

    return <Modal
        open={userProgressCtx?.progress === 'checkout'}
        onClose={userProgressCtx?.progress === 'checkout' ? handleCloseCheckout : null}
    >
        <form action={formAction}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label='Full Name' type='text' id='name' />
            <Input label='E-Mail Address' type='email' id='email' />
            <Input label='Street' type='text' id='street' />

            <div className="control-row">
                <Input label='Postal Code' type='text' id='postal-code' />
                <Input label='City' type='text' id='city' />
            </div>

            {error && <Error title='Failed to submit order' message={error} />}

            <p className="modal-actions">
                {actions}
            </p>
        </form>
    </Modal>
}