import style from "./ProductCard.module.css";
import { useState } from "react";
import { TbShoppingCartPlus } from "react-icons/tb";
import { RiScales3Line, RiHeartAdd2Line } from "react-icons/ri";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import { TbShoppingCartCopy } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cartSlice.js";
import { addToFavorite, removeFromFavorite } from "../redux/favoriteSlice.js";
import { addToCompare, removeFromCompare } from "../redux/compareSlice.js";
import { FaHeartCircleMinus } from "react-icons/fa6";
import { TbScaleOff } from "react-icons/tb";

export default function ProductCard({ product }) {
    const [month, setMonth] = useState(18);
    const [count, setCount] = useState(1);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cartItems = useSelector(state => state.cart.items);

    const totalPrice = (product.price * count).toFixed(2);
    const discountedPrice = (totalPrice - totalPrice * product.discountPercentage / 100).toFixed(2);
    const monthlyPayment = (discountedPrice / month).toFixed(2);

    const favoriteItems = useSelector(state => state.favorite.items);

    const compareItems = useSelector(state => state.compare.items);

    const handleAddToCart = (product, quantity) => {
        dispatch(addToCart({ product, quantity }));
    }

    const handleAddToFavorite = (product) => {
        dispatch(addToFavorite({ product }));
    }

    const handleRemoveFromFavorite = (id) => {
        dispatch(removeFromFavorite(id));
    }

    const handleAddToCompare = (product) => {
        dispatch(addToCompare({ product }));
    }

    const handleRemoveFromCompare = (id) => {
        dispatch(removeFromCompare(id));
    }

    return (
        <div className={style.product}>
            <div className={style.favorite_scale}>
                {cartItems.some(p => p.id == product.id) ? <span onClick={() => navigate("/cart")} className={style.go_cart}><span><TbShoppingCartCopy /></span> <span>Səbətə keç</span></span> : <span></span>}

                {compareItems.some(p => p.id == product.id) ?
                    <span onClick={() => handleRemoveFromCompare(product.id)} className={style.remove_Compare}><span><TbScaleOff /></span></span>
                    : <span onClick={() => handleAddToCompare(product)} className={style.add_Compare}><span><RiScales3Line /></span></span>}

                {favoriteItems.some(p => p.id == product.id) ?
                    <span onClick={() => handleRemoveFromFavorite(product.id)} className={style.remove_favorite}><span><FaHeartCircleMinus /></span></span>
                    : <span onClick={() => handleAddToFavorite(product)} className={style.add_favorite}><span><RiHeartAdd2Line /></span></span>}

            </div>
            <div className={style.image_title}>
                <Swiper className={`${style.images} product-swiper`}
                    modules={[Pagination, A11y]}
                    pagination={{ clickable: true }}
                    allowTouchMove={false}
                    simulateTouch={false}
                >
                    {product.images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <img
                                className={product.category === "smartphones" ? style.scale : style.enlarge}
                                src={img}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                <h3>{product.title}</h3>
            </div>



            <div className={style.change_month}>
                <div className={style.price}>
                    <span>{totalPrice} Azn</span>
                    <span>{discountedPrice} Azn</span>
                </div>

                <div className={style.partial_payment}>
                    <div className={style.periods}>
                        {[6, 12, 18].map((m) => (
                            <span
                                key={m}
                                onClick={() => setMonth(m)}
                                className={month === m ? style.active_month : ""}
                            >
                                {m}ay
                            </span>
                        ))}
                    </div>
                    <h3>{monthlyPayment} Azn</h3>
                </div>
            </div>

            <div className={style.change_count}>
                <div className={style.count}>
                    <span onClick={() => setCount(c => (c - 1) == 0 ? 1 : (c - 1))}>-</span>
                    <span>{count}</span>
                    <span onClick={() => setCount(c => c + 1)}>+</span>
                </div>
                <button onClick={() => handleAddToCart(product, count)}>
                    <span><TbShoppingCartPlus /></span> Səbətə əlavə et
                </button>
            </div>

        </div>
    );
}
