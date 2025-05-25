import React, { useEffect, useState } from 'react'
import style from "./Search.module.css"
import data from "../Home/data.js"
import ProductCard from "../../components/ProductCard.jsx"
import { useLocation } from 'react-router-dom';

export default function Search() {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const title = location.state?.title;
    const [uniqueCategories, setUniqueCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(uniqueCategories[0]);

    useEffect(() => {
        const fetchProducts = async () => {
            let laptops = [];
            let smartphones = [];

            try {
                const res1 = await fetch('https://dummyjson.com/products/category/laptops');
                const data1 = await res1.json();
                laptops = data1.products;
            } catch (error) {
                console.warn("Failed to fetch laptops, using local data.");
            }

            try {
                const res2 = await fetch('https://dummyjson.com/products/category/smartphones');
                const data2 = await res2.json();
                smartphones = data2.products;
            } catch (error) {
                console.warn("Failed to fetch smartphones, using local data.");
            }

            const allProducts = [...data, ...laptops, ...smartphones];
            const items = allProducts.filter(p => p.title.toLowerCase().includes(title.toLowerCase()));

            const categorySet = Array.from(new Set(items.map(p => p.category)));

            setUniqueCategories(categorySet);
            setSelectedCategory(categorySet[0]);
            setProducts(items);
        };

        fetchProducts();
    }, [title]);


    return (
        <section className={style.search_container}>
            <h1>Axtarış nəticəsi</h1>
            <div className={style.categories}>
                {uniqueCategories.map(c =>
                    <button
                        key={c}
                        onClick={() => setSelectedCategory(c)}
                        className={`${style.category} ${c === selectedCategory ? style.isActive : ""}`}
                    >
                        {c == "laptops" && <h2>notbuklar</h2>}
                        {c == "smartphones" && <h2>smartfonlar</h2>}
                        {c == "televisions" && <h2>televizorlar</h2>}
                    </button>
                )}
            </div>

            <div className={style.products}>
                {products.length > 0 ? (products.map(p => p.category == selectedCategory &&
                    <div key={p.id} className={style.product}>
                        <ProductCard product={p} />
                    </div>
                )) : <span className={style.not_found}>🙄 Nəticə tapılmadı</span>}
            </div>

        </section>
    )
}

