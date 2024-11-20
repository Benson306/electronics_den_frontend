import { useLocation } from "react-router-dom";
//import he from 'he';
import { useEffect, useState } from "react";
import useCart from "../../utils/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Preview = () => {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    const data = location.state.data;

    // const html = he.decode(data.description);

    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);


    const handleAddToCart = ()=>{
        addToCart({ ...data, quantity: Number(quantity) });
    }


    return ( <div className="block lg:flex mt-10 lg:mt-20">
        <ToastContainer />
        <div className="invisible lg:visible h-0 lg:h-auto lg:w-1/2 flex justify-center">
            <img src={`${process.env.REACT_APP_API_URL}/uploads/${data.image || data.thumbnail}`} className="object-contain" width="400px" alt="" />
        </div>
        <div className="visible lg:invisible w-auto lg:w-0 flex justify-center">
            <img src={`${process.env.REACT_APP_API_URL}/uploads/${data.image || data.thumbnail}`} className="object-contain" width="220px" alt="" />
        </div>

        <div className="w-full lg:w-1/2 lg:pr-52 p-10">
           <div className="font-serif text-gray-800 text-bold lg:text-2xl tracking-wider pb-1 lg:pb-3">{data.productName || data.title}</div> 
           
           <form>

                <div>
                    <div className="flex gap-2 items-center my-2 text-sm">
                        <div className="">Category:</div>
                        <div className="flex flex-wrap gap-1">{data.type.map( tp => <span className="bg-gray-300 rounded-lg px-2 py-1">{tp}</span>)}</div>            
                    </div>
                    <div className="text-gray-500 pb-4 lg:pb-5 whitespace-pre-wrap text-xs lg:text-sm">{data.description}</div>
                    <div className="text-gray-600 pb-4 lg:pb-5">Ksh {data.price}</div>
                    <hr />
                    <div className="flex py-4">
                            <div className="text-gray-500 w-20 flex items-center">Quantity</div>
                            <select 
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 p-1 lg:p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e)=> setQuantity(e.target.value)}
                            >
                                <option value={1}>1</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5</option>
                            </select>                
                    </div>
                </div>
                
           </form>
           <hr />

           {/* <div className="text-bold py-8">Description</div>

           <div className="break-words" dangerouslySetInnerHTML={{ __html: html}} /> */}

           <button className="collapse lg:visible w-52 mt-10 flex justify-center p-1 border-2 border-black hover:bg-black hover:text-white" onClick={() => handleAddToCart()}>
            ADD TO CART
           </button>

        
        </div>
        <button className="visible lg:collapse fixed bottom-0 bg-blue-950 text-white text-center w-full lg:w-0 p-4 text-bold tracking-wider font-serif" onClick={() => handleAddToCart()}>
            ADD TO CART
        </button>
        
    </div> );
}
 
export default Preview;