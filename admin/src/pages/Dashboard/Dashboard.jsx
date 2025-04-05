import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';

const Dashboard = ({ url }) => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    totalItems: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topItems, setTopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsLoading, setItemsLoading] = useState(true);

  // Mock data - replace with actual API calls in production
  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      setStats({
        totalOrders: 256,
        pendingOrders: 12,
        totalRevenue: 8520,
        totalItems: 48
      });

      setRecentOrders([
        { id: 'ORD-1092', customer: 'John Doe', date: '2023-04-05', total: 89.99, status: 'Delivered' },
        { id: 'ORD-1091', customer: 'Alice Smith', date: '2023-04-05', total: 124.50, status: 'Processing' },
        { id: 'ORD-1090', customer: 'Ryan Johnson', date: '2023-04-04', total: 45.75, status: 'Pending' },
        { id: 'ORD-1089', customer: 'Emma Wilson', date: '2023-04-04', total: 68.25, status: 'Delivered' },
        { id: 'ORD-1088', customer: 'Michael Brown', date: '2023-04-03', total: 33.99, status: 'Delivered' }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  // Fetch menu items from database
  useEffect(() => {
    const fetchMenuItems = async () => {
      setItemsLoading(true);
      try {
        // First try with /api/food/list endpoint
        let response;
        let success = false;
        
        try {
          console.log("Attempting to fetch from /api/food/list...");
          response = await fetch(`${url}/api/food/list`);
          if (response.ok) {
            const result = await response.json();
            if (result && (result.data || Array.isArray(result))) {
              success = true;
              const data = result.data || result;
              console.log('Food items fetched successfully:', data);
              
              // Sort by rating to get most popular items
              const sortedItems = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0));
              
              // Take the top 4 items
              const popularItems = sortedItems.slice(0, 4).map(item => {
                // Determine image URL
                let imageUrl;
                if (item.image) {
                  // If image is a full URL
                  if (item.image.startsWith('http')) {
                    imageUrl = item.image;
                  } else {
                    // If image is just a filename
                    imageUrl = `${url}/uploads/${item.image}`;
                  }
                } else if (item.img) {
                  // Same logic for 'img' field
                  if (item.img.startsWith('http')) {
                    imageUrl = item.img;
                  } else {
                    imageUrl = `${url}/uploads/${item.img}`;
                  }
                } else {
                  // Fallback to category-based image
                  imageUrl = getFallbackImage(item.category);
                }
                
                return {
                  id: item._id,
                  name: item.name,
                  price: item.price,
                  sold: Math.floor(Math.random() * 150) + 50, // Simulated sold count
                  image: imageUrl
                };
              });
              
              setTopItems(popularItems);
              
              // Update total items count in stats if we have real data
              if (data.length > 0) {
                setStats(prev => ({
                  ...prev,
                  totalItems: data.length
                }));
              }
            }
          }
        } catch (error) {
          console.error('Error from first endpoint:', error);
        }
        
        // If first endpoint failed, try alternative
        if (!success) {
          try {
            console.log("First endpoint failed. Trying /api/items...");
            response = await fetch(`${url}/api/items`);
            if (response.ok) {
              const result = await response.json();
              if (result && (result.data || Array.isArray(result))) {
                const data = result.data || result;
                console.log('Food items fetched from alternative endpoint:', data);
                
                // Similar processing for the second endpoint
                const sortedItems = [...data].sort((a, b) => (b.rating || 0) - (a.rating || 0));
                const popularItems = sortedItems.slice(0, 4).map(item => {
                  let imageUrl;
                  if (item.image) {
                    imageUrl = item.image.startsWith('http') ? item.image : `${url}/uploads/${item.image}`;
                  } else if (item.img) {
                    imageUrl = item.img.startsWith('http') ? item.img : `${url}/uploads/${item.img}`;
                  } else {
                    imageUrl = getFallbackImage(item.category);
                  }
                  
                  return {
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    sold: Math.floor(Math.random() * 150) + 50,
                    image: imageUrl
                  };
                });
                
                setTopItems(popularItems);
                
                if (data.length > 0) {
                  setStats(prev => ({
                    ...prev,
                    totalItems: data.length
                  }));
                }
                success = true;
              }
            }
          } catch (error) {
            console.error('Error from second endpoint:', error);
          }
        }
        
        // If both endpoints failed, use fallback data
        if (!success) {
          throw new Error("Both API endpoints failed");
        }
        
      } catch (error) {
        console.error('Failed to load menu items:', error);
        toast.error('Failed to load menu items');
        
        // Fallback data in case of error
        setTopItems([
          { id: 1, name: 'Spicy Chicken Burger', price: 12.99, sold: 142, image: assets.food_1 },
          { id: 2, name: 'Veg Supreme Pizza', price: 15.99, sold: 98, image: assets.food_2 },
          { id: 3, name: 'Chocolate Brownie', price: 6.99, sold: 87, image: assets.food_3 },
          { id: 4, name: 'Classic Cheeseburger', price: 10.99, sold: 76, image: assets.food_4 }
        ]);
        
        // Update stats with fallback data
        setStats(prev => ({
          ...prev,
          totalItems: 48 // Use the mock data value for consistency
        }));
      } finally {
        setItemsLoading(false);
      }
    };
    
    fetchMenuItems();
  }, [url]);

  // Helper function to get fallback image based on category
  const getFallbackImage = (category) => {
    if (!category) return assets.food_1;
    
    const categoryMap = {
      'burger': assets.food_1,
      'pizza': assets.food_2,
      'dessert': assets.food_3,
      'drinks': assets.food_5,
      'salad': assets.food_6,
      'pasta': assets.food_7,
      'sandwich': assets.food_8
    };
    
    return categoryMap[category.toLowerCase()] || assets.food_4;
  };

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'badge-success';
      case 'processing': return 'badge-info';
      case 'pending': return 'badge-warning';
      case 'cancelled': return 'badge-danger';
      default: return '';
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Dashboard</h1>
      
      {loading ? (
        <div className="loading-container flex-center">
          <div className="loader"></div>
          <span>Loading dashboard data...</span>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(0, 128, 128, 0.1)' }}>
                <img src={assets.order_icon} alt="Orders" />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.totalOrders}</h3>
                <p className="stat-label">Total Orders</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(255, 109, 0, 0.1)' }}>
                <img src={assets.parcel_icon} alt="Pending" />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.pendingOrders}</h3>
                <p className="stat-label">Pending Orders</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(76, 175, 80, 0.1)' }}>
                <img src={assets.add_icon} alt="Revenue" />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">${stats.totalRevenue.toLocaleString()}</h3>
                <p className="stat-label">Total Revenue</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: 'rgba(3, 155, 229, 0.1)' }}>
                <img src={assets.order_icon} alt="Items" />
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stats.totalItems}</h3>
                <p className="stat-label">Menu Items</p>
              </div>
            </div>
          </div>
          
          {/* Recent Orders */}
          <div className="dashboard-row">
            <div className="card orders-card">
              <div className="card-header">
                <h2 className="card-title">Recent Orders</h2>
                <button className="btn btn-sm btn-secondary">View All</button>
              </div>
              
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order, index) => (
                      <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.date}</td>
                        <td>${order.total.toFixed(2)}</td>
                        <td>
                          <span className={`badge ${getStatusClass(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
          {/* Popular Items */}
          <div className="popular-items">
            <h2 className="section-title">Popular Menu Items</h2>
            
            {itemsLoading ? (
              <div className="loading-container flex-center" style={{ minHeight: '200px' }}>
                <div className="loader"></div>
                <span>Loading menu items...</span>
              </div>
            ) : (
              <div className="item-cards">
                {topItems.map((item) => (
                  <div className="item-card" key={item.id}>
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="item-details">
                      <h3 className="item-name">{item.name}</h3>
                      <div className="item-meta">
                        <span className="item-price">${item.price.toFixed(2)}</span>
                        <span className="item-sold">{item.sold} sold</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard; 