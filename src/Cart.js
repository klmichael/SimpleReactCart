import React from 'react';
import { Button } from 'react-bootstrap';

function Cart({cart, removeOne}) {
  return (
    <>
      <h2>Shopping Cart</h2>
      <ul style={{ listStyleType: "none" }}>
      {cart.map((item, index) => {
        return (
          <li key={index}>
          <Button variant="light" size="medium" name={item.proId} onClick={removeOne}>
          {item.quantity}
          </Button>&nbsp;&nbsp;&nbsp;{item.name} from {item.country}: ${item.cost*item.quantity}
          </li>
        );
      })}
      </ul>
    </>
  );
}

export default Cart;