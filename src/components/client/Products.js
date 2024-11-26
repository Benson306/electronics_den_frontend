import { useEffect, useState } from 'react';
import CarouselSection from './CarouselSection';
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer } from 'react-toastify';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Footer from './Footer';
import ProductCard from './ProductCard';

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [hoodies, setHoodies] = useState([]);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const filteredData = hoodies.filter((item) => {

        const matchesSubCategory =
            selectedSubCategory === null || 
            item.sub_category?.includes(selectedSubCategory);
    
        const matchesSearchQuery =
            searchQuery === '' ||
            item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sub_category?.some((type) =>
                type.toLowerCase().includes(searchQuery.toLowerCase())
            );
    
        return matchesSubCategory && matchesSearchQuery;
    });
    
    const [hoveredCategory, setHoveredCategory] = useState(null);


    return (
        <div className="min-h-screen">
            <ToastContainer />
            {/* Search Bar */}
            <div className="flex items-center justify-center my-0 lg:my-2 mx-5">
                <div className='border border-gray-400 rounded-lg flex items-center w-11/12 lg:w-1/2'>
                    <div className='flex items-center justify-center w-1/6'>
                        <SearchIcon sx={{fontSize: 24}} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by product name or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 w-full text-sm lg:text-base"
                    />
                </div>
            </div>

            <CarouselSection />

            { /* Search By Category and Subcategory */}
            <div className="w-full">
                <div className="flex flex-wrap justify-center lg:justify-end gap-2 text-sm items-center mt-2 lg:mt-5 lg:mr-5">
                    <div>Sort By Category:</div>
                    <select
                        onChange={(e) => {
                            if (e.target.value === "All") {
                                setSelectedCategory(null);
                                setSelectedSubCategory(null);
                            } else {
                                setSelectedCategory(e.target.value);
                                setSelectedSubCategory(null); // Reset subcategory when category changes
                            }
                        }}
                        className="p-1 border border-gray-400 rounded-md w-40"
                    >
                        <option value="All">All Electronics</option>
                        {!loading &&
                            !error &&
                            categories.length > 0 &&
                            categories.map((category) => (
                                <option key={category.category} value={category.category}>
                                    {category.category}
                                </option>
                            ))}
                    </select>

                    {/* Show Subcategories if a Category is Selected */}
                    {selectedCategory && (
                        <div className="flex items-center">
                            <div>Subcategory:</div>
                            <select
                                onChange={(e) => {
                                    if (e.target.value === "All") {
                                        setSelectedSubCategory(null);
                                    } else {
                                        setSelectedSubCategory(e.target.value);
                                    }
                                }}
                                className="p-1 border border-gray-400 rounded-md w-40 ml-2"
                            >
                                <option value="All">All</option>
                                {categories
                                    .find((category) => category.category === selectedCategory)
                                    ?.sub_categories.map((subCategory, index) => (
                                        <option key={index} value={subCategory}>
                                            {subCategory}
                                        </option>
                                    ))}
                            </select>
                        </div>
                    )}
                </div>
            </div>

            
            {/* Body Section */}
            <div className='block lg:flex mx-2 lg:mx-5 gap-2 min-h-screen'>
                {/* Left Pane - Categories */}
                <div className="mt-10 ml-5 collapse lg:visible h-0 lg:h-full w-0 lg:w-1/6 sticky top-10">
                    <div className="font-bold">CATEGORIES</div>
                    { loading && <div className="text-gray-700">Loading ...</div>}
                    <div className="mt-2">
                        <button
                            onClick={() => {
                                //setSelectedCategory(null);
                                setSelectedSubCategory(null);
                            }}
                            className="text-gray-700 hover:text-gray-900 px-1 py-2"
                        >
                            All Products
                        </button>
                    </div>
                    {!loading && !error && categories.map((category, index) => (
                        <div
                            key={index}
                            className="mt-2 relative group"
                            onMouseEnter={() => setHoveredCategory(category)}
                            onMouseLeave={() => setHoveredCategory(null)}
                        >
                            <div className='flex justify-between items-center hover:bg-gray-100'>
                                <button
                                    onClick={() => {
                                        //setSelectedCategory(category.category);
                                    }}
                                    className="text-gray-700 hover:text-gray-900 py-2 px-1"
                                >
                                    {category.category}
                                </button>
                                <div>
                                    <ArrowRightIcon sx={{fontSize: 20}} />
                                </div>
                            </div>

                            {/* Subcategories */}
                            {hoveredCategory === category && category.sub_categories && (
                                <div className="absolute left-full top-0 bg-white shadow-lg border z-10 rounded-sm w-44">
                                    {/* <div className="font-semibold text-gray-700 mb-2">Subcategories:</div> */}
                                    {category.sub_categories.map((subCategory, subIndex) => (
                                        <div 
                                        key={subIndex} 
                                        className="text-gray-600 hover:text-gray-800 cursor-pointer py-2 px-3 hover:bg-gray-100"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedSubCategory(subCategory);
                                            //setSelectedCategory(category.category); // Optional: Keep the main category in context
                                        }}
                                        >
                                            {subCategory}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* All Products Section */}
                <div className="block w-full lg:w-5/6">
                    <div className="text-center mt-2 lg:mt-5 text-gray-900 font-serif text-sm tracking-wider">
                        {selectedSubCategory == null ?  (<div>All Products</div>) : selectedSubCategory}
                    </div>
                    {loading && (
                        <div className="text-center text-slate-500 text-md mb-5">Loading...</div>
                    )}
                    <div className="text-center text-slate-500 text-md mb-5">
                        {!loading && `(${filteredData.length} items)`}
                    </div>

                    <div className="flex flex-wrap justify-center mx-2 lg:mx-2 gap-0 lg:gap-3">
                        {!loading && filteredData.map((hoodie) => (
                            <ProductCard hoodie={hoodie} />
                        ))}                       
                    </div>
                </div>  
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Products;
