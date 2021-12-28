import React from 'react';
import { Button } from 'react-bootstrap';

function Checkout({ cart, stillShopping, setStillShopping })
{
  const totaler = (accum, current) => accum + current;
  const cartTotal = cart.map((item) => parseInt(item.cost) * parseInt(item.quantity)).reduce(totaler, 0);
  
  const pay = () => {
    setStillShopping(false);
  };


  return (
    <>
      {stillShopping ? 
      (
        cartTotal > 0 && <Button onClick={pay} className="total">Pay ${cartTotal}</Button>
      ):(<>
          <h1>Receipt</h1>
          <ul style={{ listStyleType: "none" }}>
          {cart.map((item, index) => {
            return (
              <li key={index}>
              {item.name} from {item.country}: {item.quantity} for ${item.cost*item.quantity}
              </li>
            );
          })}
          </ul>
          <div className="total"><b>Total paid: ${cartTotal}</b></div>
      </>)
      }
    </>
  );
}

export default Checkout;