import React, { useContext } from 'react';
import { CartContext } from '../../../store/cart-context';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

export const MealItemObj = function (id, name, amount, description, price) {
  this.id = id;
  this.name = name;
  this.amount = amount;
  this.description = description;
  this.price = price;
};

function MealItem(props) {
  const cartCtx = useContext(CartContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem(
      new MealItemObj(
        props.id,
        props.name,
        amount,
        props.description,
        props.price
      )
    );
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
      </div>
      <div className={classes.price}>
        {price}
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
