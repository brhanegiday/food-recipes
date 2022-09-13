import React from 'react';
import Popular from '../../components/Popular';
import Veggie from '../../components/Veggie';
import Category from '../../components/Category';

function Home() {
  return (
    <div className='px-5 xl:px-0 container max-w-6xl mx-auto my-12'>
      <Category />
      <Popular />
      <Veggie />
    </div>
  );
}

export default Home;
