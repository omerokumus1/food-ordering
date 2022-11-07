import React from 'react';

export const CartContextObj = function (
  items,
  totalAmount,
  addItem,
  removeItem
) {
  this.items = items;
  this.totalAmount = totalAmount;
  this.addItem = addItem;
  this.removeItem = removeItem;
};

export const CartContext = React.createContext(
  new CartContextObj(
    [],
    0,
    (item) => {},
    (id) => {}
  )
);
