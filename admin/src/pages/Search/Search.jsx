import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Search.css';
import { assets } from '../../assets/assets';

const Search = ({ url }) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // Fetch menu items from API
        const response = await fetch(`${url}/api/food/list`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        
        const data = await response.json();
        const items = data.data || data;
        
        // Filter items based on search query
        const filteredItems = items.filter(item => 
          item.name?.toLowerCase().includes(query.toLowerCase()) || 
          item.description?.toLowerCase().includes(query.toLowerCase()) ||
          item.category?.toLowerCase().includes(query.toLowerCase())
        );
        
        setResults(filteredItems);
      } catch (error) {
        toast.error('Error searching menu items');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query, url]);

  return (
    <div className="search-results-container">
      <h1 className="page-title">Search Results for "{query}"</h1>
      
      {loading ? (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Searching...</p>
        </div>
      ) : (
        <>
          <div className="results-info">
            <p>{results.length} results found</p>
          </div>
          
          {results.length > 0 ? (
            <div className="search-results-grid">
              {results.map((item) => (
                <div className="result-card" key={item._id}>
                  <div className="result-image">
                    <img 
                      src={item.image ? 
                        (item.image.startsWith('http') ? item.image : `${url}/uploads/food/${item.image}`) 
                        : item.img ? 
                        (item.img.startsWith('http') ? item.img : `${url}/uploads/food/${item.img}`) 
                        : assets.food_1} 
                      alt={item.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = assets.food_1;
                      }}
                    />
                  </div>
                  <div className="result-details">
                    <h3 className="result-name">{item.name}</h3>
                    <p className="result-category">{item.category || 'Uncategorized'}</p>
                    <p className="result-price">${item.price?.toFixed(2) || '0.00'}</p>
                    <p className="result-description">
                      {item.description?.length > 100 
                        ? `${item.description.substring(0, 100)}...` 
                        : item.description || 'No description available'}
                    </p>
                    <div className="result-actions">
                      <Link to={`/edit/${item._id}`} className="btn btn-primary btn-sm">
                        Edit
                      </Link>
                      <Link to={`/list`} className="btn btn-secondary btn-sm">
                        View All Items
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <img src={assets.search_icon} alt="No results" />
              <h2>No results found</h2>
              <p>Try different keywords or check for typos</p>
              <Link to="/list" className="btn btn-primary">
                View All Menu Items
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search; 