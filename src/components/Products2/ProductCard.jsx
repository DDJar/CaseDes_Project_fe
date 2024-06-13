import React from 'react';
import Button from '../Shared/Button';
import { Link } from 'react-router-dom';
import { AddItemToCart } from "../../service/CartService";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const ProductCard = ({ data }) => {
    const navigate = useNavigate();
    const handleAddToCart = (productId, quantity, price) => {
        const userIdCookie = Cookies.get("userId");
        if(userIdCookie){
            const userId = JSON.parse(userIdCookie);
            AddItemToCart(
            productId,
            quantity,
              userId,
              1*price,
              "unpaid"
            );
            navigate("/carts");
        }
      };
    return (
        <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
                {/* card section */}
                {data.map((data) => (
                    <div data-aos="fade-up" data-aos-delay={data.aosDelay} className="group" key={data._id}>
                        <div className="relative">
                            <img src={data.images} alt="" className="h-[250px] w-[260px] object-cover rounded-md" />
                            {/* hover button */}
                            <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md space-x-2">
                          <Button text={'Add to cart'}  bgColor={'bg-primary'} textColor={'text-white'} textSize={'text-lg'} />{' '}
                              
                                {/* Adjust button size */}
                                <Link
                        key={data._id}
                        to={`/products/${data._id}`}
                        className="group"
                      >
                                <Button handler={handleAddToCart(data._id,1,data?.price?.amount)} text={'Detail'} bgColor={'bg-gray-300'} textColor={'text-gray-700'} textSize={'text-sm'} />{' '}
                                {/* Adjust button size */}
                                </Link>
                            </div>
                        </div>
                        <div className="leading-7">
                            <div className="flex items-center justify-between mb-1">
                                {' '}
                                {/* Add flex container */}
                                <h2 className="font-semibold">{data.name}</h2>
                            </div>
                            <h2 className="font-bold">${data?.price?.amount}{" "}
                              {data?.price?.currency}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCard;
