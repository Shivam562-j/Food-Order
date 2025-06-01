import { createContext, useReducer } from "react";

const CartContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingCardItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const updateItems = [...state.items];

        if (existingCardItemIndex > -1) {
            const existingItem = state.items[existingCardItemIndex]
            state.items[existingCardItemIndex];
            const updateItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            }
            updateItems[existingCardItemIndex] = updateItems;
        } else {
            updateItems.push({ ...action.item, quantity: 1 });
        }

        return { ...state, items: updateItems };

    }

    if (action.type === 'REMOVE_ITEM') {
        const existingCardItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        const existingCardItem = state.items[existingCardItemIndex];

        const updateItems = [...state.items];
        if (existingCardItem.quantity === 1) {
            updateItems.splice(existingCardItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingCardItem,
                quantity: existingCardItem.quantity - 1
            };
            updateItems[existingCardItemIndex] = updatedItem;
        }

        return { ...state, items: updateItems };

    }

    return state;
}

export function CartContextProvider({ children }) {

    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    
    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item })
    }
    
    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id })
    }
    
    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    }

    return <CartContext.Provider value={cartContext}>
        {children}
    </CartContext.Provider>
}

export default CartContext;

