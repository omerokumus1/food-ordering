import React, { useContext, useEffect, useState } from 'react';
import classes from './HeaderCardButton.module.css';
import CardIcon from '../Cart/CartIcon.jsx';
import { CartContext } from '../../store/cart-context';

function HeaderCardButton(props) {
  const [isButtonAnimated, setIsButtonAnimated] = useState(false);

  const cartCtx = useContext(CartContext);
  // Burada hata var -> yanlış toplama yapıyor
  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  console.log('numberOfCartItems: ', numberOfCartItems);

  const btnClasses = `${classes.button} ${
    isButtonAnimated ? classes.bump : ''
  }`;

  const items = cartCtx.items;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsButtonAnimated(true);

    const timerId = setTimeout(() => {
      setIsButtonAnimated(false);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onCartClick}>
      <span className={classes.icon}>
        <CardIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
}

export default HeaderCardButton;
