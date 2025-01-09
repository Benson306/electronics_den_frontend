import React from 'react'
import { Link } from 'react-router-dom';
import useCart from '../../utils/CartContext';
import { ToastContainer } from 'react-toastify';

function ProductCard({ hoodie }) {

    const { addToCart } = useCart();

    const handleAddToCart = (data)=>{
        addToCart({ ...data, quantity: 1 });
    }
  return (
    <div className="w-1/2 md:w-1/4 p-3 lg:shadow-md border border-gray-100 rounded-lg lg:mx-1 mb-1 bg-white">
        <ToastContainer />
        <Link
            to="/preview"
            className="block"
            key={hoodie.productName}
            state={{ data: hoodie }}
        >
            <div className="flex justify-center items-center h-28 lg:h-44">
                <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/${hoodie.image[0]}`}
                    width={200}
                    height={100}
                    alt=""
                    className="object-contain"
                />
            </div>

            <div className="text-center font-bold mt-5 overflow-hidden whitespace-nowrap text-ellipsis">
                {hoodie.productName}
            </div>
            <div className="text-center text-gray-700">
                Ksh {hoodie.price.toLocaleString()}
            </div>

            <div className='flex justify-center'>
                <button onClick={(e)=>{
                    e.preventDefault();
                    handleAddToCart(hoodie)
                }} className='bg-cyan-800 hover:bg-cyan-700 py-1 lg:py-2 p-2 text-white rounded-lg mt-2 mx-auto w-full lg:w-1/2 text-sm'>Add To Cart</button>
            </div>
        </Link>      
    </div>
  )
}

export default ProductCard
