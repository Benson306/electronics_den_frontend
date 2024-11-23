import { useLocation } from "react-router-dom";
//import he from 'he';
import { useEffect, useState } from "react";
import useCart from "../../utils/CartContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReadMoreText from "./ReadMoreText";
import ImageZoom from "./ImageZoom";
import YouTubeIcon from '@mui/icons-material/YouTube';


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

    const [displayImageIndex, setDisplayImageIndex] = useState(0);

    const handlePrevBtn = () => {
        if (displayImageIndex > 0) {
            setDisplayImageIndex(displayImageIndex - 1);
        } else {
            setDisplayImageIndex(data.image.length - 1); // Wrap around to the last image
        }
    }
    
    const handleNextBtn = () => {
        if (displayImageIndex < data.image.length - 1) {
            setDisplayImageIndex(displayImageIndex + 1);
        } else {
            setDisplayImageIndex(0); // Wrap around to the first image
        }
    }

    function getVideoId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url?.match(regExp);
    
        return (match && match[2].length === 11)
          ? match[2]
          : null;
    }


    return ( <div className="block lg:flex mt-5 lg:mt-10">
        <ToastContainer />
        {/* <div className="invisible lg:visible h-0 lg:h-auto lg:w-1/2 flex justify-center">
            <img src={`${process.env.REACT_APP_API_URL}/uploads/${data.image[0]}`} className="object-contain" width="400px" alt="" />
        </div>
        <div className="visible lg:invisible w-auto lg:w-0 flex justify-center">
            <img src={`${process.env.REACT_APP_API_URL}/uploads/${data.image[0]}`} className="object-contain" width="220px" alt="" />
        </div> */}

        <div className="w-3/6 hidden lg:block">
            {/* Image section with zoom */}
            <div className="flex items-center gap-5 justify-center">
                <div onClick={handlePrevBtn} className="bg-black hover:bg-gray-500 text-white text-xl rounded-3xl px-2 cursor-pointer">{"<"}</div>
                <ImageZoom imageUrl={`${process.env.REACT_APP_API_URL}/uploads/${data.image[displayImageIndex]}`} />
                <div onClick={handleNextBtn} className="bg-black hover:bg-gray-500 text-white text-xl rounded-3xl px-2 cursor-pointer">{">"}</div>
            </div>
            <div className="flex justify-center gap-5 mt-5 w-3/4 mx-10">
                {
                    data.image.map((pic, index) => (
                        <div className="h-20 w-20">
                            <img 
                                onClick={()=>{
                                    setDisplayImageIndex(index);
                                }}
                                src={`${process.env.REACT_APP_API_URL}/uploads/${pic}`} 
                                className="object-cover border bg-white p-2 h-full w-full hover:border-gray-500 cursor-pointer" 
                                alt={data.productName} 
                            />
                        </div>
                    ))
                }
            </div>
        </div>

        {/* Mobile view for image (non-zoomed) */}
        <div className="lg:hidden flex items-center gap-5 justify-center">
            <div onClick={handlePrevBtn} className="bg-black hover:bg-gray-500 text-white text-xl rounded-3xl px-2 cursor-pointer">{"<"}</div>
            <img 
                src={`${process.env.REACT_APP_API_URL}/uploads/${data.image[displayImageIndex]}`} 
                className="object-contain w-4/6" 
                alt={data.productName} 
            />
            <div onClick={handleNextBtn} className="bg-black hover:bg-gray-500 text-white text-xl rounded-3xl px-2 cursor-pointer">{">"}</div>
        </div>

        <div className="lg:hidden flex justify-center gap-5 mt-5 w-3/4 mx-10">
            {
                data.image.map((pic, index) => (
                    <div className="h-20 w-20">
                        <img
                            onClick={()=>{
                                setDisplayImageIndex(index);
                            }} 
                            src={`${process.env.REACT_APP_API_URL}/uploads/${pic}`} 
                            className="object-cover border bg-white p-2 h-full w-full" 
                            alt={data.productName} 
                        />
                    </div>
                ))
            }
        </div>

        <div className="w-full lg:w-1/2 lg:pr-52 p-10">
           <div className="font-serif text-gray-800 text-bold lg:text-2xl tracking-wider pb-1 lg:pb-3">{data.productName || data.title}</div> 
           
                <div>
                    <div className="flex gap-2 items-center my-2 text-sm">
                        <div className="">Category:</div>
                        <div className="flex flex-wrap gap-1 text-xs lg:text-sm">{data.type.map( tp => <span className="bg-gray-300 rounded-lg px-2 py-1">{tp}</span>)}</div>            
                    </div>
                    {/* <div className="text-gray-500 pb-2 lg:pb-2 whitespace-pre-wrap text-xs ">{data.description}</div> */}
                    { data ? <ReadMoreText description={data.description} /> : null }

                    {
                        data.links.length > 0 && <div className="flex items-center text-sm gap-2 mt-5 mb-2">
                        <YouTubeIcon sx={{color: "red"}} />
                        Get to know more about the product from Youtube:
                    </div> }
                    <div className="mb-5 block lg:flex mx-auto lg:mx-0 gap-4 w-full">
                    {
                        data.links && data.links.length > 0 && data.links.map(link => (
                        <div
                            className="text-xs text-blue-500 hover:text-blue-400 underline overflow-hidden whitespace-nowrap text-ellipsis px-2 mb-5"
                        >
                            <iframe allowFullScreen={true} width="280" height="200"
                                src={`https://www.youtube.com/embed/${getVideoId(link)}?autoplay=0&mute=1` }>
                            </iframe>
                            {/* <a href={link} target="_blank" rel="noopener noreferrer">
                            {link}
                            </a> */}
                        </div>
                        )) 
                    }
                    </div>

                    <div className="text-gray-600 pb-4 lg:pb-5">Ksh {data.price.toLocaleString()}</div>
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
                
           <hr />

           {/* <div className="text-bold py-8">Description</div>

           <div className="break-words" dangerouslySetInnerHTML={{ __html: html}} /> */}

           <button className="collapse lg:visible w-52 mt-10 flex justify-center p-1 border-2 border-black hover:bg-black hover:text-white" onClick={() => handleAddToCart()}>
            ADD TO CART
           </button>

        
        </div>
        <button className="visible lg:collapse fixed bottom-0 bg-blue-900 text-white text-center w-full lg:w-0 p-4 text-bold tracking-wider font-serif" onClick={() => handleAddToCart()}>
            ADD TO CART
        </button>
        
    </div> );
}
 
export default Preview;