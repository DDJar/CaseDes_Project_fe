import React,{useState,useEffect} from 'react';
import Heading from '../Shared/Heading';
import ProductCard from './ProductCard';
import { useEffect } from 'react';
import { getProductList } from '../../service/ProductService';
// images import
import Img1 from '../../assets/casdes/13.png';
import Img2 from '../../assets/casdes/14.png';
import Img3 from '../../assets/casdes/15.png';
import Img4 from '../../assets/casdes/16.png';
import Img5 from '../../assets/casdes/17.png';
import Img6 from '../../assets/casdes/18.png';
import Img7 from '../../assets/casdes/19.png';

const ProductsData = [
    {
        id: 1,
        img: Img1,
        title: 'Boat Headphone',
        price: '120',
        aosDelay: '0',
    },
    {
        id: 2,
        img: Img2,
        title: 'Rocky Mountain',
        price: '420',
        aosDelay: '200',
    },
    {
        id: 3,
        img: Img3,
        title: 'Goggles',
        price: '320',
        aosDelay: '400',
    },
    {
        id: 4,
        img: Img4,
        title: 'Printed ',
        price: '220',
        aosDelay: '600',
    },
];
const ProductsData2 = [
    {
        id: 1,
        img: Img5,
        title: 'Boat Headphone',
        price: '120',
        aosDelay: '0',
    },
    {
        id: 2,
        img: Img6,
        title: 'Rocky Mountain',
        price: '420',
        aosDelay: '200',
    },
    {
        id: 3,
        img: Img7,
        title: 'Goggles',
        price: '320',
        aosDelay: '400',
    },
    {
        id: 4,
        img: Img5,
        title: 'Printed ',
        price: '220',
        aosDelay: '600',
    },
];
const Products = () => {
    const [product,setProduct] = useState([])
    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        try {
            const productList = await getProductList();
            console.log(productList);
            const firstTenProducts = Array.isArray(productList) ? productList.slice(0, 10) : [];
            setProduct(firstTenProducts);
        } catch (error) {
          console.error("Error fetching product data:", error);
        }
      };
    return (
        <div>
            <div className="container">
                {/* Header section */}
                <Heading title="Our Products" subtitle={'Explore Our Products'} />
                {/* Body section */}
                <ProductCard data={product} />
            </div>
        </div>
    );
};

export default Products;
