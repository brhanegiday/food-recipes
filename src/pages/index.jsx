import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Cuisine from './Cuisine';
import Home from './Home';
import RecipeDetail from './RecipeDetail';
import SearchResults from './SearchResults';

function Pages() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine/:cuisineId' element={<Cuisine />} />
        <Route path='/search/:query' element={<SearchResults />} />
        <Route path='/recipe/:id' element={<RecipeDetail />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
