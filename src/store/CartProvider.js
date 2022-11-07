import { useReducer } from 'react';
import { CartContext, CartContextObj } from './cart-context';

const CartStateObj = function (items, totalAmount) {
  this.items = items;
  this.totalAmount = totalAmount;
};

const CartActionObj = function (type, item, id) {
  this.type = type;
  this.item = item;
  this.id = id;
};

const defaultCartState = new CartStateObj([], 0);

const cartActionTypes = {
  add: 'ADD',
  remove: 'REMOVE',
};

const cartReducer = (state, action) => {
  if (action.type === cartActionTypes.add) {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    console.log('updatedTotalAmount: ', updatedTotalAmount);
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    console.log('existingCartItemIndex: ', existingCartItemIndex);
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return new CartStateObj(updatedItems, updatedTotalAmount);
  } else if (action.type === cartActionTypes.remove) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingCartItem.price;
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return new CartStateObj(updatedItems, updatedTotalAmount);
  }
  return defaultCartState;
};

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction(new CartActionObj(cartActionTypes.add, item, null));
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction(new CartActionObj(cartActionTypes.remove, null, id));
  };

  const cartContext = new CartContextObj(
    cartState.items,
    cartState.totalAmount,
    addItemToCartHandler,
    removeItemFromCartHandler
  );

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
