import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProductList from './ProductList';
import Cart from './Cart';
import Stock from './Stock';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Checkout from './Checkout';

const products = [
  { proId: 1, name: "Apples", country: "Italy", cost: 3, instock: 10, photo: "apple.png" },
  { proId: 4, name: "Cabbage", country: "USA", cost: 1, instock: 8, photo: "cabbage.png" },
];

function App() {
  const [items, setItems] = useState(products);
  const [cart, setCart] = useState([]);
  const [stillShopping, setStillShopping] = useState(true);

    const addToCart = (e) => {
      let productId = parseInt(e.target.name);
      const inList = (element) => element.proId === productId;
      
      //First, check and see if the productId is already in the cart.
      let cartIndex = cart.findIndex(inList);
      //If the product is not in the cart, copy it's key properties and add it as a new item object with an additional property of quantity initialized to 1.
      if (cartIndex < 0) {
        let purchase = items.filter(inList);
        let newCartItem = 
          {
            proId: purchase[0].proId,
            name: purchase[0].name,
            cost: purchase[0].cost,
            country: purchase[0].country,
            quantity: 1
          };
        setCart([...cart, newCartItem]);
      } //If the item is in the cart, increase the quantity by 1
        else {
        let newCart = [...cart];
        newCart[cartIndex].quantity += 1;
        setCart([...newCart]);
      }
      //Now, find the product object in the items array and decrease the "instock" property by 1.
      let itemsIndex = items.findIndex(inList);
      let newStock = [...items];
      newStock[itemsIndex].instock = parseInt(newStock[itemsIndex].instock) - 1;
      setItems(newStock);
    };


    function removeFromCart(e) {
      console.log("Preparing to remove an item from cart.")
      let productId = parseInt(e.target.name);
      const inList = (element) => element.proId === productId;
      
      //First, find the item in the cart array and create a deep copy of the current cart.
      let cartIndex = cart.findIndex(inList);
      console.log("cart index is ", cartIndex)
      let newCart = [...cart];
      //If the quantity is greater than 1, decrease it by 1.
      if (newCart[cartIndex].quantity > 1){
        newCart[cartIndex].quantity -= 1;
        setCart([...newCart]);
      } //If the quantity is 1, delete the item.
        else {
        newCart.splice(cartIndex, 1);
        setCart([...newCart]);
      }
      //Now, find the product object in the items array and increase the "instock" property by 1.
      let itemsIndex = items.findIndex(inList);
      let newStock = [...items];
      newStock[itemsIndex].instock = parseInt(newStock[itemsIndex].instock) + 1;
      setItems(newStock);
    };

    function newShoppingCart() {
      setCart([]);
      setStillShopping(true);
    }

    return (
      <Container>
        <h1>React Shopping Cart</h1>
        <Row xs="auto">
          <Col>
            <ProductList items={items} add={(e) => addToCart(e)} stillShopping={stillShopping}/>
          </Col>
          <Col>
            {stillShopping && <Cart cart={cart} removeOne={(e) => removeFromCart(e)}/>}
            <Checkout cart={cart} stillShopping={stillShopping} setStillShopping={setStillShopping} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Stock items={items} setItems={setItems}/>
          </Col>
          <Col>
            {!stillShopping && <Button
              onClick={newShoppingCart}
            >New Shopping Cart</Button>}
          </Col>
        </Row>
      </Container>
    );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);