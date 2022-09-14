import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Cuisine from './pages/Cuisine';
import Category from './components/Category';
import Search from './components/Search';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <div className='px-5 xl:px-0 container max-w-6xl mx-auto my-12'>
      <BrowserRouter>
        <Category />
        {/* <Search /> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cuisine/:cuisineId' element={<Cuisine />} />
          <Route path='/search/:query' element={<SearchResults />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
