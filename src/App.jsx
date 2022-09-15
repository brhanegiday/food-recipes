import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cuisine from './pages/Cuisine';
import Category from './components/Category';
import RecipeDetail from './pages/RecipeDetail';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <div className='px-5 xl:px-0 container max-w-6xl mx-auto my-12'>
      <BrowserRouter>
        <Category />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cuisine/:cuisineId' element={<Cuisine />} />
          <Route path='/search/:query' element={<SearchResults />} />
          <Route path='/recipe/:id' element={<RecipeDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
