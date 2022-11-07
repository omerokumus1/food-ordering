import React, { useRef, useState } from 'react';
import Input from '../../UI/Input';

import classes from './MealItemForm.module.css';

function MealItemForm(props) {
  const amountInputRef = useRef();
  const [isAmountValid, setIsAmountValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim() === '' ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setIsAmountValid(false);
      return;
    } else {
      setIsAmountValid(true);
      props.onAddToCart(enteredAmountNumber);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1',
        }}
        // amountInputRef={amountInputRef}
      />
      <button>+ Add</button>
      {!isAmountValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
}

export default MealItemForm;
