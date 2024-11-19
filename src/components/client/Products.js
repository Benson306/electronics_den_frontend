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

            {/* All Products Section */}
            <div className="flex-grow">
                <div className="text-center mt-5 text-gray-950 font-serif text-sm tracking-wider">
                    All Products
                </div>
                {loading && (
                    <div className="text-center text-slate-500 text-md mb-5">Loading...</div>
                )}
                <div className="text-center text-slate-500 text-md mb-5">
                    {!loading && `(${hoodies.length} items)`}
                </div>

                <div className="flex flex-wrap justify-center mx-2 lg:mx-16">
                    {!loading &&
                        hoodies.map((hoodie) => (
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
