import useCart from "../../utils/CartContext";
import ClearIcon from '@mui/icons-material/Clear';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {

    const { products, total, removeFromCart } = useCart();

    const handleRemoveFromCart = (product) =>{
        removeFromCart(product)
    }


    return ( <div>
        { products.length > 0 ? 
        <div>
            <div className="text-center font-semibold font-mono mt-16 lg:ml-8">Your Cart</div>
            <div className="text-center mt-1 text-gray-500 lg:ml-8 mb-10">{products.length} item(s)</div>

            { products.map(product =>(
                <div className="flex justify-center lg:justify-around mx-5 lg:mx-80 mb-5 lg:mb-3">
                    
                    <img  src={require(`../../productImages/${product.image}`) } className="w-20 h-20 lg:w-44 lg:h-auto"/>
                    
                    
                    <div className="block lg:flex lg:gap-10  lg:justify-around text-sm lg:text-base ">
                        <div className="flex items-center text-xs lg:text-base w-52 lg:w-72 font-bold lg:font-normal">{product.title}</div>
                        <div className="flex py-4 w-10 lg:w-28">
                                <div className="text-gray-500 w-10 lg:w-10 flex items-center">Qty:</div>
                                <div className="flex items-center">
                                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-16 p-1 lg:p-2.5 dark:bg-gray-700 h-8 lg:h-10  dark:border-gray-600  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option value={1}>1</option>
                                    <option value={1}>2</option>
                                    <option value={1}>3</option>
                                    <option value={1}>4</option>
                                    <option value={1}>5</option>
                                </select>   
                                </div>             
                        </div>
                        <div className="flex items-center lg:w-14">Size: M</div>
                        <div className="flex items-center lg:w-20">Ksh {product.price}</div>
                    </div>
                    <div className="flex items-center">
                        <ClearIcon onClick={()=> handleRemoveFromCart(product)} />
                    </div>
                </div>
            )) 
            }

            <div className="flex justify-end gap-4 p-10 lg:gap-20 mr-0 lg:mr-96 mt-5 lg:mt-1">
                <div className="text-bold">Total:</div>
                <div className="text-bold">Ksh.{total}</div>
                <div className="collapse lg:visible w-52 flex justify-center p-1 border-2 border-black" >
                    CHECKOUT
            </div>
            </div>

            <div className="visible lg:collapse fixed bottom-0 bg-blue-950 text-white text-center w-full lg:w-0 p-4 text-bold tracking-wider font-serif" >
                CHECKOUT
            </div>
        </div> 
        
        : 
            <div className="flex justify-center mt-10 lg:mt-20 tracking-widest text-gray-600">Your <div className="mx-3"><ShoppingCartIcon /></div> is empty</div>
        }
    </div> );
}
 
export default Cart;