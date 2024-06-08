import React from 'react';
import Button from '../Shared/Button';

const ProductCard = ({ data }) => {
    return (
        <div className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 place-items-center">
                {/* card section */}
                {data.map((data) => (
                    <div data-aos="fade-up" data-aos-delay={data.aosDelay} className="group" key={data.id}>
                        <div className="relative">
                            <img src={data.img} alt="" className="h-[250px] w-[260px] object-cover rounded-md" />
                            {/* hover button */}
                            <div className="hidden group-hover:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 h-full w-full text-center group-hover:backdrop-blur-sm justify-center items-center duration-200 rounded-md space-x-2">
                                <Button text={'Add to cart'} bgColor={'bg-primary'} textColor={'text-white'} textSize={'text-lg'} />{' '}
                                {/* Adjust button size */}
                                <Button text={'Detail'} bgColor={'bg-gray-300'} textColor={'text-gray-700'} textSize={'text-sm'} />{' '}
                                {/* Adjust button size */}
                            </div>
                        </div>
                        <div className="leading-7">
                            <div className="flex items-center justify-between mb-1">
                                {' '}
                                {/* Add flex container */}
                                <h2 className="font-semibold">{data.title}</h2>
                            </div>
                            <h2 className="font-bold">${data.price}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCard;
