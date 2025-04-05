import React, { useState, useEffect } from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../Components/FoodDisplay/FoodDisplay'
import AppDownload from '../../Components/AppDownload/AppDownload'

const Home = ({ searchQuery }) => {
  const [category, setCategory] = useState("All");

  // Debug log for search query
  useEffect(() => {
    console.log("Home component - searchQuery:", searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <Header /> 
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} searchQuery={searchQuery} />
      <AppDownload />
    </div>
  )
}

export default Home
