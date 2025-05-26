import style from "./Category.module.css"
import React, { useEffect } from 'react'
import ProductCard from "../../components/ProductCard"
import { useLocation } from "react-router-dom"
import { useState } from "react";
import data from "../Home/data.js"

export default function Category() {
    const location = useLocation();
    const category = location.state?.category;
    const [products, setProducts] = useState([]);
    const [order, setOrder] = useState("priceUp");

    useEffect(() => {
        if (category === "laptops" || category === "smartphones") {
            fetch(`https://dummyjson.com/products/category/${category}`)
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data.products.sort((a, b) => a.price - b.price));
                });
        }
        else {
            const filteredProducts = data.filter((product) => product.category === category);
            setProducts(filteredProducts.sort((a, b) => a.price - b.price));
        }

    }, [category]);


    useEffect(() => {
        setProducts((prev) => {
            const sorted = [...prev]; 

            if (order === "priceUp") {
                sorted.sort((a, b) => a.price - b.price);
            } else if (order === "priceDown") {
                sorted.sort((a, b) => b.price - a.price);
            } else if (order === "discount") {
                sorted.sort((a, b) => b.discountPercentage - a.discountPercentage);
            } else if (order === "time") {
                sorted.sort((a, b) => new Date(b.meta.createdAt) - new Date(a.meta.createdAt));
            }

            return sorted;
        });
    }, [order]);

    return (
        <section className={style.category_section}>
            <select
                className={style.orders}
                onChange={(e) => setOrder(e.target.value)}
                value={order}
            >
                <option value="priceUp">Qiymət (artan sıra ilə)</option>
                <option value="priceDown">Qiymət (azalan sıra ilə)</option>
                <option value="discount">Endirimli məhsullar</option>
                <option value="time">Yeni məhsullar</option>
            </select>
            <div className={style.products}>
                {products.length > 0 && products.map(p =>
                    <div key={p.id} className={style.product}>
                        <ProductCard product={p} />
                    </div>
                )
                }
            </div>
        </section>
    )
}

