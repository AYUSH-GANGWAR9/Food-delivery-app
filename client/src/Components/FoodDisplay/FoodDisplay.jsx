import React, { useContext, useEffect, useState } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../Fooditem/FoodItem'
import { motion, AnimatePresence } from 'framer-motion'

const FoodDisplay = ({category, searchQuery = ''}) => {
    const {food_list} = useContext(StoreContext);
    const [loading, setLoading] = useState(true);

    // Debug log for search query
    useEffect(() => {
        console.log("FoodDisplay component - searchQuery:", searchQuery);
    }, [searchQuery]);

    // Simulate loading for better UX
    useEffect(() => {
        if (food_list.length > 0) {
            const timer = setTimeout(() => {
                setLoading(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [food_list]);

    const filteredItems = food_list.filter(item => {
        const matchesCategory = category === "All" || category === item.category;
        const matchesSearch = searchQuery.trim() === '' || 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Debug log for filtered items
    useEffect(() => {
        console.log("Filtered Items:", filteredItems);
    }, [filteredItems]);

    // Render skeleton loaders while loading
    const renderSkeletons = () => {
        return Array(8).fill(0).map((_, index) => (
            <div key={`skeleton-${index}`}>
                <div className="food-item-skeleton">
                    <div className="skeleton-img"></div>
                    <div className="skeleton-content">
                        <div className="skeleton-line title"></div>
                        <div className="skeleton-line desc"></div>
                        <div className="skeleton-line desc"></div>
                        <div className="skeleton-line price"></div>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div className='food-display' id='food-display'> 
            <h2>
                {searchQuery.trim() !== '' 
                    ? `Search Results for "${searchQuery}"`
                    : 'Top Dishes near you'
                }
            </h2>
            
            {!loading && searchQuery.trim() !== '' && (
                <div className="search-status">
                    <div className="search-count">
                        Found <strong>{filteredItems.length}</strong> item{filteredItems.length !== 1 ? 's' : ''}
                    </div>
                    {category !== "All" && (
                        <div className="filter-tags">
                            <div className="filter-tag">
                                Category: {category}
                                <span>×</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
            
            <motion.div 
                className="food-display-list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                {loading ? (
                    renderSkeletons()
                ) : (
                    <AnimatePresence>
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <FoodItem 
                                    id={item._id}
                                    name={item.name}
                                    description={item.description}
                                    price={item.price}
                                    image={item.image}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
                
                {!loading && filteredItems.length === 0 && (
                    <motion.div 
                        className="no-results"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <img 
                            src="/no-results.svg" 
                            alt="No results found" 
                            style={{ filter: 'var(--icon-filter)' }}
                        />
                        <h3>No matching items found</h3>
                        <p>Try adjusting your search or filter to find what you're looking for.</p>
                        <button onClick={() => window.location.reload()}>
                            Reset Filters
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    )
}

export default FoodDisplay
