import { useState, useEffect } from 'react'
import style from './PopularCategories.module.css'
import { MdComputer } from "react-icons/md";
import ProductCard from "../../components/ProductCard.jsx";
import { useSelector } from 'react-redux';
import data from './data.js';
import { TbBasketDiscount } from "react-icons/tb";
import { TbBasketStar } from "react-icons/tb";
import { TbBasketUp } from "react-icons/tb";
import { TbBasketDown } from "react-icons/tb";
import { FaArrowDown } from "react-icons/fa";

export default function PopularCategories() {

    const [products, setProducts] = useState(data);
    const [category, setCategory] = useState(1);
    const [intialCount, setInitialCount] = useState(9);
    const [productCount, setProductCount] = useState(intialCount);
    const [increaseCount, setIncreaseCount] = useState(6);

    useEffect(() => {
        const updateCounts = () => {
            const width = window.innerWidth;

            if (width <= 580) {
                setInitialCount(5);
                setProductCount(5);
                setIncreaseCount(3);
            } else if (width <= 1199) {
                setInitialCount(8);
                setProductCount(8);
                setIncreaseCount(4);
            } else {
                setInitialCount(9);
                setProductCount(9);
                setIncreaseCount(6);
            }
        };

        updateCounts(); 

        window.addEventListener('resize', updateCounts); 

        return () => window.removeEventListener('resize', updateCounts); 
    }, []);




    useEffect(() => {
        const fetchProducts = async () => {
            if (category === 1) {
                const localFiltered = data.filter(product => product.rating > 3);

                const res1 = await fetch('https://dummyjson.com/products/category/laptops');
                const data1 = await res1.json();

                const res2 = await fetch('https://dummyjson.com/products/category/smartphones');
                const data2 = await res2.json();

                const filteredLaptops = data1.products.filter(p => p.rating > 3);
                const filteredSmartphones = data2.products.filter(p => p.rating > 3);

                const allProducts = ([...localFiltered, ...filteredLaptops, ...filteredSmartphones]);
                setProducts(allProducts.sort((a, b) => a.rating - b.rating));
            }

            else if (category === 2) {
                const localFiltered = data.filter(product => product.discountPercentage > 10.5);

                const res1 = await fetch('https://dummyjson.com/products/category/laptops');
                const data1 = await res1.json();

                const res2 = await fetch('https://dummyjson.com/products/category/smartphones');
                const data2 = await res2.json();

                const filteredLaptops = data1.products.filter(p => p.discountPercentage > 10.5);
                const filteredSmartphones = data2.products.filter(p => p.discountPercentage > 10.5);

                const allProducts = ([...localFiltered, ...filteredLaptops, ...filteredSmartphones]);
                setProducts(allProducts.sort((a, b) => a.discountPercentage - b.discountPercentage));
            }
            else if (category === 3) {
                const localFiltered = data.filter(product => product.price >= 1000);

                const res1 = await fetch('https://dummyjson.com/products/category/laptops');
                const data1 = await res1.json();

                const res2 = await fetch('https://dummyjson.com/products/category/smartphones');
                const data2 = await res2.json();

                const filteredLaptops = data1.products.filter(p => p.price >= 1000);
                const filteredSmartphones = data2.products.filter(p => p.price >= 1000);

                const allProducts = ([...localFiltered, ...filteredLaptops, ...filteredSmartphones]);
                setProducts(allProducts.sort((a, b) => b.price - a.price));
            }
            else if (category === 4) {
                const localFiltered = data.filter(product => product.price < 1000);

                const res1 = await fetch('https://dummyjson.com/products/category/laptops');
                const data1 = await res1.json();

                const res2 = await fetch('https://dummyjson.com/products/category/smartphones');
                const data2 = await res2.json();

                const filteredLaptops = data1.products.filter(p => p.price < 1000);
                const filteredSmartphones = data2.products.filter(p => p.price < 1000);

                const allProducts = ([...localFiltered, ...filteredLaptops, ...filteredSmartphones]);

                setProducts(allProducts.sort((a, b) => a.price - b.price));
            }
        };

        fetchProducts();
    }, [category]);

    return (

        <section className={style.popular_categories_section}>

            <h1>Popular Kategoriyalar</h1>
            <div className={style.popular_categories}>


                <div className={style.categories}>
                    <div className={`${style.category} ${category == 1 && style.isSelected}`} onClick={() => { setCategory(1); setProductCount(intialCount); }}>
                        <span><TbBasketStar /></span>

                        <div className={style.info}>
                            <h2>Reytingli Məhsullar</h2>
                        </div>
                    </div>

                    <div className={`${style.category} ${category == 2 && style.isSelected}`} onClick={() => { setCategory(2); setProductCount(intialCount); }}>
                        <span><TbBasketDiscount /></span>
                        <div className={style.info}>
                            <h2>Endirimli Məhsullar</h2>
                        </div>
                    </div>

                    <div className={`${style.category} ${category == 3 && style.isSelected}`} onClick={() => { setCategory(3); setProductCount(intialCount); }}>
                        <span><TbBasketUp /></span>

                        <div className={style.info}>
                            <h2>Bahalı Məhsullar</h2>
                        </div>
                    </div>

                    <div className={`${style.category} ${category == 4 && style.isSelected}`} onClick={() => { setCategory(4); setProductCount(productCount); }}>
                        <span><TbBasketDown /></span>

                        <div className={style.info}>
                            <h2>Ucuz Məhsullar</h2>
                        </div>
                    </div>

                </div>

                <div className={style.products_button}>


                    <div className={style.products}>
                        {products.slice(0, productCount).map((product) => (
                            <div className={style.product} key={product.id}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                    {productCount < products.length && (
                        <button className={style.show_more} onClick={() => setProductCount(prev => prev + increaseCount)}>
                            <span><FaArrowDown /></span>
                            <span>Daha çox göstər</span>
                        </button>
                    )}

                </div>

            </div>

        </section >
    )
}

