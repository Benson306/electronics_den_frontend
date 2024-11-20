import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [hoodies, setHoodies] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/get_products`)
            .then((res) => res.json())
            .then((res) => {
                setHoodies(res);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setError(true);
            });
    }, []);

    const currentYear = new Date().getFullYear();

    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_URL}/get_categories`)
        .then(res => res.json())
        .then(data => {
            setCategories(data);
            setLoading(false);
        })
        .catch(()=>{
            setError(true);
            setLoading(false);
        })
    },[])

    const [ selectedCategory, setSelectedCategory] = useState(null);

    const filteredData = hoodies.filter((item) => {
        if (selectedCategory === '' || selectedCategory === null) {
          return item;
        } else if (item.type && item.type.includes(selectedCategory)) {
          return item;
        }
      });


    return (
        <div className="min-h-screen flex flex-col">
            {/* Banner */}
            <div>
                <img
                    src={require('../../images/Home_of_electronic_copy.png')}
                    className="object-cover w-full max-h-[400px]"
                    alt=""
                />
            </div>

            <div className='w-full'>
                <div className="flex justify-center lg:justify-end gap-2 text-sm items-center mt-2 lg:mt-5 lg:mr-5">
                    <div>Sort By Category: </div>
                    <select 
                        onChange={e => {
                            if(e.target.value == "All"){
                                setSelectedCategory(null);
                            }else{
                                setSelectedCategory(e.target.value);
                            }
                        }} 
                        className="p-1 border border-gray-400 rounded-md"
                    >
                        <option value={null}>All Electronics</option> 
                        {
                            !loading && !error && categories.length > 0 && categories.map(category => 
                            ( 
                                <option value={category.category}>{category.category}</option> 
                            )
                        )}
                    </select>
                </div>
            </div>
            
            <div className='flex gap-2'>
                <div className='mt-10 ml-0 lg:ml-14 collapse lg:visible h-0 lg:h-full w-0 lg:w-1/6'>
                    <div className='font-bold'>CATEGORIES</div>
                        { loading && <div className='text-gray-700'>Loading ...</div>}
                        <div className='mt-2'>
                            <button 
                                onClick={() => {
                                    setSelectedCategory(null);
                                }
                                } 
                                className='text-gray-700 hover:text-gray-900'
                            >
                                All
                            </button>
                        </div>
                        {
                            !loading && !error && categories.map(category => 
                                (
                                    <div className='mt-2'>
                                        <button 
                                            onClick={() => {
                                                setSelectedCategory(category.category);
                                            }
                                            } 
                                            className='text-gray-700 hover:text-gray-900'
                                        >
                                            {category.category}
                                        </button>
                                    </div>
                                )
                            )
                        }        
                </div>

                {/* All Products Section */}
                <div className="flex-grow">
                    <div className="text-center mt-5 text-gray-950 font-serif text-sm tracking-wider">
                        {selectedCategory == null ?  (<div>All Products</div>) : selectedCategory}
                    </div>
                    {loading && (
                        <div className="text-center text-slate-500 text-md mb-5">Loading...</div>
                    )}
                    <div className="text-center text-slate-500 text-md mb-5">
                        {!loading && `(${filteredData.length} items)`}
                    </div>

                    <div className="flex flex-wrap justify-center mx-2 lg:mx-2">
                        {!loading &&
                            filteredData.map((hoodie) => (
                                <Link
                                    to="/preview"
                                    className="w-1/2 md:w-1/4 p-3 lg:shadow-md border border-gray-100 rounded-lg lg:mx-1 mb-1"
                                    key={hoodie.productName}
                                    state={{ data: hoodie }}
                                >
                                    <div className="flex justify-center items-center">
                                        <img
                                            src={`${process.env.REACT_APP_API_URL}/uploads/${hoodie.image}`}
                                            width="200px"
                                            alt=""
                                            className="object-contain"
                                        />
                                    </div>

                                    <div className="text-center font-bold mt-5">
                                        {hoodie.productName}
                                    </div>
                                    <div className="text-center text-gray-700">
                                        Ksh {hoodie.price.toLocaleString()}
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>  
            </div>

            {/* Footer */}
            <div className="mt-5 text-center p-5 text-xs bg-gray-100 border-t border-gray-300">   
                <div className='flex gap-1 justify-center items-center my-1'>
                    <PhoneIcon sx={{fontSize:16}} />
                    <span className=''>0797486506</span>
                </div>
                <div className='gap-1 justify-center items-center'>
                    <LocationOnIcon sx={{fontSize:16}} /> REHEMA HSE 6TH FLOOR 01 - ALONG STANDARD STREET, NAIROBI 
                </div>
                <div className='mt-2'>© {currentYear} Copyright Electronics Den</div>
            </div>
        </div>
    );
};

export default Products;
