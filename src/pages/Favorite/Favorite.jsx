import React from 'react'
import style from './Favorite.module.css';
import ProductCard from '../../components/ProductCard';
import { useSelector } from 'react-redux';

export default function Favorite() {
    const favoriteItems = useSelector(state => state.favorite.items);
    return (

        <section className={style.favorite_section}>
            <div className={style.products}>
                {favoriteItems.length > 0 && favoriteItems.map((p, i) => (
                    <div className={style.product}>
                        <ProductCard product={p} />
                    </div>
                ))}
            </div>
        </section>
    )
}
