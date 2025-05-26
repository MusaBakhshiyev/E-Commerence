import React from 'react'
import style from './Cart.module.css';
import { useSelector } from 'react-redux';
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { removeFromCart, updateCart, clearCart } from "../../redux/cartSlice.js";
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const navigate = useNavigate();

  const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartItems.reduce((total, item) => total + (item.price - item.price * item.discountPercentage / 100) * item.quantity, 0).toFixed(2);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const handleUpdateCart = (product, quantity) => {
    if (quantity > 0) {
      dispatch(updateCart({ product, quantity }));
    }
  };


  return (

    <section className={style.cart_section}>
      {cartItems.length > 0 ? (
        <div className={style.cart}>
          <div className={style.products}>
            <div className={style.cart_info}>
              <h1>Səbət - {totalCount} məhsul</h1>
              <button onClick={() => dispatch(clearCart())}> <span><MdDeleteForever /> </span> <span>Səbəti sil</span> </button>
            </div>
            {cartItems.map((p) => (
              <div className={style.product} key={p.id}>
                <img src={p.images[0]} alt="image" />
                <div className={style.info}>
                  <h2 onClick={() => navigate("/detail",{state:{product:p}})}>{p.title}</h2>
                  <div className={style.change_count}>
                    <div className={style.count}>
                      <span onClick={() => handleUpdateCart(p, p.quantity - 1)}>-</span>
                      <span>{p.quantity}</span>
                      <span onClick={() => handleUpdateCart(p, p.quantity + 1 <= 10 ? p.quantity + 1 : 10)}>+</span>
                    </div>
                    <div className={style.price}>
                      <h1>{(p.quantity * ((p.price - p.price * p.discountPercentage / 100).toFixed(2))).toFixed(2)} AZN</h1>
                    </div>
                  </div>
                </div>
                <span onClick={() => handleRemoveFromCart(p)}><MdDeleteForever /></span>

              </div>
            ))}
          </div>

          <div className={style.cart_total}>
            <h1>Məhsullar:</h1>
            <div className={style.total_products}>

              {cartItems.map((p) => (
                <div className={style.total_product} key={p.id}>
                  <p>{p.title}</p>
                  <p>{(p.quantity * ((p.price - p.price * p.discountPercentage / 100).toFixed(2))).toFixed(2)} AZN</p>
                </div>
              ))}
            </div>
            <button className={style.total_price}>Ümumi məbləğ:	{totalPrice} AZN</button>

            <button onClick={()=>navigate("/order",{state:{totalPrice:totalPrice}})} className={style.order}>Sifarişi rəsmiləşdir</button>
          </div>



        </div>



      ):<span className={style.empty}>⨂ Səbət Boşdur ⨂</span>}
    </section>
  )
}

