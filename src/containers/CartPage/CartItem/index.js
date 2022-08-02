import React, { useState } from 'react';
//Its requirement to laod the images
import { generatePublicUrl } from '../../../urlConfig';
import './style.css'
const CartItem = (props) => {
    const [qty, setQty] = useState(props.cartItem.qty);
    const { _id, name, price, img } = props.cartItem;

    const onQuantityIncrement = () => {
        setQty(qty + 1);
        props.onQuantityInc(_id, qty + 1);
    }
    const onQuantityDecrement=()=>{
        //0 not the product .It should be one atleast.
        if(qty<=1) return;
        setQty(qty-1);
        props.onQuantityInc(_id, qty - 1);

    }
    return (
        <div className='cartItemContainer'>
            <div className='flexRow'>

                <div className='cartProImgContainer'>
                    <img src={generatePublicUrl(img)} alt={''} />
                </div>

                <div className='cartItemDetails'>
                    <div>
                        <p>{name}</p>
                        <p>Rs. {price}</p>
                    </div>
                    <div>Deleivery in 3 - 5 days</div>
                </div>

            </div>
            <div style={{
                display: 'flex',
                margin: '5px 0'
            }}>

                {/* quantity control */}
                <div className='quantityControl'>
                    <button onClick={onQuantityDecrement}>-</button>
                    <input value={qty} readOnly />
                    <button onClick={onQuantityIncrement}>+</button>
                </div>

                <button className='cartActionBtn'>save for later</button>
                <button className='cartActionBtn'>Remove</button>
            </div>

        </div>
    )
}


export default CartItem;