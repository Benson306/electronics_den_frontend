import { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ToastContainer } from 'react-toastify';
import Footer from './Footer';
import ProductCard from './ProductCard';
import CarouselSection from './CarouselSection';

const Products = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch products
        fetch(`${process.env.REACT_APP_API_URL}/get_products`)
            .then((res) => res.json())
            .then((res) => {
                setProducts(res);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
                setError(true);
            });
    }, []);

    useEffect(() => {
        // Fetch categories
        fetch(`${process.env.REACT_APP_API_URL}/get_categories`)
            .then((res) => res.json())
            .then((data) => {
                const initializedCategories = data.map((cat) => ({
                    ...cat,
                    selectedSubCategory: null, // Initialize subcategory
                }));
                setCategories(initializedCategories);
                setLoading(false);
            })
            .catch(() => {
                setError(true);
                setLoading(false);
            });
    }, []);

    const handleSubCategoryFilter = (categoryName, subCategory) => {
        const updatedCategories = categories.map((cat) => {
            if (cat.category === categoryName) {
                return { ...cat, selectedSubCategory: subCategory };
            }
            return cat;
        });
        setCategories(updatedCategories);
    };

    const filteredProducts = (categoryName, subCategory) => {
        return products.filter((product) => {
            const matchesCategory = product.type?.includes(categoryName);
            const matchesSubCategory = !subCategory || product.sub_category?.includes(subCategory);
            const matchesSearchQuery =
                searchQuery === '' ||
                product.productName.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesCategory && matchesSubCategory && matchesSearchQuery;
        });
    };

    return (
        <div className="min-h-screen">
            <ToastContainer />

            {/* Search Bar */}
            <div className="flex items-center justify-center my-5">
                <div className="border border-gray-400 rounded-lg flex items-center w-11/12 lg:w-1/2">
                    <div className="flex items-center justify-center w-1/6">
                        <SearchIcon sx={{ fontSize: 24 }} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by product name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 w-full text-sm lg:text-base"
                    />
                </div>
            </div>

            <CarouselSection />

            {/* Categories and Products */}
            <div className="mt-5">
                {loading && <div className="text-center text-gray-700">Loading...</div>}
                {error && <div className="text-center text-red-500">Failed to load products.</div>}

                {!loading &&
                    !error &&
                    categories.map((category, index) => (
                        <div 
                        key={category.category} 
                        className={`mb-5 lg:mb-10  ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-200'
                        }`}
                        >
                            {/* Category Header */}
                            <div className="flex justify-between items-center mx-2 lg:mx-10 pt-4">
                                <h2 className="text-sm lg:text-base font-bold text-gray-900 uppercase">{category.category}</h2>
                                <select
                                    className="p-1 border border-gray-400 rounded-md text-sm"
                                    onChange={(e) => handleSubCategoryFilter(category.category, e.target.value)}
                                >
                                    <option value="">All Subcategories</option>
                                    {category.sub_categories.map((subCategory, index) => (
                                        <option key={index} value={subCategory}>
                                            {subCategory}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Horizontal Scroll */}
                            <div className="overflow-x-auto mt-3 mx-2 lg:mx-10 pb-5 mb-2">
                                <div className="flex gap-4 mx-2 my-2">
                                    {
                                    filteredProducts(category.category, category.selectedSubCategory).length > 0 ? 
                                        filteredProducts(category.category, category.selectedSubCategory).map((product) => (
                                            <ProductCard key={product.id} hoodie={product} />
                                        ))
                                    : 
                                        <div className='text-center text-gray-500'>No items found</div>
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Products;
