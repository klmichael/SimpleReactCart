import React from 'react';
import { Image, Button } from 'react-bootstrap';

function ProductList({items, add, stillShopping}) {
  //If an item's instock property is greater than 0, display the item in the store's product list.
  return (
    <>
      <h2>Products</h2>
      <ul style={{ listStyleType: "none" }}>
        {items.map((item, index) => { 
          return (
            parseInt(item.instock) > 0 && <li key={index}>
              <Image src={require(`./Images/${item.photo}`)} width={70} roundedCircle />
              <Button variant="primary" size="large" name={item.proId} onClick={add} disabled={!stillShopping}>
                Buy {item.name} - ${item.cost}/each ({item.instock} left in stock)
              </Button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ProductList;