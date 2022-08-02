import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/Layout';
import Card from '../../components/UI/Card';
import './style.css';
import { MaterialButton } from '../../components/MaterialUI';

import CartItem from './CartItem';
import { addToCart, getCartItems } from '../../actions';


function CartPage(props) {
  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth);
  // const cartItems = cart.cartItems;
  //We are get quantity and everything from cartItems.Reason cartItem adding with state reson is iwant play with quantity.Initially cartItem emply 
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);


  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    console.log({ _id, qty });
    const {name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id,name, price, img }, 1));

  }

  const onQuantityDecrement = (_id, qty) => {
    console.log({ _id, qty });
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id,name, price, img }, -1));
  }
  return (
    <Layout>
      <div className='cartContainer' style={{ alignItems: 'flex-start' }}>

        <Card
          headerLeft={`My Cart`}
          headerRight={<div>Deliver to</div>}
          style={{width:'calc(100%-400px)',overflow:'hidden'}}
        >
          {
            //below it simply gives the keys means id of the product .This is object hence give key

            Object.keys(cartItems).map((key, index) =>

              <CartItem

              //here is our requirement the react loping the functions.Carttems help of akey every time we get a object.Then tha valye in our item compoenent
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}

              />
            )
          }

<div
            style={{
              width: "100%",
              display: "flex",
              background: "#ffffff",
              justifyContent: "flex-end",
              boxShadow: "0 0 10px 10px #eee",
              padding: "10px 0",
              boxSizing: "border-box",
            }}
          >
            <div style={{ width: "250px" }}>
              <MaterialButton
                title="PLACE ORDER"
                onClick={() => props.history.push(`/checkout`)}
              />
            </div>
          </div>


        </Card>
        <Card
          headerLeft='Price'
          style={{
            width: '380px'

          }}></Card>
      </div>
    </Layout>
  )
}

export default CartPage;